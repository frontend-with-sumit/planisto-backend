import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Grid, Button } from "@material-ui/core";
import CategoryCard from "./categoryCard";

import { getCategories, deleteCategory } from "../../services/categoryService";

class Categories extends Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  handleDelete = async (category) => {
    const originalCategories = this.state.categories;

    const categories = originalCategories.filter((c) => c._id !== category._id);
    this.setState({ categories });

    try {
      await deleteCategory(category._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.setState({ showSnackbar: true, message: ex.response.data });

      this.setState({ categories: originalCategories });
    }
  };

  render() {
    const { onOpenPicker } = this.props;
    const { categories } = this.state;

    return (
      <Grid container alignItems="center" spacing={5}>
        {categories.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c._id}>
            <CategoryCard
              category={c}
              onDelete={() => this.handleDelete(c)}
              onOpenPicker={onOpenPicker}
            ></CategoryCard>
          </Grid>
        ))}

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          style={{ textAlign: "center", padding: "1.5rem" }}
        >
          <Link to="/categories/new">
            <Button color="secondary" onClick={onOpenPicker}>
              <i className="fas fa-plus"></i>
              Add Category
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
  }
}

export default Categories;
