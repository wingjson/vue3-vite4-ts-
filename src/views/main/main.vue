<template>
    <el-row class="mb-4">
        <el-button round @click="gotoAbout">点击跳转wangeidtor</el-button>
        <el-button round @click="gotiny">点击跳转tinyeditor</el-button>
        <el-button round @click="gotree">点击跳转表格树</el-button>
        <el-button round @click="changeLang('en')">English</el-button>
        <el-button round @click="changeLang('zh')">中文</el-button>
    </el-row>
    <el-button type="primary" @click="toggle()" :icon="isDark ? Moon : Sunny" />
    <el-row>
        {{ $t("home.title") }}
    </el-row>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from '@element-plus/icons-vue'
import router from "@/router";
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue';

// 路由示例
const gotoAbout = () => {
    router.push('./wangeditor');
}

const gotiny = () => {
    router.push('./teditor');
}

const gotree = () => {
    router.push('./tree');
}
// 暗黑模式示例
const isDark = useDark()
const toggle = useToggle(isDark)
console.log(isDark)

// 国际化
const { locale, t } = useI18n()
const changeLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
}
//如果使用ref设置的文字不更新，使用computed
const list = computed(() => [
    t('c100018'),
    t('c100019'),
    t('c100020'),
    t('c100021'),
    t('c100020'),
])

</script>
<style scoped lang="scss"></style>
