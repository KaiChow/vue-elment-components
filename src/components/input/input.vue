<template>
  <div :class="ns.b()">
    <div :class="ns.e('wrapper')">
      <input
        ref="input"
        :class="ns.e('inner')"
        :type="type"
        v-model="nativeValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="ElInput">
import { computed, ref, nextTick } from "vue";

import { useNamespace } from "../../hooks/use-namespace";
import { useCursor } from "../../hooks/use-cursor";
type PropsType = {
  modelValue: string | number;
  placeholder: string;
  disabled?: boolean;
  formatter?: Function;
  parser?: Function;
  type?: "text" | "password";
};
const props = withDefaults(defineProps<PropsType>(), {
  placeholder: "",
  disabled: false,
  type: "text",
});
const emits = defineEmits(["input", "update:modelValue"]);

const ns = useNamespace("input");
const input = ref();
const [recordCursor, setCursor] = useCursor(input);

const onInput = async (v) => {
  recordCursor();
  console.log(1);
  emits("input", v.target.value);
  await nextTick();
  setCursor();
};

const nativeValue = computed({
  get: () => {
    console.log("get");
    if (props.formatter && props.parser) {
      return props.formatter(props.modelValue);
    }
    return props.modelValue;
  },
  set: (v) => {
    console.log("set");
    if (props.formatter && props.parser) {
      emits("update:modelValue", props.parser(v));
      return;
    }
    emits("update:modelValue", v);
  },
});
</script>

<style lang="less" scoped></style>
