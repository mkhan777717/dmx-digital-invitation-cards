/* eslint-disable */

// This file was generated for the JavaScript version.

import { Route as rootRouteImport } from "./routes/__root.jsx";
import { Route as IndexRouteImport } from "./routes/index.jsx";

const IndexRoute = IndexRouteImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRouteImport,
});

const rootRouteChildren = {
  IndexRoute,
};

export const routeTree = rootRouteImport._addFileChildren(rootRouteChildren);