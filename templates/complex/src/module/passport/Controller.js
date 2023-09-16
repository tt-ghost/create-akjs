import BaseController from "../../base/BaseController.js";

export default class PassportController extends BaseController {
  async login(ctx) {
    const user = ctx.request.body;
    const rule = {
      username: "string",
      password: "string",
    };
    const error = this.app.validate(rule, user);
    if (error) {
      this.badRequest(ctx, error);
    } else {
      await this.app.service.Passport.login(user);
      this.success(ctx);
    }
  }

  async reg(ctx) {
    const user = ctx.request.body;
    const rule = {
      username: "string",
      password: "string",
      email: "email",
    };
    const error = this.app.validate(rule, user);
    if (error) {
      this.badRequest(ctx, error);
    } else {
      await this.app.service.Passport.reg(user);
      this.success(ctx);
    }
  }
}
