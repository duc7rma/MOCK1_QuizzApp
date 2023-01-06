import React, { Suspense } from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";

import { RoutePaths } from "./route-constants";

const TodoPage = React.lazy(() => import("../pages/TodoPage"));

const Routes = () => {
    return (
        <Suspense>
            <ReactRoutes>
                {/* non auth */}
                <Route path={RoutePaths.TODO_PAGE} element={<TodoPage />}></Route>
            </ReactRoutes>
        </Suspense>
    );
};

export default Routes;
