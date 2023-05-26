<template>
    <div class="app-container">
        <TEditor ref="editor" v-model="formState.contents" @getContent="getContent" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
// 引入
import TEditor from '@/components/TEditor.vue';
const formState = reactive({ contents: '' })
const getContent = (v: string) => {
    formState.contents = v
}
</script>

