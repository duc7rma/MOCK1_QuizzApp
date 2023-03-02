import React, { Suspense } from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import { EAuthToken } from 'variables';
import { RoutePaths } from './route-constants';

import ProtectedRoute from './ProtectedRoute';
const NonAuthLayout = React.lazy(() => import('layouts/non-auth/NonAuthLayout'));
const AuthLayout = React.lazy(() => import('layouts/auth/AuthLayout'));

const SignInPage = React.lazy(() => import('pages/non-auth/sign-in/SignInPage'));
const SignUpPage = React.lazy(() => import('pages/non-auth/sign-up/SignUpPage'));
const ForgotPasswordPage = React.lazy(() => import('pages/non-auth/forgot-password/ForgotPasswordPage'));
const AddQuesTionForm = React.lazy(() => import('containers/dashboard/questions/add/AddQuestionForm'));
const Questions = React.lazy(() => import('containers/dashboard/questions/Questions'));
const GoToPlayPage = React.lazy(() => import('containers/answer/GoToPlayPage'));
const Dashboard = React.lazy(() => import('containers/dashboard/Dashboard'));
const User = React.lazy(() => import('containers/dashboard/users/User'));
const PageNotFound = React.lazy(() => import('components/page-not-found/PageNotFound'));

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
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<GoToPlayPage />} />

            <Route path={RoutePaths.GO_TO_PLAY} element={<GoToPlayPage />} />
            <Route path={RoutePaths.DASHBOARD} element={<Dashboard />}>
              <Route path={RoutePaths.QUESTIONS} element={<Questions />}>
                <Route path={RoutePaths.ADD_QUESTIONS} element={<AddQuesTionForm />} />
              </Route>
              <Route path={RoutePaths.USER} element={<User />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </ReactRoutes>
    </Suspense>
  );
};

export default Routes;
