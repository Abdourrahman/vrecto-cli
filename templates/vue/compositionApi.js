import { getHeadlessCmps } from "./../../Helpers/helpers.js";

export const compositionApi = (headless) => {
  return `<template>
    <div>Hi I am your new component</div>
</template>
<script setup> 
import { defineProps, defineEmits, watch, watchEffect, ref } from 'vue';
${
  headless
    ? `import { ${getHeadlessCmps(headless)
        .toString()
        .split(",")
        .join(", ")} } from '@headlessui/vue';`
    : ``
}
const props = defineProps({})

const emit = defineEmits(['counter-update']);

</script>
`;
};
