import * as Sentry from "@sentry/browser";

function init() {
  return Sentry.init({
    dsn:
      "https://1c103f634e234ee693d72dc112fdc845@o224552.ingest.sentry.io/5253737",
  });
}

export default {
  init,
};
