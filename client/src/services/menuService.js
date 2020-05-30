const items = [
  {
    _id: "mi001",
    name: "My Profile",
    icon: "fas fa-user-astronaut",
    path: "/me",
  },
  {
    _id: "mi002",
    name: "Categories",
    icon: "fas fa-code-branch",
    path: "/categories",
  },
  {
    _id: "mi003",
    name: "Feedback",
    icon: "fas fa-comments",
    path: "/feedback",
  },
  {
    _id: "mi004",
    name: "Logout",
    icon: "fas fa-sign-out-alt",
    path: "/logout",
  },
];

export function getItems() {
  return items.filter((i) => i);
}
