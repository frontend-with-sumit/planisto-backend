import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

import MidElement from "./common/midElement";
import FabBtn from "./common/fabBtn";

import TaskCard from "./taskCard";

import { getTodos, deleteTodo } from "../services/todoService";

class Todos extends Component {
  state = {
    todos: [],
  };

  async componentDidMount() {
    const { data: todos } = await getTodos();
    this.setState({ todos });
  }

  handleCompleteStatus = async (todo) => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todo);
    todos[index] = { ...todos[index] };
    todos[index].isComplete = !todos[index].isComplete;

    this.setState({ todos });
  };

  handleDelete = async (todo) => {
    const originalTodos = this.state.todos;
    const todos = originalTodos.filter((t) => t._id !== todo._id);
    this.setState({ todos });

    try {
      await deleteTodo(todo._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.setState({ message: ex.response.data, showSnackbar: true });

      this.setState({ todos: originalTodos });
    }
  };

  render() {
    const { todos } = this.state;

    const dates = [];
    for (let todo of todos)
      if (!dates.includes(todo.createdOn)) dates.push(todo.createdOn);

    dates.sort();
    const todayDate = new Date().toLocaleDateString("en-GB");

    return (
      <>
        <Grid container spacing={7} direction="column" className="mb">
          {dates.map((date, index) => (
            <React.Fragment key={index}>
              <Typography style={{ padding: "1rem", paddingBottom: "0" }}>
                {date === todayDate ? `Today` : `${date} (Upcoming)`}
              </Typography>
              <Grid item xs={12} container spacing={9}>
                {todos.map((todo) => (
                  <React.Fragment key={todo._id}>
                    {todo.createdOn === date && (
                      <Grid item xs={12} sm={6} md={4}>
                        <TaskCard
                          todo={todo}
                          onDelete={() => this.handleDelete(todo)}
                          onToggle={() => this.handleCompleteStatus(todo)}
                        ></TaskCard>
                      </Grid>
                    )}
                  </React.Fragment>
                ))}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <FabBtn></FabBtn>
        {!todos.length && (
          <MidElement text="Click '+' to start planning your day. Before adding new task please add new categories through categories section in side menu"></MidElement>
        )}
      </>
    );
  }
}

export default Todos;
