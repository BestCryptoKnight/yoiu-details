import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectKeplr } from "store/keplr/selectors";
import { keplrConnect } from "store/keplr/actionCreators";

import { Button, Modal, Text } from "@project/libs/components";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import * as secret from "api/secret/secret";
import { isAdminApi, loginAdminApi } from "api/wallet";
import { TEST_CHAIN_ID } from "global/chaindId";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const dispatch = useDispatch();
  const { address } = useSelector(selectKeplr);

  const connectWallet = useCallback(async () => {
    const balance = await secret.balance();
    if (balance < 70000) {
      toast.error("Please ensure that your balance is over 0.1 SCRT");
      return;
    }
    await secret.setViewingKey();
    // const keplrOfflineSigner =
    //   window.keplr.getOfflineSignerOnlyAmino(TEST_CHAIN_ID);
    // const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
    // const isAdmin = await isAdminApi(myAddress);
    // if (isAdmin?.data) {
    //   const signatureKey = await secret.signature();
    //   const result = await loginAdminApi(
    //     myAddress,
    //     signatureKey.signature,
    //     signatureKey.pub_key.value
    //   );
    //   console.log({ result });
    // }
    dispatch(keplrConnect());
  }, [dispatch]);

  React.useEffect(() => {
    if (address) {
      onClose();
    }
  }, [address, onClose]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} className={styles.modal_container}>
      <Button theme="secondary" onClick={connectWallet}>
        Connect
      </Button>
      <Text>Please connect you wallet first !</Text>
    </Modal>
  );
};
