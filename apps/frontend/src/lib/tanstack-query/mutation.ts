import {
  PostDetail,
  ProfileDetails,
  RegeneratePostContent,
} from "@repo/common/types";
import {
  fetchTweet,
  linkedinPost,
  regeneratePost,
  updateProfile,
} from "../api";
import { useMutation } from "@tanstack/react-query";

export const generatePostFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (details: PostDetail) => linkedinPost(accessToken!, details),
    ...options,
  });
};

export const regeneratePostFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (details: RegeneratePostContent) =>
      regeneratePost(accessToken!, details),
    ...options,
  });
};

export const updateProfileFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (details: ProfileDetails) =>
      updateProfile(accessToken!, details),
    ...options,
  });
};

export const fetchTweetFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (tweetUrl: string) => fetchTweet(accessToken!, tweetUrl),
    ...options,
  });
};
