import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import useInput from "../../hooks/useInput"
import Input from "../../ui/Input/Input"
import { TypesInput } from "../../types/enums/InputEnums"
import Button from "../../ui/Button/Button"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"

const Profile = () => {

  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  if(!userInfo){
    return <div>Загрузка</div>
  }
  const { sendRequset } = useFetch()
  const { username, email, id, phone, role } = userInfo

  const { value: usernameValue , handleChange: handleUsernameChange} = useInput(username)
  const {value : emailValue, handleChange: handleEmailChange} = useInput(email)
  const {value: phoneValue, handleChange: handleChangePhone} = useInput(phone)
  const {value : passwordValue, handleChange: handleChangePassword} = useInput("")
  const handleSave = () => {
    sendRequset(`http://localhost:8000/users/${id}`, "patch", {
      email: emailValue,
      phone: phoneValue,
      username: usernameValue,
      role: role,
      password: passwordValue
    });
  };

useEffect(() => {
console.log(userInfo)
}, [])

  return (
    
    <div style={{height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "0 auto"}}>
      <Input onChange={handleUsernameChange} type={TypesInput.TEXT} initialValue={usernameValue}/>
      <Input onChange={handleEmailChange} type={TypesInput.EMAIL} initialValue={emailValue}/>
      <Input onChange={handleChangePhone} type={TypesInput.PHONE} initialValue={phoneValue}/>
      <Input onChange={handleChangePassword} type={TypesInput.PASSWORD} initialValue={passwordValue} />
      <Button text="Изменить данные" onClick={handleSave}/>
    </div>
  )
}

export default Profile
