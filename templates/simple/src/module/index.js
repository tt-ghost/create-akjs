import User from "./user/index.js";

export default async (app) => {
  const { router } = app;
  router.use("/user", await new User().routes());
};
