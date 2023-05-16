<template>
  <ElInput
    v-model="inputValue"
    :placeholder="'请输入'"
    @input="input"
    :formatter="(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
    :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ElInput from "./components/input/input.vue";
const inputValue = ref<string | number>("测试");

const input = (v) => {
  console.log(v);
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
