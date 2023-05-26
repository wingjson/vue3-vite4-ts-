<template>
    <div>

        <vxe-table border="inner" ref="xTreeRef" :column-config="{ resizable: true }"
            :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }" :data="tableData" show-footer
            :footer-method="footerMethod" @toggle-tree-expand="toggleExpandChangeEvent">
            <vxe-column field="size" title="Size" tree-node>
                <template #footer>
                    全选
                </template>
            </vxe-column>
            <vxe-column field="name" title="app.body.label.name">
                <template #header>
                    管理
                </template>
                <template #default="{ row }">
                    <vxe-checkbox v-model="row.checked"
                        @change="checked => handleCheckManage(checked.checked, row)"></vxe-checkbox>
                </template>
                <template #footer>
                    <vxe-checkbox :indeterminate="isIndeterminate" v-model="checkAllManage"
                        @change="handleCheckAllManage"></vxe-checkbox>
                </template>
            </vxe-column>
            <vxe-column field="type" title="Type">
                <template #header>
                    审核
                </template>
                <template #default="{ row }">
                    <vxe-checkbox v-model="row.checked"
                        @change="checked => handleCheckManage(checked.checked, row)"></vxe-checkbox>
                </template>
                <template #footer>
                    <vxe-checkbox :indeterminate="isIndeterminate" v-model="checkAllManage"
                        @change="handleCheckAllManage"></vxe-checkbox>
                </template>
            </vxe-column>
            <vxe-column field="date" title="app.body.label.name">
                <template #header>
                    提交
                </template>
                <template #default="{ row }">
                    <vxe-checkbox v-model="row.checked"
                        @change="checked => handleCheckManage(checked.checked, row)"></vxe-checkbox>
                </template>
                <template #footer>
                    <vxe-checkbox :indeterminate="isIndeterminate" v-model="checkAllManage"
                        @change="handleCheckAllManage"></vxe-checkbox>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { VxeTableInstance, VxeTablePropTypes } from 'vxe-table'
import { getDynamicTopData } from "@/api/tree"
interface RowVO {
    id: number
    parentId: number | null
    name: string
    type: string
    size: number
    date: string
    checked: boolean
}

const xTreeRef = ref<VxeTableInstance>()

// 示例数据，真实数据需要调接口
const tableData = ref<RowVO[]>([
    { id: 10000, parentId: null, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01', checked: false },
    { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01', checked: false },
    { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01', checked: false },
    { id: 20045, parentId: 24300, name: 'Test4', type: 'html', size: 600, date: '2021-04-01', checked: false },
    { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', size: 0, date: '2021-04-01', checked: false },
    { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', size: 25, date: '2021-10-01', checked: false },
    { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', size: 512, date: '2020-01-01', checked: false },
    { id: 22200, parentId: 10053, name: 'Test8', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', size: 2048, date: '2020-11-01', checked: false },
    { id: 23677, parentId: 23666, name: 'Test10', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 23671, parentId: 23677, name: 'Test11', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 23672, parentId: 23677, name: 'Test12', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 23688, parentId: 23666, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 23681, parentId: 23688, name: 'Test14', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 23682, parentId: 23688, name: 'Test15', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 24555, parentId: null, name: 'Test16', type: 'avi', size: 224, date: '2020-10-01', checked: false },
    { id: 24566, parentId: 24555, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01', checked: false },
    { id: 24577, parentId: 24555, name: 'Test18', type: 'js', size: 1024, date: '2021-06-01', checked: false }
])

// 节点展开事件
const toggleExpandChangeEvent = (params: any) => {
    const $table = xTreeRef.value
    if ($table) {
        const { row, expanded } = params
        console.log('节点展开事件', expanded, '获取父节点：', $table.getParentRow(row))
    }
}

const isIndeterminate = ref(true)
const checkAllManage = ref(false)

/**
 * @description: 全选
 * @Author: www
 * @return {*}
 */
const handleCheckAllManage = (v: any) => {
    console.log(v)
    isIndeterminate.value = false
    tableData.value.forEach((item) => {
        item.checked = v.checked
    })
}

/**
 * @description: 处理checkbox点击
 * @Author: www
 * @return {*}
 */
const handleCheckManage = (v: boolean, row: any) => {
    let totalCount = tableData.value.length
    let someStatusCount = 0
    tableData.value.forEach((item, index) => {
        if (item.checked === true) {
            someStatusCount++
        }
        if (item.parentId == row.id) {
            tableData.value[index].checked = v
            handleCheckManage(v, tableData.value[index])
        }
    })
    updateParentCheckedStatus(row.id)
    checkAllManage.value = totalCount === someStatusCount ? true : false
    isIndeterminate.value = someStatusCount > 0 && someStatusCount < totalCount
}

/**
 * @description: 递归处理父目录选中与取消
 * @param {*} id
 * @Author: www
 * @return {*}
 */
const updateParentCheckedStatus = (id: number | null) => {
    const index = tableData.value.findIndex(item => item.id === id);
    if (index === -1) return;
    const parent = tableData.value[index];
    // 获取是否有子节点,没有直接跳过
    const children = tableData.value.filter(item => item.parentId === id);
    if (children.length > 1) {
        // 获取子节点是否全部选中
        const allChildrenChecked = children.every(child => child.checked);
        parent.checked = allChildrenChecked;
    }
    updateParentCheckedStatus(parent.parentId);
}

/**
 * @description: 自定义表格尾部函数
 * @param {*} columns
 * @param {*} data
 * @Author: www
 * @return {*}
 */
const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
    return [
        columns.map(column => {
            return null
        })
    ]
}

onMounted(() => {
    getDynamicTopData().then((res) => {
        console.log(res)
    })
})
// const getTreeExpansionEvent = () => {
//   const $table = xTreeRef.value
//   if ($table) {
//     const treeExpandRecords = $table.getTreeExpandRecords()
//     VXETable.modal.alert(treeExpandRecords.length)
//   }
// }

// const expandAllEvent = () => {
//   const $table = xTreeRef.value
//   if ($table) {
//     $table.setAllTreeExpand(true)
//   }
// }

// const claseExpandEvent = () => {
//   const $table = xTreeRef.value
//   if ($table) {
//     $table.clearTreeExpand()
//   }
// }

</script>
