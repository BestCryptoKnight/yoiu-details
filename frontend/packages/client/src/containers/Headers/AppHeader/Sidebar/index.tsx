/* eslint-disable */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { shortenPhrase } from 'utils'
import { strings } from 'global'
import { selectKeplr } from 'store/keplr/selectors'

import { AvatarImage ,leftArrow} from '@project/libs/assets/images'
import {
  Button, Image,
} from '@project/libs/components'

import styles from './styles.module.scss'

interface Props {
  isOpen:boolean;
  onConnect : () => void
  onDisconnect : () => void
  onClose : ()=> void
}

export const MobileSidebar = ({
  isOpen, onClose, onConnect, onDisconnect,
}: Props) => {
  const { address, name } = useSelector(selectKeplr)
  const {pathname} = useLocation()

  React.useEffect(()=> {
      if (isOpen) {
            onClose()
      }
  } , [pathname])

  return (
    <div
      className={styles.sidebar_container}
      style={{ transform: !isOpen ? 'translateX(-100%)' : 'translateX(0%)' }}
    >

      <div
        onClick={onClose}
        className={styles.sidebar_backdrop}
        style={{ display: isOpen ? 'block' : 'none' }}
      />

      <div className={styles.sidebar}>
      <button onClick={onClose} className={styles.close_button}>
      <img src={leftArrow} width={24} />
      </button>
        <div className={styles.links}>

          {
            address ? (
              <div className={styles.wallet_info}>
                <Image url={AvatarImage} />
                <div>{name}</div>
                <div className={styles.address}>{shortenPhrase(address)}</div>
              </div>
            ) : <div style={{ padding: 16 }} />
          }

          {address && <Link to="/user">Dashboard</Link>}
          <Link to="/">Landing page</Link>
          <Link to="/listings">Listings</Link>
          <a
            href="https://docs.yoiu.io/"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>

        <Button
          className={styles.connection_button}
          onClick={address ? onDisconnect : onConnect}
          theme="secondary"
        >
          {address ? strings.disconnect : strings.connect}
        </Button>
      </div>
    </div>
  )
}
