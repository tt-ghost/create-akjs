import { Module } from "akjs";
import Controller from "./Controller.js";
import Service from "./Service.js";
import Model from "./Model.js";

export default class Passport extends Module {
  constructor() {
    super("passport");
    this.controller = new Controller();
    this.service = new Service();
    this.model = new Model();

    this.loadToApp();
  }
  routes() {
    this.router.post("/reg", (ctx) => this.controller.reg(ctx));
    this.router.put("/login", (ctx) => this.controller.login(ctx));

    return this.router.routes();
  }
}
