import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: "2.2rem",
    position: "relative",
    boxShadow: "0 3px 5px rgba(9, 11, 18, 0.05)",
    letterSpacing: "1px",
  },
  cardContent: {
    paddingBottom: 0,
  },
  cardActions: {
    fontSize: ".5rem",
    padding: "0.3rem",
  },
  category: {
    fontWeight: 600,
    fontSize: "1.5rem",
  },
});

const CategoryCard = ({ category, onDelete, onOpenPicker }) => {
  const classes = useStyles();

  const bgStyle = {
    background: category.color || "#FFC107",
  };

  return (
    <Card className={classes.root} variant="elevation">
      <span className="strip" style={bgStyle}></span>

      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.category}
          color="textPrimary"
          gutterBottom
        >
          {category.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={onDelete} size="small" style={{ color: "#E84A5F" }}>
          Delete
        </Button>
        <Link to={`/categories/${category._id}`}>
          <Button
            size="small"
            style={{ color: "#1890FF" }}
            onClick={onOpenPicker}
          >
            Edit
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
