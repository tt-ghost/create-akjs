import { validate, sequelize } from "../plugin/index.js";

export default {
  validate: {
    enable: true,
    load: validate,
  },
  sequelize: {
    enable: true,
    load: sequelize,
  },
};
