import { Controller } from "akjs";

export default class UserController extends Controller {
  /**
   * say hello
   */
  async sayHello(ctx) {
    console.log("cookies: token ", ctx.cookies.get("token"));

    const result = await this.app.service.User.sayHello("hello akjs");

    ctx.body = result;
  }
}
