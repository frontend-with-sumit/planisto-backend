const schedule = require("node-schedule");
const { logger } = require("./logger");
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
  const rule = new schedule.RecurrenceRule();
  rule.hour = 11;
  rule.minute = 30;

  schedule.scheduleJob(rule, async () => {
    await Todo.remove({
      createdOn: { $lte: formatDate() },
    });
    logger.info("Scheduled maintenance completed");
  });
};
