import { CSSProperties, FC } from "react";
import styles from "./Button.module.css";

interface IButtonProps {
  text?: string;
  otherButtonStyles?: CSSProperties;
  imgStyles?: CSSProperties;
  img?: string;
  onClick?: () => void;
  isDisabled?: boolean
}

const Button: FC<IButtonProps> = ({
  text,
  onClick,
  otherButtonStyles,
  img,
  imgStyles,
  isDisabled
}) => {
  return (
    <div>
      <button
        className={styles.button}
        style={otherButtonStyles}
        onClick={onClick}
        disabled={isDisabled}
      >
        {text ? text : <img style={imgStyles} src={img} />}
      </button>
    </div>
  );
};

export default Button;
