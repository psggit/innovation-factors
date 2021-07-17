/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "Components/Header";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import Login from "Container/Login";
import InnovationFactor from "Container/InnovationFactor";
import Groupsets from "Container/Groupsets";
import ImprovementResource from "Container/ImprovementResources";
import Stages from "Container/Stages";
import Comments from "Container/Comments";
import Admin from "Container/Admin";
import { theme } from "./Theme";

const history = createHistory();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).isLoggedIn
      : false
  );
  const [currentRoute, setCurrentRoute] = React.useState(
    window.location.pathname.split("/")[1] || "/"
  );

  useEffect(() => {
    history.listen((location) => {
      const newRoute =
        location.pathname.split("/")[1].trim().length > 0
          ? location.pathname.split("/")[1]
          : "/";
      setCurrentRoute(newRoute);
      setIsLoggedIn(
        localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo")).isLoggedIn
          : false
      );
    });
    if (!isLoggedIn) history.push("/login");
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <div style={{ display: "flex" }}>
          {isLoggedIn && (
            <Header currentRoute={currentRoute} history={history} />
          )}
          {!isLoggedIn && (
            <Route
              exact
              path="/login"
              render={() => <Login history={history} />}
            />
          )}
          <div style={{ width: "calc(100% - 64px)" }}>
            {isLoggedIn && (
              <React.Fragment>
                <Route
                  exact
                  path="/innovation-capacity"
                  render={() => (
                    <InnovationFactor history={history} title={currentRoute} />
                  )}
                />
                <Route
                  exact
                  path="/groupsets"
                  render={() => (
                    <Groupsets history={history} title={currentRoute} />
                  )}
                />
                <Route
                  exact
                  path="/improvement-resources"
                  render={() => (
                    <ImprovementResource
                      history={history}
                      title={currentRoute}
                    />
                  )}
                />
                <Route
                  exact
                  path="/stages"
                  render={() => (
                    <Stages history={history} title={currentRoute} />
                  )}
                />
                <Route
                  exact
                  path="/comments"
                  render={() => (
                    <Comments history={history} title={currentRoute} />
                  )}
                />
                <Route
                  exact
                  path="/admin"
                  render={() => (
                    <Admin history={history} title={currentRoute} />
                  )}
                />
              </React.Fragment>
            )}
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
