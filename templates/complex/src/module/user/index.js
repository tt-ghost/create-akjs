import { Module } from "akjs";
import Controller from "./Controller.js";
import Service from "./Service.js";
import Model from "./Model.js";

export default class User extends Module {
  constructor() {
    super("user");
    this.controller = new Controller();
    this.service = new Service();
    this.model = new Model();

    this.loadToApp();
  }
  routes() {
    this.router.get("/current", (ctx) => this.controller.getCurrent(ctx));
    this.router.get("/read/:userId", (ctx) => this.controller.getById(ctx));
    this.router.post(
      "/create",
      async (ctx) => await this.controller.create(ctx)
    );
    this.router.put(
      "/update",
      async (ctx) => await this.controller.update(ctx)
    );

    return this.router.routes();
  }
}
