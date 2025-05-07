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
  const { username, email, id, phone } = userInfo

  const { value: usernameValue , handleChange: handleUsernameChange} = useInput(username)
  const {value : emailValue, handleChange: handleEmailChange} = useInput(email)
  const {value: phoneValue, handleChange: handleChangePhone} = useInput(phone)


useEffect(() => {
console.log(userInfo)
}, [])

  return (
    
    <div>
      <Input onChange={handleUsernameChange} type={TypesInput.TEXT} initialValue={usernameValue}/>
      <Input onChange={handleEmailChange} type={TypesInput.EMAIL} initialValue={emailValue}/>
      <Input onChange={handleChangePhone} type={TypesInput.PHONE} initialValue={phoneValue}/>
      <Button onClick={() => sendRequset(`localhost:8000/users/users/${id}`, "put")}/>
    </div>
  )
}

export default Profile
