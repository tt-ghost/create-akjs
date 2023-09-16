import chalk from "chalk";
import fsExtra from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import { isDirectoryEmpty, isDirectoryWriteable, copyDir, replaceContent } from "./helper";

export default async function createApp(): Promise<void> {
  const promptList = [
    {
      type: "input",
      message: "请输入项目名称: ",
      name: "appName",
      default: "my-akjs",
    },
    {
      type: "list",
      message: "请选择模板: ",
      name: "template",
      default: "simple",
      choices: [
        {
          name: "默认 (无额外依赖)",
          value: "simple",
        },
        {
          name: "复杂 (内置 数据库/插件/中间件等)",
          value: "complex",
        },
      ],
    },
  ];

  const promptRes = await inquirer.prompt(promptList);
  const root: string = path.resolve(promptRes.appName);
  const appName: string = path.basename(root);

  await fsExtra.ensureDir(root);

  if (!isDirectoryEmpty(root, appName)) {
    process.exit(1);
  }

  if (!(await isDirectoryWriteable(root))) {
    console.error("你的应用路径不可写，请检查权限后重试！");
    process.exit(1);
  }

  process.chdir(root);

  console.log();
  console.log(`正在创建 akjs 应用： ${chalk.green(root)}`);
  console.log();

  const tplPath = path.resolve(__dirname, `../templates/${promptRes.template}`);
  copyDir(tplPath, root);
  replaceContent(path.resolve(root, "package.json"), (data: string) => data.replace("akjs-example-npm-name", appName));

  console.log("***********************************");
  console.log("");
  console.log(chalk.green('cd ' + appName));
  console.log(chalk.gray("# 安装依赖"));
  console.log(chalk.green('pnpm i'));
  console.log(chalk.gray("# 启动"));
  console.log(chalk.green('pnpm dev'));
  console.log("");
  console.log("***********************************");
  console.log("");
}
