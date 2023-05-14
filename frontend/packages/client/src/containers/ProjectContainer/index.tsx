import { Project } from "types";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useModal } from "hooks";
import { formatTimeStampToMonthAndYear } from "utils";
import { selectKeplr } from "store/keplr/selectors";
import { keplrConnect } from "store/keplr/actionCreators";

import { Text, Button } from "@project/libs/components";

import { JoinModal } from "./JoinModal";
import { SuccessParticipationModal } from "./SuccessParticipationModal";
import { ProjectCard } from "./ProjectCard";
import { FailureModal } from "./FailureModal";
import * as secret from "api/secret/secret";

import styles from "./styles.module.scss";
import { isAdminApi, loginAdminApi } from "api/wallet";
import { toast } from "react-toastify";
import { TEST_CHAIN_ID } from "global/chaindId";

interface Props {
  project: Project;
}
export const ProjectContainer = memo((props: Props) => {
  const { project } = props;
  const [value, setValue] = useState(0);
  const [isSuccessOpen, onSuccessToggle] = useModal();
  const [isFailureOpen, onFailureToggle] = useModal();
  const [isJoinOpen, onJoinToggle] = useModal();
  const { address } = useSelector(selectKeplr);
  const dispatch = useDispatch();

  const isIdoStarted = useMemo(
    () => project.statsAt < new Date().getTime() / 1000,
    [project.statsAt]
  );

  const isIdoEnded = useMemo(
    () => project.end_time < new Date().getTime() / 1000,
    [project.end_time]
  );

  const join = useCallback(async () => {
    if (address) onJoinToggle();
    else {
      const balance = await secret.balance();
      if (balance < 70000) {
        toast.error("Please ensure that your balance is over 0.1 SCRT");
        return;
      }
      await secret.setViewingKey();
      dispatch(keplrConnect());
    }
  }, [onJoinToggle, address]);

  const onSuccessDeposit = (amount: number) => {
    setValue(amount);
    onSuccessToggle();
  };

  return (
    <div className={styles.project_container}>
      <div className={styles.project_content}>
        <div className={styles.project_content_body}>
          <div className={styles.card_container}>
            <ProjectCard project={project} />
          </div>
          <div className={styles.project_right_part_content}>
            <div>
              <Text type="h1" className={styles.project_slogan}>
                {project.slogan}
              </Text>
              <Text type="h3" className={styles.project_description}>
                {project.description}
              </Text>
            </div>
            <Button
              theme="secondary"
              disabled={!isIdoStarted || isIdoEnded}
              className={styles.join_button}
              onClick={join}
            >
              {address
                ? isIdoEnded
                  ? "Ended in " +
                    formatTimeStampToMonthAndYear(project.end_time)
                  : isIdoStarted
                  ? "Join Now"
                  : "Join in " + formatTimeStampToMonthAndYear(project.statsAt)
                : "Connect"}
            </Button>
          </div>
        </div>
      </div>
      <JoinModal
        project={project}
        isOpen={isJoinOpen}
        onClose={onJoinToggle}
        onSuccessToggle={onSuccessDeposit}
        onFailureToggle={onFailureToggle}
      />
      <SuccessParticipationModal
        amount={value}
        isOpen={isSuccessOpen}
        onClose={onSuccessToggle}
      />
      <FailureModal isOpen={isFailureOpen} onClose={onFailureToggle} />
    </div>
  );
});
