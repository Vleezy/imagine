import { useLazyQuery } from "@apollo/client";
import { PhotoFilterManyInput } from "../input/photo.input";
import { PhotoFragment } from "../fragments/photo.fragment";
import { PHOTO_FETCH_MANY_QUERY, PhotoFetchManyResponse, PhotoFetchManyVariables } from "../queries/photo-fetch-many.query";

export interface UsePhotoFetchManyResponse {
  fetch(filter: PhotoFilterManyInput): Promise<PhotoFragment[]>;
  error?: Error;
  loading: boolean;
  data?: PhotoFragment[];
}

export function usePhotoFetchMany(): UsePhotoFetchManyResponse {
  const [getPhotos, { loading, error, data }] = useLazyQuery<PhotoFetchManyResponse, PhotoFetchManyVariables>(PHOTO_FETCH_MANY_QUERY);

  const onFetchPhotos = async (filter: PhotoFilterManyInput): Promise<PhotoFragment[]> => {
    const matchingPhotos = await getPhotos({ variables: { filter } })
    return matchingPhotos.data!.photos;
  }

  return {
    fetch: onFetchPhotos,
    error,
    loading,
    data: data?.photos,
  }
}