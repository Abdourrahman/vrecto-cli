const url = new URL(import.meta.url);

export const compositionApiTemplate = `<template>
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
