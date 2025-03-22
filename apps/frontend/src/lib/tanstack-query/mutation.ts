import { PostDetail } from "@repo/common/types";
import { linkedinPost } from "../api";
import { useMutation } from "@tanstack/react-query";

export const generatePostFn = (accessToken: string, options = {}) => {
  return useMutation({
    mutationFn: (details: PostDetail) => linkedinPost(accessToken!, details),
    ...options,
  });
};
