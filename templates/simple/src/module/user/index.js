import { Module } from "akjs";
import Controller from "./Controller.js";
import Service from "./Service.js";

export default class User extends Module {
  constructor() {
    super("user");
    this.controller = new Controller();
    this.service = new Service();

    this.loadToApp();
  }
  
  routes() {
    this.router.get("/hello", (ctx) => this.controller.sayHello(ctx));

    return this.router.routes();
  }
}
