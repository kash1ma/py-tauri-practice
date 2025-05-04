import { FC, useEffect } from "react";

interface INotificationProps {
  duration: number;
  message: string;
  onClose: () => void;
}

export const Notification: FC<INotificationProps> = ({
  duration,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#2196F3",
        color: "white",
        borderRadius: "5px",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
