import error from "./error.js";
import session from "./session.js";
import proxyCDN from "./proxy-cdn.js";
import favicon from "./favicon.js";

export default (app) => {
  error(app);
  session(app);
  proxyCDN(app);
  favicon(app);
};
