import { Project } from "types";

import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUserInfo, getTier, invest, usdRate } from "api/secret/secret";
import { toast } from "react-toastify";

import {
  Modal,
  Text,
  Button,
  Image,
  TextInput,
  Loader,
} from "@project/libs/components";
import { infoIcon } from "@project/libs/assets/images";

import styles from "../styles.module.scss";

interface Props {
  isOpen: boolean;
  project: Project;
  onClose: () => void;
  onSuccessToggle: (amount: number) => void;
  onFailureToggle: () => void;
}

export const JoinModal = memo<Props>(
  ({ onClose, isOpen, project, onSuccessToggle, onFailureToggle }) => {
    const [value, setValue] = useState<string>("");
    const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
    const [tier, setTier] = useState<string | number>("----");
    const [maxDeposit, setMaxDeposit] = useState<string | number>("---");
    const [loading, setLoading] = useState(false);

    const usdPerTier = [0, 25000, 7500, 1500, 250, 5];

    useEffect(() => {
      if (isOpen) {
        setTier("---");
        setValue("");
        (async () => {
          setLoading(true);
          const { tier } = await getTier();
          const result = await getAllUserInfo();
          const rate = await usdRate();

          if (result) {
            const depositAmount =
              Number(result[0][0].total_payment) / Math.pow(10, 6);
            const remaining =
              Math.ceil((usdPerTier[Number(tier)] * Math.pow(10, 18)) / rate) -
              depositAmount;
            const totalRemaining =
              Number(
                result[0][1].remaining_per_tiers[Number(tier) - 1]
              ) /
              (Math.pow(10, 6) * Number(result[0][1].price));
            const maxDeposit = Math.min(
              remaining > 0 ? remaining : 0,
              totalRemaining
            );
            setMaxDeposit(maxDeposit);
            setTier(tier);
          }
          setLoading(false);
        })();
      }
    }, [isOpen]);

    const openTooltip = () => {
      setIsTooltipOpen(true);
    };
    const closeTooltip = () => {
      setIsTooltipOpen(false);
    };
    const handleChange = (value: string) => {
      setValue(value);
    };
    const deposit = async () => {
      if (Number(value) > Number(maxDeposit)) {
        toast.error(`Max deposit value is ${maxDeposit}`, {
          style: { fontSize: "20px" },
        });
        return;
      }
      setLoading(true);
      const result = await invest(Number(value));
      onClose();
      if (result) {
        onSuccessToggle(Number(value) * Number(project.price));
      } else onFailureToggle();
      setLoading(false);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} className={styles.join_modal}>
        <div className={styles.modal_header}>
          <p>Join Now</p>
        </div>

        <div className={styles.actions}>
          <Text type="p" className={styles.labels}>
            Max Deposit
          </Text>

          <div className={styles.modal_input}>
            <TextInput
              value={value}
              onChangeValue={handleChange}
              placeholder={`Max ${maxDeposit}`}
            />
            <div className={styles.token}>
              <Text type="p">SCRT =</Text>
            </div>
            <TextInput
              value={(Number(value) * Number(project.price)).toString()}
            />
            <div className={styles.token}>
              <Text type="p">{project.shortName}</Text>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <Text type="p" className={styles.labels}>
            Status
          </Text>
          <div className={styles.tier_input}>
            <Text>{tier}</Text>
          </div>
          <div className={styles.upgrade_button}>
            <a href="https://app.yoiu.io/user">Upgrade</a>
            <div onMouseEnter={openTooltip} onMouseLeave={closeTooltip}>
              <Image url={infoIcon} />
            </div>
            {isTooltipOpen ? (
              <div className={styles.tooltip}>
                <p>
                  To increase your funds and chances during and IDO event you
                  can upgrade your tier.
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.actions}>
          <div />
          <Button
            className={styles.deposit_button}
            theme="secondary"
            onClick={deposit}
          >
            {loading ? <Loader size={60} /> : "Deposit"}
          </Button>
          <div />
        </div>
      </Modal>
    );
  }
);
