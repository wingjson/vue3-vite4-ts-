<!--src/views/component/editor.vue-->
<template>
    <div class="app-container">
      <el-form ref="dataFormRef" :model="formData">
        <editor v-model="formData.content" style="height: 600px" />
      </el-form>
    </div>
  </template>

<script setup lang="ts">
import Editor from '@/components/WangEditor.vue';
import { ElForm } from 'element-plus';
import { reactive, ref, toRefs } from 'vue';
 
const dataFormRef = ref(ElForm);
 
const state = reactive({
  formData: {
    content: '初始内容'
  }
});
 
const { formData } = toRefs(state);
</script>
