import Raven from "raven-js";

function init() {
  Raven.config("https://2fcf41b92da8483cb4b9959fca5886ea@sentry.io/1314110", {
    release: "1-0-0",
    environment: "development-test"
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
    init,
    log
}
