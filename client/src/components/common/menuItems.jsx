import React from "react";
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

function ListItemLink(props) {
  return <ListItem button component={Link} {...props}></ListItem>;
}

const MenuItems = ({ items }) => {
  return (
    <List component="nav">
      {items.map((item) => (
        <ListItemLink href={item.path} key={item._id} color="secondary">
          <ListItemIcon>
            <i className={item.icon}></i>
          </ListItemIcon>
          <ListItemText primary={item.name}></ListItemText>
        </ListItemLink>
      ))}
    </List>
  );
};

export default MenuItems;
