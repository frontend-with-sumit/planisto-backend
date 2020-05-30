import React, { Component } from "react";
import { ChromePicker } from "react-color";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  FormControl,
} from "@material-ui/core";

import Message from "../common/message";

import { getCategory, saveCategory } from "../../services/categoryService";

class CategoryForm extends Component {
  state = {
    data: {
      name: "",
      color: "",
    },
    showSnackbar: false,
    message: "",
  };

  async componentDidMount() {
    const categoryId = this.props.match.params.id;
    if (categoryId === "new") return;

    try {
      const { data: category } = await getCategory(categoryId);
      this.setState({ data: this.mapToViewModel(category) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(category) {
    return {
      _id: category._id,
      name: category.name,
      color: category.color,
    };
  }

  handleSubmit = async () => {
    try {
      await saveCategory(this.state.data);
      this.props.history.replace("/categories");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        this.setState({ showSnackbar: true, message: ex.response.data });
    }
  };

  handleChangeName = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };

  handleChangeColor = (color) => {
    const data = { ...this.state.data };
    data.color = color.hex;
    this.setState({ data });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;

    this.setState({ showSnackbar: false });
  };

  render() {
    const { showSnackbar, message } = this.state;
    const { name, color } = this.state.data;
    let { open } = this.props;

    if (this.props.match.params.id) {
      open = true;
    }

    return (
      <>
        {showSnackbar && (
          <Message
            open={showSnackbar}
            onClose={this.handleCloseSnackbar}
            severity="error"
            message={message}
          ></Message>
        )}
        <Dialog
          open={open}
          PaperProps={{
            elevation: 0,
          }}
          className="dialog"
        >
          <DialogTitle>Add/Edit Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Categories will help you to arrange your goals in an efficient
              manner. Define categories creatively.
            </DialogContentText>
            <Grid container direction="column">
              <form>
                <Grid item xs={12}>
                  <FormControl margin="dense" fullWidth>
                    <TextField
                      id="name"
                      name="name"
                      label="Category Name"
                      type="text"
                      value={name}
                      onChange={this.handleChangeName}
                      autoComplete="off"
                    />
                  </FormControl>
                </Grid>
                <div className="mb"></div>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <ChromePicker
                      disableAlpha
                      color={color}
                      onChange={this.handleChangeColor}
                    ></ChromePicker>
                  </FormControl>
                </Grid>
              </form>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button href="/categories" color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default CategoryForm;
