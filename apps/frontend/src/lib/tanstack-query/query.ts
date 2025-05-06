import {
  ConnectToLinkedinResponse,
  ProfileDetails,
  ProfileUpdateResponse,
} from '@repo/common/types';
import { useQuery } from '@tanstack/react-query';

import {
  connectToLinkedin,
  fetchUserSources,
  getLinkedinData,
  getPostData,
  updateProfile,
} from '@/lib/api';

export const connectLinkedinQuery = (accessToken: string, options = {}) => {
  return useQuery<ConnectToLinkedinResponse>({
    queryKey: ['linkedin'],
    queryFn: () => connectToLinkedin(accessToken!),
    enabled: false,
    ...options,
  });
};

export const updateProfileQuery = (
  accessToken: string,
  details: ProfileDetails,
  options = {},
) => {
  return useQuery<ProfileUpdateResponse>({
    queryKey: ['linkedin_profile'],
    queryFn: () => updateProfile(accessToken!, details),
    enabled: false,
    ...options,
  });
};

export const fetchSourcesQuery = (accessToken: string, options = {}) => {
  return useQuery({
    queryKey: ['sources'],
    queryFn: () => fetchUserSources(accessToken!),
    // enabled: false,
    ...options,
  });
};

export const fetchLinkedinQuery = (accessToken: string, options = {}) => {
  return useQuery({
    queryKey: ['linkedin'],
    queryFn: () => getLinkedinData(accessToken!),
    ...options,
  });
};

export const getPostQuery = (accessToken: string, options = {}) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPostData(accessToken!),
    ...options,
  });
};
