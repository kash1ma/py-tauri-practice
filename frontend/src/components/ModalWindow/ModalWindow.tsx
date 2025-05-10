import React, { FC, useRef } from "react";
import styles from "./ModalWindow.module.css";
import ReactDOM from "react-dom";



interface IModalCartProps {
  isOpen: boolean;
  onClose: () => void;
  size: "large" | "small";
  children: React.ReactNode
}

const ModalWindow: FC<IModalCartProps> = ({ isOpen, onClose, children, size }) => {
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
      <div className={ size === "small" ? styles.modalContainerSmall : styles.modalContainerLarge}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalWindow;
