import {
  AddNodeContent,
  LocalFileUploadDetail,
  PostContent,
  PostDetail,
  ProfileDetails,
  RegeneratePostContent,
  RemoteFileUploadDetail,
  TweetContent,
} from "@repo/common/types";
import {
  addLocalFile,
  addLocalImage,
  addRemoteFile,
  addRemoteImage,
  addTextNode,
  deleteLinkedinAccount,
  fetchTweet,
  fetchWebsite,
  improvePost,
  linkedinPost,
  postToLinkedin,
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

export const improvePostFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (query: string) => improvePost(accessToken!, query),
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
    mutationFn: (content: TweetContent) => fetchTweet(accessToken, content),
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

export const addLocalImagesFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (images: LocalFileUploadDetail) =>
      addLocalImage(accessToken, images),
    ...options,
  });
};

export const addLocalFilesFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (files: LocalFileUploadDetail) =>
      addLocalFile(accessToken, files),
    ...options,
  });
};

export const postToLinkedinFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (content: PostContent) => postToLinkedin(accessToken, content),
    ...options,
  });
};

export const deleteLinkedinAccountFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: () => deleteLinkedinAccount(accessToken),
    ...options,
  });
};
