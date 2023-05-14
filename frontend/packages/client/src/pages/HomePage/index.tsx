import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { WelcomeContainer } from "containers/WelcomeContainer";
import { HomeListingsContainer } from "containers/HomeListingsContainer";
import { GridContainer } from "containers/GridContainer";
import { StartupContainer } from "containers/StartupContainer";
import { getLandingApi } from "api/wallet";

export const HomePage: FC = () => {
  const [landing, setLanding] = useState({});
  const [loadingLand, setLoadingLand] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const verified = searchParams.get("verified");
    const message = searchParams.get("message");
    if (verified && message) {
      const alertMessage = verified === "true" ? message : `ERROR: ${message}`;
      alert(alertMessage);
    }
    setLoadingLand(true);
    (async () => {
      const landingData = await getLandingApi();
      setLanding(landingData?.data);
    })();
    setLoadingLand(false);
  }, []);

  return (
    <div>
      <WelcomeContainer />
      <HomeListingsContainer landing={landing} loading={loadingLand} />
      <GridContainer />
      <StartupContainer />
    </div>
  );
};
