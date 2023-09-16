import { Controller } from "akjs";

export default class BaseController extends Controller {
  success(ctx, data = null) {
    ctx.body = {
      status: 200,
      message: "成功",
      data,
    };
  }

  badRequest(ctx, data = null, message) {
    ctx.body = {
      status: 400,
      message: message || "参数错误",
      data,
    };
  }

  forbidden(ctx, data = null, message) {
    ctx.body = {
      status: 401,
      message: message || "未登录",
      data,
    };
  }

  unAuth(ctx, data = null, message) {
    ctx.body = {
      status: 403,
      message: message || "未授权",
      data,
    };
  }

  notFound(ctx, data = null, message) {
    ctx.body = {
      status: 404,
      message: message || "未找到",
      data,
    };
  }

  error(ctx, status, data = null, message) {
    ctx.body = {
      status,
      message: message || "异常",
      data,
    };
  }
}
