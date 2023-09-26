import React from 'react';
import { Switch, Route } from 'wouter';
import { UserGuard } from '@imagine-cms/web';
import { MeScreen } from './me-screen/MeScreen';
import { RadioScreen } from './radio-screen/RadioScreen';
import { LoginScreen } from './login-screen/LoginScreen';
import { LogoutScreen } from './logout-screen/LogoutScreen';
import { ImagineScreen } from './imagine-screen/ImagineScreen';
import { ProfileScreen } from './profile-screen/ProfileScreen';
import { LandingScreen } from './landing-screen/LandingScreen';
import { SettingsScreen } from './settings-screen/SettingsScreen';
import { RegisterScreen } from './register-screen/RegisterScreen';
import { PlayGameScreen } from './play-game-screen/PlayGameScreen';
import { RoomViewScreen } from './room-view-screen/RoomViewScreen';
import { PhotoListScreen } from './photo-list-screen/PhotoListScreen';
import { GroupViewScreen } from './group-view-screen/GroupViewScreen';
import { BugReportsScreen } from './bug-reports-screen/BugReportsScreen';
import { ProfileViewScreen } from './profile-view-screen/ProfileViewScreen';
import { PageNotFoundScreen } from './page-not-found-screen/PageNotFoundScreen';
import { BugReportViewScreen } from './bug-report-view-screen/BugReportViewScreen';
import { ForgotPasswordScreen } from './forgot-password-screen/ForgotPasswordScreen';
import { CommunityStaffScreen } from './community-staff-screen/CommunityStaffScreen';
import { LoginWithDeviceScreen } from './login-with-device-screen/LoginWithDeviceScreen';
import { LoginWithGoogleScreen } from './login-with-google-screen/LoginWithGoogleScreen';
import { LoginWithDiscordScreen } from './login-with-discord-screen/LoginWithDiscordScreen';
import { LoginWithFacebookScreen } from './login-with-facebook-screen/LoginWithFacebookScreen';
import { CommunityHighScoresScreen } from './community-high-scores-screen/CommunityHighScoresScreen';
import { CommunityViewArticleScreen } from './community-view-article-screen/CommunityViewArticleScreen';
import { CommunityListArticlesScreen } from './community-list-articles-screen/CommunityListArticlesScreen';
import { CommunityOnlinePlayersScreen } from './community-online-players-screen/CommunityOnlinePlayersScreen';
import { ForgotPasswordLinkSentScreen } from './forgot-password-link-sent-screen/ForgotPasswordLinkSentScreen';
import { ForgotPasswordRedeemCodeScreen } from './forgot-password-redeem-code-screen/ForgotPasswordRedeemCodeScreen';
import { CommunityStaffApplicationScreen } from './community-staff-application-screen/CommunityStaffApplicationScreen';

const SITE_ROUTES: Array<{ path: string, view: any, }> = [
  {
    path: '/',
    view: LandingScreen,
  },
  {
    path: '/about',
    view: ImagineScreen,
  },
  {
    path: '/login',
    view: LoginScreen,
  },
  {
    path: '/login/discord',
    view: LoginWithDiscordScreen,
  },
  {
    path: '/login/facebook',
    view: LoginWithFacebookScreen,
  },
  {
    path: '/login/device',
    view: LoginWithDeviceScreen,
  },
  {
    path: '/login/google',
    view: LoginWithGoogleScreen,
  },
  {
    path: '/register',
    view: RegisterScreen,
  },
  {
    path: '/forgot-password',
    view: ForgotPasswordScreen,
  },
  {
    path: '/forgot-password/confirmation',
    view: ForgotPasswordLinkSentScreen,
  },
  {
    path: '/forgot-password/redeem/:requestCode',
    view: ForgotPasswordRedeemCodeScreen,
  },
  {
    path: '/logout',
    view: LogoutScreen,
  },
  {
    path: '/me',
    view: MeScreen,
  },
  {
    path: '/settings',
    view: () => (
      <UserGuard redirect>
        <SettingsScreen />
      </UserGuard>
    ),
  },
  {
    path: '/profile/:username',
    view: ProfileScreen,
  },
  {
    path: '/photos',
    view: PhotoListScreen,
  },
  {
    path: '/photos/:photoID',
    view: ProfileViewScreen,
  },
  {
    path: '/play',
    view: PlayGameScreen,
  },
  {
    path: '/radio',
    view: RadioScreen,
  },
  {
    path: '/community/staff',
    view: CommunityStaffScreen,
  },
  {
    path: '/community/staff/:rankID/apply',
    view: CommunityStaffApplicationScreen,
  },
  {
    path: '/community/online-players',
    view: CommunityOnlinePlayersScreen,
  },
  {
    path: '/community/articles',
    view: CommunityListArticlesScreen,
  },
  {
    path: '/community/articles/:articleID',
    view: CommunityViewArticleScreen,
  },
  {
    path: '/community/high-scores',
    view: CommunityHighScoresScreen,
  },
  {
    path: '/rooms/:roomID',
    view: RoomViewScreen,
  },
  {
    path: '/groups/:groupID',
    view: GroupViewScreen,
  },
  {
    path: '/bug-reports',
    view: BugReportsScreen,
  },
  {
    path: '/bug-reports/:bugReportID',
    view: BugReportViewScreen,
  }
]

export function Router() {
  return (
    <Switch>
      <>
        {
          SITE_ROUTES.map(route => (
            <Route key={`route_${route.path}`} path={route.path} component={route.view} />
          ))
        }
      </>
      <Route component={PageNotFoundScreen} />
    </Switch>
  )
}
