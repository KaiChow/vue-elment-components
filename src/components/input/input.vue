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
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="ElInput">
import { computed, ref, nextTick, watch, onMounted } from "vue";

import { useNamespace } from "../../hooks/use-namespace";
import { useCursor } from "../../hooks/use-cursor";
type TargetElement = HTMLInputElement | HTMLTextAreaElement;
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
const emits = defineEmits([
  "input",
  "update:modelValue",
  "change",
  "blur",
  "focus",
]);

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
  let { value } = event.target as any;
  if (props.formatter) {
    value = props.parser ? props.parser(value) : value;
    emits("input", props.formatter(value));
    emits("update:modelValue", props.formatter(value));
  }
  if (value === nativeInputValue.value) {
    setNativeInputValue();
    return;
  }
  await nextTick();
  setNativeInputValue();
  setCursor();
};

const handleChange = (event: Event) => {
  emits("change", (event.target as TargetElement).value);
};
const focused = ref(false);

const focus = async () => {
  // see: https://github.com/ElemeFE/element/issues/18573
  await nextTick();
  _ref.value?.focus();
};

const blur = () => _ref.value?.blur();

const handleFocus = (event: FocusEvent) => {
  focused.value = true;
  emits("focus", event);
};

const handleBlur = (event: FocusEvent) => {
  focused.value = false;
  emits("blur", event);
};
</script>

<style lang="less" scoped></style>
