import { config } from "../config.js";
import execa, { shellSync } from "execa";
import fsi from "fs-extra";
import chalk from "chalk";
import capitalize from "capitalize";

const threads = new Map();

/**
Vite Task
*/
/**
- check if the the project is available
*/

threads.set("vite", {
  name: `Installing vite for ${config.get("framework")} template`,
  task: async () => {
    const { stdoutVite } = await execa(
      "npm",
      [
        "create",
        "vite@latest",
        `${config.get("framework")}-${config.get("appName")}`,
        ,
        `--`,
        `--template`,
        `${config.get("framework")}`,
      ],
      {
        cwd: `${process.cwd()}`,
      }
    );
  },
});

/**
Vue Tasks
*/

threads.set("tailwind", {
  name: "Installing Tailwindcss",
  task: async () => {
    // if the framework is React
    const { stdoutVue } = await shellSync(`npm init -y`, {
      cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}`,
    });

    const { stdoutPinia } = await execa(
      "npm",
      ["install", "tailwindcss", "postcss", "autoprefixer", "--save-dev"],
      {
        cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
          "appName"
        )}`,
      }
    );
  },
});

threads.set("assets", {
  name: "Preparing assets files",
  task: async () => {
    const { stdout } = await execa("npx", ["tailwindcss", "init", "-p"], {
      cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}`,
    });
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/tailwind.config.js`,
      config.get("tailwindConfigModule"),
      () => {}
    );
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/index.css`,
      config.get("tailwindConfigCss"),
      () => {}
    );
    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/main.js`,
      config.get("tailwindConfigJs"),
      () => {}
    );
  },
});

threads.set("pinia", {
  name: "Installing Pinia",
  task: async () => {
    const { stdoutPinia } = await execa(
      "npm",
      ["install", "pinia", "--save-dev"],
      {
        cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
          "appName"
        )}`,
      }
    );

    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/main.js`,
      piniaConfig,
      () => {}
    );

    fsi.outputFile(
      `${process.cwd()}/${config.get("framework")}-${config.get(
        "appName"
      )}/src/store/use${capitalize(config.get("appName"))}.js`,
      piniaStoreConfig,
      () => {}
    );
  },
});

threads.set("headlessUiVue", {
  name: "Installing HeadlessUi for Vue",
  task: async () => {
    const { stdoutPinia } = await execa(
      "npm",
      ["install", "@headlessui/vue", "--save-dev"],
      {
        cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
          "appName"
        )}`,
      }
    );
  },
});

threads.set("headlessUiReact", {
  name: "Installing HeadlessUi for React",
  task: async () => {
    const { stdoutPinia } = await execa(
      "npm",
      ["install", "@headlessui/react", "--save-dev"],
      {
        cwd: `${process.cwd()}/${config.get("framework")}-${config.get(
          "appName"
        )}`,
      }
    );
  },
});

/**
 * React Tasks
 */

/**
 * Templates
 */

let piniaConfig = `import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";

createApp(App).use(createPinia).mount("#app");`;

let piniaStoreConfig = `import { defineStore } from 'pinia'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const use${capitalize(
  config.get("appName")
)}Store = defineStore('main', {
    state: () => {
        return {}
    },
    getters: {},
    actions: {},
})
`;

export default threads;
