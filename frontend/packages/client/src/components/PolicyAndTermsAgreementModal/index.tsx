import React, { useCallback, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import { PathName, strings } from "global";
import { useUserAggreement } from "hooks";

import { Button, Modal, Image, Text } from "@project/libs/components";
import { agreement } from "@project/libs/assets/images";

import styles from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  path?: string;
  closeBtn?: boolean;
}

export const PolicyAndTermsAgreementModal = memo<Props>((props) => {
  const { isOpen, onClose, path = PathName.listings, closeBtn = false } = props;
  const [isAggreed, setIsAggreed] = useState<boolean>(false);

  // eslint-disable-next-line
  const [agreed, agreeToTerms] = useUserAggreement("yoiu-agreement");
  const navigate = useNavigate();

  const handleAgree = () => {
    setIsAggreed(!isAggreed);
  };

  const launchApp = useCallback(() => {
    // eslint-disable-next-line
    //@ts-ignore
    agreeToTerms();
    navigate(path);
  }, [navigate]);

  const handleClose = () => {
    // eslint-disable-next-line
    //@ts-ignore
    agreeToTerms();
    onClose();
  };

  return (
    <Modal
      onClose={!closeBtn ? onClose : () => console.log("cant close modal")}
      isOpen={isOpen}
      className={styles.modal_container}
    >
      <Image url={agreement} />
      <div className={styles.actions}>
        <input type="checkbox" checked={isAggreed} onChange={handleAgree} />
        <Text>
          I agree to YOIU&apos;s{" "}
          <a
            href="https://docs.yoiu.io/yoiu/terms-and-conditions"
            target="_blank"
            rel="noreferrer"
          >
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a
            href="https://docs.yoiu.io/yoiu/privacy-policy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </Text>
      </div>
      {closeBtn ? (
        <Button theme="gradient" onClick={handleClose} disabled={!isAggreed}>
          Close
        </Button>
      ) : (
        <Button theme="gradient" onClick={launchApp} disabled={!isAggreed}>
          {strings.launchApp}
        </Button>
      )}
    </Modal>
  );
});
