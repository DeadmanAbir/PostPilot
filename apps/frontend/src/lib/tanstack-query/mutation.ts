import {
  AddNodeContent,
  PostDetail,
  ProfileDetails,
  RegeneratePostContent,
  RemoteFileUploadDetail,
} from "@repo/common/types";
import {
  addRemoteFile,
  addRemoteImage,
  addTextNode,
  fetchTweet,
  fetchWebsite,
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
    mutationFn: (tweetUrl: string) => fetchTweet(accessToken, tweetUrl),
    ...options,
  });
};

export const addNodeContentFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (details: AddNodeContent) => addTextNode(accessToken, details),
    ...options,
  });
};

export const fetchWebsiteFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (url: string) => fetchWebsite(accessToken, url),
    ...options,
  });
};

export const addRemoteImagesFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (images: RemoteFileUploadDetail) =>
      addRemoteImage(accessToken, images),
    ...options,
  });
};

export const addRemoteFilesFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (files: RemoteFileUploadDetail) =>
      addRemoteFile(accessToken, files),
    ...options,
  });
};
