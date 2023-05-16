<template>
  <form :formClasses="formClasses">
    <slot />
  </form>
</template>
<script setup lang="ts" name="ElForm">
import { computed } from "vue";
import { useNamespace } from "../../hooks/use-namespace";
type PropsType = {
  labelPosition?: "left" | "right" | "top";
  inline?: boolean;
};
const props = withDefaults(defineProps<PropsType>(), {
  labelPosition: "left",
  inline: false,
});
const emits = defineEmits(["submit"]);

const ns = useNamespace("form");

const formClasses = computed(() => {
  const { labelPosition, inline } = props;
  return [
    ns.b(),
    // todo: in v2.2.0, we can remove default
    // in fact, remove it doesn't affect the final style
    ns.m("default"),
    {
      [ns.m(`label-${labelPosition}`)]: labelPosition,
      [ns.m("inline")]: inline,
    },
  ];
});
</script>

<style lang="less" scoped></style>
