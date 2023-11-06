import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "../pages/Index";
import ViewMovies from "../pages/ViewMovies";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/views/:id" component={ViewMovies} exact />
        <Route path="/add" component={AddMovie} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/profile" component={Profile} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
