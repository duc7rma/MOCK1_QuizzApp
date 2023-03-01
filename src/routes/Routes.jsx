import React, { Suspense } from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import { EAuthToken } from 'variables';
import { RoutePaths } from './route-constants';
import PageNotFound from 'components/page-not-found/PageNotFound';

import ProtectedRoute from './ProtectedRoute';
const NonAuthLayout = React.lazy(() => import('layouts/NonAuthLayout'));
const SignInPage = React.lazy(() => import('pages/non-auth/sign-in/SignInPage'));
const HomePage = React.lazy(() => import('pages/home/HomePage'));
const SignUpPage = React.lazy(() => import('pages/non-auth/sign-up/SignUpPage'));
const ForgotPasswordPage = React.lazy(() => import('pages/non-auth/forgot-password/ForgotPasswordPage'));

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

        <Route path="/" element={<ProtectedRoute />}>
          <Route path={RoutePaths.HOME} element={<HomePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;
