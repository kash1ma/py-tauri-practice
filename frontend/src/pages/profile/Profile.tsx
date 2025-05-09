import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useInput from "../../hooks/useInput";
import Input from "../../ui/Input/Input";
import { TypesInput } from "../../types/enums/InputEnums";
import Button from "../../ui/Button/Button";
import useFetch from "../../hooks/useFetch";
import styles from "./Profile.module.css";

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  if (!userInfo) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  const { sendRequset } = useFetch();
  const { username, email, id, phone, role } = userInfo;

  const { value: usernameValue, handleChange: handleUsernameChange } =
    useInput(username);
  const { value: emailValue, handleChange: handleEmailChange } =
    useInput(email);
  const { value: phoneValue, handleChange: handleChangePhone } =
    useInput(phone);
  const { value: passwordValue, handleChange: handleChangePassword } =
    useInput("");

  const handleSave = () => {
    sendRequset(`http://localhost:8000/users/${id}`, "patch", {
      email: emailValue,
      phone: phoneValue,
      username: usernameValue,
      role: role,
      password: passwordValue,
    });
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Профиль пользователя</h2>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Имя пользователя</label>
        <Input
          onChange={handleUsernameChange}
          type={TypesInput.TEXT}
          initialValue={usernameValue}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Email</label>
        <Input
          onChange={handleEmailChange}
          type={TypesInput.EMAIL}
          initialValue={emailValue}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Телефон</label>
        <Input
          onChange={handleChangePhone}
          type={TypesInput.PHONE}
          initialValue={phoneValue}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Новый пароль</label>
        <Input
          onChange={handleChangePassword}
          type={TypesInput.PASSWORD}
          initialValue={passwordValue}
        />
      </div>

      <Button
        text="Изменить данные"
        onClick={handleSave}
        otherButtonStyles={{
          width: "100%",
          padding: "14px",
          marginTop: "20px",
          background: "#ff7b25",
          color: "#121212",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "1rem",
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
};

export default Profile;
