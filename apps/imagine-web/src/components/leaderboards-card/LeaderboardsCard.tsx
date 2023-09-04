import { Link } from 'wouter';
import { Card } from '../card/Card';
import React, { useEffect } from 'react';
import { Avatar } from '../avatar/Avatar';
import { UserWire } from '@imagine-cms/types';
import { useRunQuery } from '@imagine-cms/web';
import { LeaderboardsCardProps } from './LeaderboardsCard.types';

export function LeaderboardsCard({ title, value, query }: LeaderboardsCardProps) {
  const { runQuery, loading, data } = useRunQuery<{ users: UserWire[] }>(query)

  useEffect(() => {
    runQuery();
  }, [runQuery]);

  return (
    <Card header={title}>
      {
        loading && (
          <>
            <i className="fa fa-spinner fa-spin fa-2x" />
            <h2>Loading...</h2>
          </>
        )
      }
      <table width="100%">
        <tbody>
          {
            data?.users?.map(user => (
              <tr key={`user_${user.id}`} style={{ backgroundColor: 'f8f9fa' }}>
                <td width="25%">
                  <Avatar look={user.look} size="m" direction={2} headDirection={2} gesture="sml" headOnly />
                </td>
                <td width="75%">
                  <Link to={`/profile/${user.username}`}>
                    <b>{user.username}</b>
                  </Link>
                  <b /> <br />{value(user)}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Card>
  )
}
