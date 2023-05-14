import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PolicyAndTermsAgreementModal } from "components/PolicyAndTermsAgreementModal";

import { useModal, useUserAggreement } from "hooks";
import { PathName, strings } from "global";

import { Button, Image } from "@project/libs/components";
import { logoWhite } from "@project/libs/assets/images";

import styles from "../styles.module.scss";

export const LandingPageHeader = () => {
  const [isOpen, onToggle] = useModal();
  const [agreed] = useUserAggreement("yoiu-agreement");
  const navigate = useNavigate();

  const onLaunchClick = useCallback(() => {
    if (agreed) {
      navigate(PathName.listings);
      return;
    }
    onToggle();
  }, [onToggle, navigate, agreed]);

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header}>
        <Link to={PathName.home}>
          <Image url={logoWhite} className={styles.header_logo} />
        </Link>
        <Button theme="outline-white" onClick={onLaunchClick}>
          {strings.launchApp}
        </Button>
      </div>
      <PolicyAndTermsAgreementModal isOpen={isOpen} onClose={onToggle} />
    </div>
  );
};
