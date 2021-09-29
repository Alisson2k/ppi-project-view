import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AppRoutes from "./app/AppRoutes";

const LoginPage = React.lazy(() => import("../screens/login/LoginPage"));

export default () => (
  <BrowserRouter>
    <Suspense fallback={<div />}>
      <Switch>
        <Route path={"/login"} component={() => <LoginPage />}></Route>
        <AppRoutes />
      </Switch>
    </Suspense>
  </BrowserRouter>
);
