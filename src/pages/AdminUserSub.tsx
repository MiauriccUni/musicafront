import GridUserSub from "../components/GridUserSub";
import * as UserNav from "../components/UserNav";
import UserSubUpdat from "../components/UserSubUpdat";


export default function AdminUserSub(){

  return(
    <div>
      <UserNav.NavBar />
      <div>
        <GridUserSub/>
      </div>
      <div>
        <UserSubUpdat/>
      </div>
    </div>
  )
}