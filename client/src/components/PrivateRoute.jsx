import { Outlet,Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function PrivateRoute() {

    const session=useSelector(state=>state.user.session);

  return (
    session ? <Outlet/> : <Navigate to={'/login'}/>
  )
}
