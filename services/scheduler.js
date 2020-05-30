const cron = require("node-cron");
const { Todo } = require("../models/todo");

function formatDate() {
  const dateObj = new Date();
  const day = dateObj.getDate().toString();
  const month = (dateObj.getMonth() + 1).toString();
  const year = dateObj.getFullYear().toString();

  const todayDate =
    day.padStart(2, "0") +
    "/" +
    month.padStart(2, "0") +
    "/" +
    year.padStart(2, "0");

  return todayDate;
}

module.exports = function () {
  cron.schedule("* 59 23 * * *", async () => {
    await Todo.deleteMany({
      createdOn: { $lte: formatDate() },
    });
    console.log("Schedule maintenance completed");
  });
};
