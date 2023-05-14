import React, { memo, useCallback, useState } from "react";
import { subscribeToProject } from "api/email";
import { toast } from "react-toastify";

import { strings } from "global";
import { isValideEmail } from "utils";

import { Button, Text, TextInput, Loader } from "@project/libs/components";

import { EmailSubscriptionModal } from "./EmailSubsciptionModal";

import styles from "./styles.module.scss";

interface Props {
  projectId: string;
}
export const NotifyMeContainer = memo((props: Props) => {
  const { projectId } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verificationEmailSent, setVerificationEmailSent] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const onJoinClick = useCallback(async () => {
    if (!isValideEmail(email)) {
      toast.error(`"${email}" is not a valid email address`);
      setEmail("");
      return;
    }
    try {
      setIsLoading(true);
      const result = await subscribeToProject(email, Number(projectId));
      if (!result.data) {
        toast.error("Too many requests, please try again after 5 minutes");
      } else {
        setVerificationEmailSent(true);
      }
    } catch (error) {
      toast.error("Error while subscribing.");
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  }, [email]);

  const onChangeValue = (value: string) => {
    setEmail(value);
  };

  return (
    <div className={styles.subscription_container}>
      <div className={styles.subscription_content}>
        <div className={styles.subscription_left_part}>
          <Text className={styles.subscription_small_text}>
            {strings.doYouWantToBeReminded}
          </Text>
          <Text className={styles.subscription_title} type="h2">
            {strings.leaveYourEmail}
          </Text>
        </div>

        <div className={styles.subscription_right_part}>
          <TextInput
            classNameContainer={styles.subscription_input}
            classNameBox={styles.subscription_input_box}
            onChangeValue={onChangeValue}
            value={email}
            placeholder={strings.emailAddress}
          />
          <Button
            theme="primary"
            onClick={onJoinClick}
            className={styles.subscription_button}
          >
            {!isLoading ? (
              strings.notifyMe
            ) : (
              <span>
                <Loader />
              </span>
            )}
          </Button>
        </div>
      </div>
      <EmailSubscriptionModal
        isOpen={verificationEmailSent}
        onClose={() => setVerificationEmailSent(false)}
      />
    </div>
  );
});
