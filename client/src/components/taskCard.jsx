import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: "2.5rem",
    position: "relative",
    boxShadow: "0 3px 5px rgba(9, 11, 18, 0.05)",
    letterSpacing: "1px",
  },
  cardContent: {
    paddingBottom: 0,
  },
  cardActions: {
    padding: "0.3rem",
  },
  category: {
    fontWeight: 500,
    fontSize: 15,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: 600,
  },
  description: {
    padding: "4px 0",
    fontSize: 15,
    fontWeight: 400,

    "& span": {
      fontWeight: "900",
    },
  },
});

const TaskCard = ({ todo, onDelete, onToggle }) => {
  const { color } = todo.category;
  const classes = useStyles();
  const bgStyle = {
    background: color,
  };
  const textStyle = {
    color,
  };

  return (
    <Card className={classes.root} variant="elevation">
      <div className="checkbox">
        <Checkbox
          checked={todo.isComplete}
          color="default"
          className={classes.checkbox}
          icon={<i className="far fa-check-circle"></i>}
          checkedIcon={<i className="fas fa-check-circle"></i>}
          onChange={onToggle}
        ></Checkbox>
      </div>
      {todo.isComplete ? (
        <span className="strip" style={bgStyle}></span>
      ) : (
        <span className="strip" style={{ background: "#95a5ae" }}></span>
      )}
      <CardContent className={classes.cardContent}>
        {todo.isComplete ? (
          <Typography
            className={classes.category}
            style={textStyle}
            gutterBottom
          >
            {todo.category.name}
          </Typography>
        ) : (
          <Typography
            className={classes.category}
            color="textSecondary"
            gutterBottom
          >
            {todo.category.name}
          </Typography>
        )}
        <Typography variant="h6" className={classes.title}>
          {todo.title}
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
          {todo.description}
        </Typography>
        <Typography variant="subtitle2" className={classes.description}>
          Time: <span>{todo.todoAt}</span>
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={onDelete} size="small" style={{ color: "#E84A5F" }}>
          Delete
        </Button>
        <Button
          size="small"
          style={{ color: "#1890FF" }}
          href={`/todos/${todo._id}`}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
