import React, { FC, useRef, useState } from "react";
import styles from "./ModalCart.module.css";
import Button from "../../ui/Button/Button";
import ReactDOM from "react-dom";

interface IModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCart: FC<IModalCartProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ""}`}
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modalContainer}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ModalCart;
