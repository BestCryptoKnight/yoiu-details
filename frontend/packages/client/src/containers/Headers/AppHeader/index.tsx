import React, { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectWalletApi, isAdminApi, loginAdminApi } from "api/wallet";

import { PathName, strings } from "global";
import { selectKeplr } from "store/keplr/selectors";
import { keplrConnect, keplrDisconnect } from "store/keplr/actionCreators";
import { shortenPhrase } from "utils";
import { useModal } from "hooks";

import {
  arrowIcon,
  logoBlue,
  logoWhite,
  burgerMenu,
} from "@project/libs/assets/images";
import { Button, Image } from "@project/libs/components";

import { MobileSidebar } from "./Sidebar";
import { DisconnectWalletModal } from "./DisconnectWalletModal";
import * as secret from "api/secret/secret";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { Loader } from "@project/libs/components";

type HeaderProps = {
  isImageBlue?: boolean;
  isProjectPage?: boolean;
};

export const AppHeader = memo<HeaderProps>(({ isImageBlue, isProjectPage }) => {
  const dispatch = useDispatch();
  const { address, name } = useSelector(selectKeplr);
  const [isOpen, onToggle] = useModal();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const connectWallet = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const balance = await secret.balance();
    if (balance < 70000) {
      toast.error("Please ensure that your balance is over 0.1 SCRT");
      return;
    }
    await secret.setViewingKey();
    dispatch(keplrConnect());
    setLoading(false);
  }, [dispatch]);

  const disConnectWallet = useCallback(() => {
    dispatch(keplrDisconnect());
    localStorage.removeItem("user");
    onToggle();
  }, [dispatch, onToggle]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.header_wrapper}>
      <div className={styles.container}>
        {!isProjectPage && (
          <Link to={PathName.home}>
            <Image
              url={isImageBlue ? logoBlue : logoWhite}
              className={styles.header_logo}
            />
          </Link>
        )}
        {!isProjectPage && (
          <div className={styles.header_links}>
            <Link to="/">Landing page</Link>
            <Link to="/listings">Listings</Link>
            <a href="https://docs.yoiu.io/" target="_blank" rel="noreferrer">
              Docs
            </a>
          </div>
        )}

        {isProjectPage && <div style={{ flex: 1 }} />}

        {!address && (
          <Button
            theme="secondary"
            className={styles.connect_button}
            onClick={connectWallet}
          >
            {!loading ? strings.connect : <Loader size={60} />}
          </Button>
        )}

        {address && (
          <div className={styles.disconnect_button_container}>
            <Button className={styles.dis_connect_button} onClick={onToggle}>
              <div className={styles.wallet_info}>
                <span>{name}</span>
                <span className={styles.address}>{shortenPhrase(address)}</span>
              </div>

              <Image
                url={arrowIcon}
                className={styles.button_logo}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Button>
            <DisconnectWalletModal
              onDisconnect={disConnectWallet}
              isOpen={isOpen}
            />
          </div>
        )}

        <button className={styles.menu_button} onClick={toggleSidebar}>
          <Image url={burgerMenu} />
        </button>

        <MobileSidebar
          onConnect={connectWallet}
          onDisconnect={disConnectWallet}
          isOpen={isSidebarOpen}
          onClose={toggleSidebar}
        />
      </div>
    </div>
  );
});
