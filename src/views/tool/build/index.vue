<template>
  <div> 表单构建
    <svg-icon icon-class="build"/>
  </div>
</template>
<script setup>
const {proxy} = getCurrentInstance();

proxy.$modal.notify("表单构建功能未完成");
</script>