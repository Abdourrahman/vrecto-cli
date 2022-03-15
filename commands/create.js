import { config } from "./../config.js";
import chalk from "chalk";
import fs from "fs";
import fsi from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * this command must accept the name of the component
 */

const createTemplate = (cmpName, options) => {
  const compositionApiTemplate = `<template>
<div>Hi I am your new component</div>
</template>
<script setup> 
import { defineProps, defineEmits, watch, watchEffect,ref } from 'vue';
${
  options.headless
    ? `import { ${getHeadlessCmps(options.headless)
        .toString()
        .split(",")
        .join(", ")} } from '@headlessui/vue';`
    : ``
}

const props = defineProps({})

const emit = defineEmits(['counter-update']);

</script>
`;
  const optionApiTemplate = `<template>
<div>Hi I am your new component</div>
</template>

<script>
export default {
    data : () => {
        return {
            // Properties for data, filtering, sorting and paging
        }
    },
    methods: {
        // Methods for data, filtering, sorting and paging
    },
    created: () => {
        // the state when the component created
    },
    mounted: () => {
        // the state when the component mounte
    },
    computed: {
        // Values for data, filtering, sorting and paging
    },
    watch: {
        // watching data
    }
}
</script>`;
  //let cmpDir = path.join(__dirname, "../src/components");
  let cmpDir = path.join(process.cwd(), "/src/components");
  console.log(process.cwd());
  let componentFile = cmpName.replace(/\./g, "/");
  console.log(componentFile);
  if (fsi.existsSync(`${cmpDir}/${componentFile}.vue`)) {
    console.log(
      chalk.red.bold(`component ${cmpName} is already exist please try again.`)
    );
  } else {
    if (options.composition) {
      fsi.outputFile(
        `${cmpDir}/${componentFile}.vue`,
        compositionApiTemplate,
        () => {}
      );
    } else if (options.option) {
      fsi.outputFile(
        `${cmpDir}/${componentFile}.vue`,
        optionApiTemplate,
        () => {}
      );
    }
    console.log(
      chalk.green.bold(`component ${cmpName} is created successfuly.`)
    );
  }
};

const getHeadlessCmps = (components) => {
  const list = [];
  if (components.length > 0) {
    config.get("headlessUi").forEach((el) => {
      if (components.includes(el.name)) list.push(el.components);
    });
  }
  return list;
};

export const createComponent = (cmp, options) => createTemplate(cmp, options);
