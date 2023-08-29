import gql from 'graphql-tag';
import { UserWire } from '@imagine-cms/types';
import { UseQueryResponse, useRunQuery } from './run-query.hook';

const FIND_USER_BY_ID = gql`
  query ($userID: Float!) {
    user(id: $userID) {
      id
      username
      rankID
      credits
      vipPoints
      activityPoints
      look
      gender
      motto
      accountCreatedAt
      onlineStatus
      homeRoomID
    }
  }
`;

export const useFindUserByID = (userID: number): UseQueryResponse<{ user: UserWire }> => {
  return useRunQuery(FIND_USER_BY_ID, { userID });
};
