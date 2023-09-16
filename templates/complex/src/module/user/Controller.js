import BaseController from "../../base/BaseController.js";

export default class UserController extends BaseController {
  /**
   * get current user
   */
  async getCurrent(ctx) {
    console.log("cookies: token ", ctx.cookies.get("token"));
    const error = this.app.validate({ name: "string" }, { name: 2 });
    const current = await this.app.service.User.getCurrentUser(1);

    console.log("current: ", current);
    if (error) {
      this.badRequest(ctx, error);
    } else {
      this.success(ctx);
    }
  }

  /**
   * 通过userId获取用户信息
   */
  async getById(ctx) {
    const { userId } = ctx.params;
    const rule = {
      userId: "id",
    };
    const error = this.app.validate(rule, { userId });
    if (error) {
      this.badRequest(ctx, error);
    } else {
      const result = await this.app.service.User.read(userId);
      this.success(ctx, result);
    }
  }

  /**
   * add user
   */
  async create(ctx) {
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
      await this.app.service.User.create(user);
      this.success(ctx);
    }
  }

  /**
   * update user
   */
  async update(ctx) {
    const user = ctx.request.body;
    const { username, email } = user;
    const rule = {
      userId: "id",
    };
    if (username) rule.username = "email";
    if (email) rule.email = "email";
    const error = this.app.validate(rule, { ...user });

    if (error) {
      this.badRequest(ctx, error);
    } else {
      await this.app.service.User.update(user);
      this.success(ctx);
    }
  }
}
