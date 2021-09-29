import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarComponent from "./components/navbar/NavbarComponent";
import ProductPage from "../../screens/products/ProductPage";
import ProductDetail from "../../screens/products/details/ProductDetail";

const NotFoundScreenProps = React.lazy(
  () => import("../../screens/not-found/NotFoundScreen")
);

export const AppRoutes: React.FC<{}> = () => {
  return (
    <div>
      <NavbarComponent />
      <Suspense fallback={<div />}>
        <Switch>
          <Route
            exact={true}
            path="/products"
            component={() => <ProductPage />}
          ></Route>
          <Route
            exact={true}
            path="/products/:id"
            component={() => <ProductDetail />}
          ></Route>
          <Route component={() => <NotFoundScreenProps />}></Route>
        </Switch>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
