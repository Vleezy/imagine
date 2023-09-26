import { MOCK_USER } from '../../const';
import React, { useContext } from 'react';
import { Grid } from '../../components/grid/Grid';
import { sessionContext } from '@imagine-cms/web';
import { UserRoomsGrid } from '../../components/user-rooms-grid/UserRoomsGrid';
import { UserStatsGrid } from '../../components/user-stats-grid/UserStatsGrid';
import { UserGroupsGrid } from '../../components/user-groups-grid/UserGroupGrid';
import { UserFriendsGrid } from '../../components/user-friends-grid/UserFriendsGrid';
import { LatestArticlesGrid } from '../../components/latest-articles-grid/LatestArticlesGrid';
import { UserProfileContainer } from '../../components/user-profile-container/UserProfileContainer';
import { LatestPhotosContainer } from '../../components/latest-photos-container/LatestPhotosContainer';

export function MeScreen() {
  const { session } = useContext(sessionContext);

  const user: any = session ?? MOCK_USER;

  return (
    <>
      <LatestPhotosContainer />
      <br />
      <UserStatsGrid user={user} />
      <br />
      <UserProfileContainer user={user} />
      <br />
      <Grid size="large">
        <UserFriendsGrid user={user} />
        <UserGroupsGrid user={user} />
      </Grid>
      <br />
      <Grid size="large">
        <UserRoomsGrid user={user} />
      </Grid>
      <br />
      <LatestArticlesGrid />
    </>
  )
}
