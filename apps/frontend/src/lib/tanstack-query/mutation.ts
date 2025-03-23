import { PostDetail, RegeneratePostContent } from "@repo/common/types";
import { linkedinPost, regeneratePost } from "../api";
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
