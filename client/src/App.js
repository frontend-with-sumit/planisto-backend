import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";

import Appbar from "./components/common/appbar";
import TodoForm from "./components/todoForm";
import Todos from "./components/todos";
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import Auth from "./components/auth";
import Home from "./components/home";
import NotFound from "./components/notFound";

import Me from "./components/sidebar/me";
import Categories from "./components/sidebar/categories";
import CategoryForm from "./components/sidebar/categoryForm";
import Feedback from "./components/sidebar/feedback";
import Logout from "./components/sidebar/logout";

import ProtectedRoute from "./components/common/protectedRoutes";

import "./App.css";

class App extends Component {
  state = {
    openPicker: false,
  };

  handleOpenPicker = () => {
    this.setState({ openPicker: true });
  };

  render() {
    const { openPicker } = this.state;
    return (
      <>
        <Appbar></Appbar>
        <main className="mt">
          <Grid container spacing={0}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Switch>
                <Route path="/register" exact component={Register}></Route>
                <Route
                  path="/forgot-password"
                  exact
                  component={ForgotPassword}
                ></Route>
                <Route path="/auth" exact component={Auth}></Route>

                <ProtectedRoute
                  path="/me"
                  exact
                  component={Me}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/categories/:id"
                  exact
                  render={(props) => (
                    <CategoryForm open={openPicker} {...props}></CategoryForm>
                  )}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/categories"
                  render={(props) => (
                    <Categories
                      onOpenPicker={this.handleOpenPicker}
                      {...props}
                    ></Categories>
                  )}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/feedback"
                  exact
                  component={Feedback}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/logout"
                  exact
                  component={Logout}
                ></ProtectedRoute>

                <ProtectedRoute
                  path="/todos/:id"
                  component={TodoForm}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/todos"
                  exact
                  component={Todos}
                ></ProtectedRoute>
                <Route path="/not-found" exact component={NotFound}></Route>
                <Route path="/" exact component={Home}></Route>
                <Redirect to="/not-found"></Redirect>
              </Switch>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </main>
      </>
    );
  }
}

export default App;
