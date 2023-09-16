import User from "./user/index.js";
import Passport from "./passport/index.js";

export default async (app) => {
  const { router } = app;
  router.use("/user", await new User().routes());
  router.use("/passport", await new Passport().routes());
};
