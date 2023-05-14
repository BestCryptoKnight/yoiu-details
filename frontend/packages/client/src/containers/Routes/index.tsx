import React, { Route, Routes as RoutesDom } from "react-router-dom";
import { AppLayout, LandingPageLayout, ProjectLayout } from "layouts";
import {
  HomePage,
  ListingsPage,
  ProjectPage,
  UserPage,
  NotFoundPage,
  CreatePage,
} from "pages";

import { useScrollToTop } from "hooks";
import { PathName } from "global";

export const Routes = () => {
  useScrollToTop();

  return (
    <RoutesDom>
      <Route path={PathName.home} element={<ProjectLayout />}>
        <Route path={PathName.home} element={<ProjectPage />} />
      </Route>

      {/* <Route path={PathName.home} element={<AppLayout />}>
        <Route path={PathName.listings} element={<ListingsPage />} />
        <Route path={PathName.user} element={<UserPage />} />
      </Route>

      <Route path={PathName.home} element={<ProjectLayout />}>
        <Route path={PathName.project} element={<ProjectPage />} />
      </Route>

      <Route path={PathName.create} element={<AppLayout />}>
        <Route path={PathName.create} element={<CreatePage />} />
      </Route> */}

      <Route path="*" element={<NotFoundPage />} />
    </RoutesDom>
  );
};
