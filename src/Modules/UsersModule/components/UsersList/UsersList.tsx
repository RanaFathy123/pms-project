import { useContext } from "react"
import { AllUsersContext } from "../../../../context/AllUsersContext"

export default function UsersList() {
  const {allUsersList} =useContext(AllUsersContext)
  console.log(allUsersList);
  
  return (
    <div>UsersList</div>
  )
}
