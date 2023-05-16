<style>
.Icon {
  fill: currentColor;
}
.Icon svg {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div v-html="svgContent" class="Icon"></div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watchEffect, h } from "vue";

const props = defineProps({ name: { required: true, type: String } });
const { name } = toRefs(props);

const svgContent = ref(null as string);

watchEffect(
  async () =>
    (svgContent.value = (
      await import(`./icons/${name?.value}-24px.svg?raw`)
    ).default)
);
</script>
