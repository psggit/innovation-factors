/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
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
import { theme } from "./Theme";

const history = createHistory();

function App() {
  const [currentRoute, setCurrentRoute] = React.useState(
    window.location.pathname.split("/")[1] || "/"
  );

  const isLoggedIn = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).isLoggedIn
    : null;

  useEffect(() => {
    history.listen((location) => {
      const newRoute =
        location.pathname.split("/")[1].trim().length > 0
          ? location.pathname.split("/")[1]
          : "/";
      setCurrentRoute(newRoute);
    });
    if (!isLoggedIn) history.push("/login");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        {isLoggedIn && <Header currentRoute={currentRoute} />}
        <Route exact path="/login" render={() => <Login history={history} />} />
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
          render={() => <Groupsets history={history} title={currentRoute} />}
        />
        <Route
          exact
          path="/improvement-resources"
          render={() => (
            <ImprovementResource history={history} title={currentRoute} />
          )}
        />
        <Route
          exact
          path="/stages"
          render={() => <Stages history={history} title={currentRoute} />}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
