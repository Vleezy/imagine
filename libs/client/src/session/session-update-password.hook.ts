import { useMutation } from "@apollo/client";
import { SessionUpdatePasswordInput } from "apps/imagine-api/src/session/session.input";
import { SESSION_UPDATE_PASSWORD_MUTATION, SessionUpdatePasswordResponse, SessionUpdatePasswordVariables } from "./session-update-password.mutation";

export interface UseSessionUpdatePasswordResponse {
  execute(input: SessionUpdatePasswordInput): Promise<SessionUpdatePasswordResponse>;
  error?: Error;
  loading: boolean;
  data?: SessionUpdatePasswordResponse;
}

export function useSessionUpdatePassword(): UseSessionUpdatePasswordResponse {
  const [sessionUpdatePassword, { loading, error, data }] = useMutation<SessionUpdatePasswordResponse, SessionUpdatePasswordVariables>(SESSION_UPDATE_PASSWORD_MUTATION);

  const onSessionUpdatePassword = async (input: SessionUpdatePasswordInput): Promise<SessionUpdatePasswordResponse> => {
    const matchingPhotoReaction = await sessionUpdatePassword({ variables: { input } })
    return matchingPhotoReaction.data!;
  }

  return {
    execute: onSessionUpdatePassword,
    error,
    loading,
    data: data ?? undefined,
  }
}