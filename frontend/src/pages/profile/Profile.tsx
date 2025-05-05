import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

const Profile = () => {

  const name = useSelector((state: RootState) => state.auth.userInfo?.username)

  return (
    <div>
      {name}
      this is profile
    </div>
  )
}

export default Profile
