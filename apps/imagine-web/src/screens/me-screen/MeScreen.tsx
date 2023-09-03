import React, { useContext } from 'react';
import { sessionContext } from '@imagine-cms/web';
import { UserStatsGrid } from '../../components/user-stats-grid/UserStatsGrid';
import { UserFriendsGrid } from '../../components/user-friends-grid/UserFriendsGrid';
import { UserRoomsContainer } from '../../components/user-rooms-container/UserRoomsContainer';
import { UserGroupsContainer } from '../../components/user-groups-container/UserGroupsContainer';
import { UserProfileContainer } from '../../components/user-profile-container/UserProfileContainer';
import { StoriesGridContainer } from '../../components/stories-grid-container/StoriesGridContainer';
import { LatestArticlesGrid } from '../../components/latest-articles-grid/LatestArticlesGrid';
import { MOCK_USER } from '../../const';

export function MeScreen() {
  const { session } = useContext(sessionContext);

  const user = session ?? MOCK_USER;

  return (
    <>
      <StoriesGridContainer stories={[]} />
      <br />
      <UserStatsGrid user={user} />
      <br />
      <UserProfileContainer user={user} />
      <br />
      <UserFriendsGrid />
      <br />
      <UserGroupsContainer />
      <br />
      <UserRoomsContainer />
      <br />
      <LatestArticlesGrid />
    </>
  )
}
