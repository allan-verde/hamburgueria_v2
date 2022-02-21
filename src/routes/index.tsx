import { Switch } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard"
import { Cart } from "../pages/Cart"
import { Login } from "../pages/Login"
import { Signup } from "../pages/Signup"
import { Route } from "./Route"

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/cart" component={Cart} isPrivate />
    </Switch>
  )
}