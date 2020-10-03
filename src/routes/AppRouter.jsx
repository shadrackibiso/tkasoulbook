import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SoulsWon from "./SoulsWon";
import Testimonies from "./Testimonies";
// import HomeCell from "./HomeCell";
import Members from "./Members";
import Sermons from "./Sermons";
import SingleSermon from "./SingleSermon";
import LeaderBoard from "./LeaderBoard";
import Profile from "./Profile";
// import JourneyClass from "./JourneyClass";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddSoul from "./AddSoul";

function AppRouter(props) {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path={!props.user ? "/" : "login"} exact={true}>
            <LogIn {...props} />
          </Route>
          <Route path="/signUp">
            <SignUp {...props} />
          </Route>
          <Route path={props.user && "/"} exact={true}>
            <Home {...props} />
          </Route>
          <Route path="/soulsWon">
            <SoulsWon {...props} />
          </Route>
          <Route path="/testimonies">
            <Testimonies {...props} />
          </Route>
          <Route path="/Sermons">
            <Sermons {...props} />
          </Route>
          <Route
            path="/sermon/:id"
            render={(defaultProps, stateProps = { ...props }) => (
              <SingleSermon {...defaultProps} store={stateProps} />
            )}
          />
          <Route path="/leaderBoard">
            <LeaderBoard {...props} />
          </Route>
          {/* <Route path="/homeCell">
            <HomeCell {...props} />
          </Route> */}
          <Route path="/members">
            <Members {...props} />
          </Route>
          <Route path="/profile">
            <Profile {...props} />
          </Route>
          {/* <Route path="/journeyClass">
            <JourneyClass {...props} />
          </Route> */}
          <Route path="/addSoul">
            <AddSoul {...props} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
