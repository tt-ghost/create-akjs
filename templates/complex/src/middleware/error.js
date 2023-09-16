export default function error() {
  return async (ctx, next) => {
    console.log("error ----");
    try {
      await next();
      switch (ctx.status) {
        case 404: {
          ctx.status = 200;
          ctx.body = { message: "404" };
          break;
        }
        default: {
          break;
        }
      }
    } catch (e) {
      ctx.status = 200;
      ctx.body = {
        status: 500,
        message: e.message || "异常",
        data: null,
      };
    }
  };
}
