import React from 'react';
import { Link } from 'wouter';
import { Badge } from '../badge/Badge';
import { UserStatsGridProps } from './UserStatsGrid.types';
import { UserStatsGridElement } from './UserStatsGrid.styled';
import { CreditStatsContainerElement, DiamondStatsContainerElement, HabboClubStatsContainerElement, PixelStatsContainerElement } from './stats-container/StatsContainer.styled';

export function UserStatsGrid({ user }: UserStatsGridProps) {
  return (
    <UserStatsGridElement>
      <CreditStatsContainerElement>
        <img src="/img/credits.svg" loading="lazy" />
        <b>{user.credits?.toLocaleString()}</b>
        Credits
      </CreditStatsContainerElement>
      <DiamondStatsContainerElement>
        <img src="/img/diamonds.svg" loading="lazy" />
        <b>{user.vipPoints?.toLocaleString()}</b>
        Diamonds
      </DiamondStatsContainerElement>
      <PixelStatsContainerElement>
        <img src="/img/duckets.svg" loading="lazy" />
        <b> {user.activityPoints?.toLocaleString()}</b>
        Pixels
      </PixelStatsContainerElement>
      <Link to={`/ranks/${user.rank?.id}`}>
        <HabboClubStatsContainerElement>
          <Badge badge={{ code: user.rank?.badgeCode }} />
          <b>{user.rank?.name}</b>
        </HabboClubStatsContainerElement>
      </Link>
    </UserStatsGridElement >
  )
}