import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

const Profile = () => {

  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  if(!userInfo){
    return <div>Загрузка</div>
  }

  const { username, role, email } = userInfo

  return (
    <div>
      {username}
      {role}
      {email}
      this is profile
    </div>
  )
}

export default Profile
