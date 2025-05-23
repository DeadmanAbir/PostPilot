import { Response } from 'express';
import 'dotenv/config';
import createError from 'http-errors';
import { ZodError } from 'zod';
import {
  exchangeCodeForToken,
  getCredentialsFromDB,
  getLinkedInAuthUrl,
  getLinkedInProfile,
  postToLinkedIn,
  processMedia,
  storeCredentialsInDB,
  validateAndRefreshToken,
} from '@/utils/helper';
import crypto from 'crypto';
import {
  linkedinCallbackValidator,
  linkedinPostValidator,
} from '@repo/common/validator';
import { supabase } from '@/utils/supabaseClient';
import { AuthRequest } from '@/middlewares/authMiddleware';

export async function getLinkedinCredentials(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const userId = request.userId;
    const state = `${crypto.randomBytes(16).toString('hex')}_${userId}`;
    const authUrl = getLinkedInAuthUrl(state);

    response.status(200).json({ authUrl });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: 'Invalid request body', details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function handleLinkedinCallback(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const { code, state, error } = linkedinCallbackValidator.parse(
      request.query,
    );
    if (error) {
      throw createError(400, `LinkedIn authorization error: ${error}`);
    }

    const userId = state.split('_')[1];

    const tokenData = await exchangeCodeForToken(code as string);

    // Get user's LinkedIn profile to get their LinkedIn ID
    const profile = await getLinkedInProfile(tokenData.access_token);

    const stored = await storeCredentialsInDB(
      userId!,
      tokenData.access_token,
      tokenData.expires_in,
      profile.id,
      profile.picture,
    );

    if (!stored) {
      throw createError(500, 'Failed to store LinkedIn credentials');
    }

    response.redirect(process.env.REDIRECT_URL!);
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: 'Invalid request body', details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function getLinkedinStatus(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('linkedin')
      .select('id, linkedin_id, expires_at')
      .eq('user_id', request.userId)
      .single();

    if (error) {
      console.error(error);
      throw createError(500, 'Failed to fetch LinkedIn credentials');
    }

    // Check if token is expired
    const isExpired = data.expires_at && new Date(data.expires_at) < new Date();

    response.status(200).json({
      connected: !isExpired,
      linkedinId: data.linkedin_id,
    });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: 'Invalid request body', details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}

export async function postToLinkedin(
  request: AuthRequest,
  response: Response,
): Promise<void> {
  try {
    const { text, shareUrl, title, visibility, images, video } =
      linkedinPostValidator.parse(request.body);

    const userId = request.userId;

    const credentials = await getCredentialsFromDB(userId);

    if (!credentials) {
      throw createError(404, 'LinkedIn credentials not found');
    }

    // Validate and refresh token if needed
    const validAccessToken = await validateAndRefreshToken(credentials);
    if (!validAccessToken) {
      throw createError(401, 'LinkedIn authentication expired');
    }

    // Process media attachments
    let mediaType: 'NONE' | 'IMAGE' | 'VIDEO' = 'NONE';
    let mediaAttachments = [];
    if (images) {
      for (const image of images) {
        mediaAttachments.push(
          await processMedia(
            validAccessToken,
            credentials.profile_id,
            image,
            'image',
          ),
        );
      }
      mediaType = 'IMAGE';
    } else if (video) {
      mediaAttachments.push(
        await processMedia(
          validAccessToken,
          credentials.profile_id,
          video,
          'video',
        ),
      );
      mediaType = 'VIDEO';
    }

    const postId = await postToLinkedIn(
      validAccessToken,
      credentials.profile_id,
      {
        text,
        shareUrl,
        title,
        visibility,
      },
      mediaAttachments,
      mediaType,
    );

    // const postUrl = extractLinkedInId(postId);

    const { data, error } = await supabase
      .from('post')
      .insert([
        {
          user_id: userId,
          post_content: text,
          post_url: `https://www.linkedin.com/feed/update/${postId}`,
          media: images || [video],
        },
      ])
      .select('post_url');

    if (error) {
      console.error(error);
      throw createError(500, 'Failed to save linkedin post');
    }

    response.status(201).json({
      success: true,
      message: 'Content posted to LinkedIn successfully',
      post: data[0]?.post_url,
    });
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof ZodError) {
      response
        .status(422)
        .json({ error: 'Invalid request body', details: e.errors });
    } else if (e instanceof Error) {
      response.status(500).json({ error: e.message });
    } else {
      response.status(500).json({ error: 'An unknown error occurred' });
    }
  }
}
