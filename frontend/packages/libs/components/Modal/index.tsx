import React, {
  FC,
} from 'react';
import classNames from 'classnames/bind';
import RModal, { Props as RModalProps } from 'react-modal';

import {
  ButtonIcon,
} from '@project/libs/components';
import { closeIcon } from '@project/libs/assets/images';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const ROOT = document.getElementById('root');

type ModalProps = {
  onClose: () => void;
  classNameButton?: string
  className?: string
} & RModalProps;

const Modal: FC<ModalProps> = ({
  onClose,
  isOpen,
  style,
  portalClassName,
  bodyOpenClassName,
  htmlOpenClassName,
  className,
  overlayClassName,
  appElement,
  onAfterOpen = () => {},
  onAfterClose = () => {},
  closeTimeoutMS,
  aria,
  data,
  role,
  contentLabel,
  contentRef,
  overlayRef,
  testId,
  id,
  children,
  classNameButton,
}) => (
  <RModal
    isOpen={isOpen}
    style={style}
    portalClassName={portalClassName}
    bodyOpenClassName={cx(styles.body, bodyOpenClassName)}
    htmlOpenClassName={htmlOpenClassName}
    className={cx(
      styles.modal,
      className,
    )}
    overlayClassName={cx(styles.overlay, overlayClassName)}
    appElement={appElement}
    onAfterOpen={onAfterOpen}
    onAfterClose={onAfterClose}
    onRequestClose={onClose}
    closeTimeoutMS={closeTimeoutMS}
    ariaHideApp={false}
    shouldFocusAfterRender={false}
    shouldCloseOnOverlayClick
    shouldCloseOnEsc
    shouldReturnFocusAfterClose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parentSelector={() => ROOT!}
    aria={aria}
    data={data}
    role={role}
    contentLabel={contentLabel}
    contentRef={contentRef}
    overlayRef={overlayRef}
    testId={testId}
    id={id}
  >

    {children}
    <ButtonIcon
      onClick={onClose}
      imageURL={closeIcon}
      className={cx(styles.modal_close_button, classNameButton)}
      classNameImage={styles.close_image}
    />
  </RModal>
);

export { Modal };
