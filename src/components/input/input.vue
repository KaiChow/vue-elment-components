<template>
  <div :class="ns.b()">
    <div :class="ns.e('wrapper')">
      <input
        ref="input"
        :class="ns.e('inner')"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="ElInput">
import { computed, ref, nextTick, watch, onMounted } from "vue";

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

const _ref = computed(() => input.value);

const nativeInputValue = computed(() => props.modelValue);

const setNativeInputValue = () => {
  const input = _ref.value;
  if (!input || input.value === nativeInputValue.value) return;
  input.value = nativeInputValue.value;
};

watch(nativeInputValue, () => {
  setNativeInputValue();
});

onMounted(() => {
  setNativeInputValue();
});

const handleInput = async (event: Event) => {
  recordCursor();

  let { value } = event.target;

  if (props.formatter) {
    value = props.parser ? props.parser(value) : value;
    emits("input", props.formatter(value));
    emits("update:modelValue", props.formatter(value));
  }

  // hack for https://github.com/ElemeFE/element/issues/8548
  // should remove the following line when we don't support IE
  if (value === nativeInputValue.value) {
    setNativeInputValue();
    return;
  }

  // ensure native input value is controlled
  // see: https://github.com/ElemeFE/element/issues/12850
  await nextTick();
  setNativeInputValue();
  setCursor();
};
</script>

<style lang="less" scoped></style>
