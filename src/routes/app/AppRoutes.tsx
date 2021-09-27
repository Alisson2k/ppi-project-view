import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

const Home = React.lazy(() => import("../../screens/home/Home"));
const NotFoundScreenProps = React.lazy(
  () => import("../../screens/not-found/NotFoundScreen")
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact={true} path="/app" component={() => <Home />}></Route>
        <Route
          exact={true}
          path="/products"
          component={() => <h1>Produtos</h1>}
        ></Route>
        <Route component={() => <NotFoundScreenProps />}></Route>
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
