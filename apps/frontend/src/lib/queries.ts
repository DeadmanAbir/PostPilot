import { ConnectToLinkedinResponse } from "@repo/common/types";
import { useQuery } from "@tanstack/react-query";
import { connectToLinkedin } from "./api";

export const connectLinkedinQuery = (accessToken: string, options = {}) => {
  return useQuery<ConnectToLinkedinResponse>({
    queryKey: ["linkedin"],
    queryFn: () => connectToLinkedin(accessToken!),
    enabled: false,
    ...options,
  });
};
