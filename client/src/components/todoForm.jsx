import React from "react";
import Joi from "joi-browser";

import { Grid, FormControl } from "@material-ui/core";

import Form from "./common/form";
import PickDate from "./common/date";
import PickTime from "./common/time";

import { getTodo, saveTodo } from "../services/todoService";
import { getCategories } from "../services/categoryService";

class TodoForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      categoryId: "",
      createdOn: null,
      todoAt: null,
    },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().max(255).trim().required().label("Title"),
    description: Joi.string().max(150).trim().allow(""),
    categoryId: Joi.string().required().label("Category"),
    createdOn: Joi.string().required().label("Date"),
    todoAt: Joi.string().required().label("Time"),
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });

    const todoId = this.props.match.params.id;
    if (todoId === "new") return;

    try {
      const { data: todo } = await getTodo(todoId);
      this.setState({ data: this.mapToViewModel(todo) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(todo) {
    return {
      _id: todo._id,
      title: todo.title,
      description: todo.description,
      categoryId: todo.category._id,
      createdOn: todo.createdOn,
      todoAt: todo.todoAt,
    };
  }

  doSubmit = async () => {
    await saveTodo(this.state.data);
    const { state } = this.props.location;
    window.location = state ? state.from.pathname : "/todos";
  };

  handleDateTimeChange = (date, value, key) => {
    const { data } = this.state;
    data[key] = value;

    this.setState({ data });
  };

  render() {
    const { createdOn, todoAt } = this.state.data;
    const { categories } = this.state;

    return (
      <Grid container direction="column" spacing={9}>
        <Grid item xs={12}>
          <form onSubmit={this.handleSubmit}>
            <Grid item sm={12} md={6}>
              {this.renderInput("title", "Title", "text")}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderTextArea(
                "description",
                150,
                "Add a short description (Optional)"
              )}
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderSelect("categoryId", "Choose Category", categories)}
            </Grid>
            <Grid
              item
              sm={12}
              md={6}
              container
              justify="space-between"
              spacing={3}
            >
              <Grid item xs={6} sm={4} md={4}>
                <FormControl margin="dense" fullWidth required>
                  <PickDate
                    name="createdOn"
                    selectedDate={createdOn}
                    onChange={this.handleDateTimeChange}
                  ></PickDate>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <FormControl margin="dense" fullWidth required>
                  <PickTime
                    name="todoAt"
                    selectedDate={todoAt}
                    onChange={this.handleDateTimeChange}
                  ></PickTime>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item sm={12} md={6}>
              {this.renderBtn("Save")}
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default TodoForm;
