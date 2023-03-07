import React, { Suspense } from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import HomePage from 'pages/home/HomePage';
import { EAuthToken } from 'variables';
import { RoutePaths } from './route-constants';

const NonAuthLayout = React.lazy(() => import('layouts/non-auth/NonAuthLayout'));
const AuthLayout = React.lazy(() => import('layouts/auth/AuthLayout'));

const SignInPage = React.lazy(() => import('pages/non-auth/sign-in/SignInPage'));
const SignUpPage = React.lazy(() => import('pages/non-auth/sign-up/SignUpPage'));
const ForgotPasswordPage = React.lazy(() => import('pages/non-auth/forgot-password/ForgotPasswordPage'));
const Questions = React.lazy(() => import('containers/dashboard/questions/Questions'));
const GoToPlayPage = React.lazy(() => import('containers/answer/GoToPlayPage'));
const Dashboard = React.lazy(() => import('containers/dashboard/Dashboard'));
const User = React.lazy(() => import('containers/dashboard/users/User'));
const PageNotFound = React.lazy(() => import('components/page-not-found/PageNotFound'));
const ChangePassword = React.lazy(() => import('containers/change-password/ChangePassword'));

const Routes = () => {
  const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  return (
    <Suspense>
      <ReactRoutes>
        {/* non auth */}
        <Route element={<NonAuthLayout isAuthenticated={!!accessToken} />}>
          <Route path={RoutePaths.SIGN_IN} element={<SignInPage />} />
          <Route path={RoutePaths.SIGN_UP} element={<SignUpPage />} />
          <Route path={RoutePaths.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={RoutePaths.HOME} element={<HomePage />}>
            <Route index element={<GoToPlayPage />} />
            <Route path={RoutePaths.GO_TO_PLAY} element={<GoToPlayPage />} />
            <Route path={RoutePaths.DASHBOARD} element={<Dashboard />}>
              <Route index element={<Questions />} />
              <Route path={RoutePaths.QUESTIONS} element={<Questions />} />
              <Route path={RoutePaths.USER} element={<User />} />
            </Route>
          </Route>
          <Route path={RoutePaths.CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;
