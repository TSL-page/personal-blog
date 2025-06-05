<script setup>
import { ref, watch } from 'vue'
import { getCategoriesAll } from '@/api/category.js'

const props = defineProps({
  modelValue: [Number, String],
  width: String
})
const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const proxyValue = ref(props.modelValue)

// 监听父组件传来的值，保持同步
watch(() => props.modelValue, val => {
  proxyValue.value = val
})
// 监听本地值变化，通知父组件
watch(proxyValue, val => {
  emit('update:modelValue', val)
})

const getChannelList = async () => {
  const res = await getCategoriesAll()
  channelList.value = res.data.data
}
getChannelList()
</script>

<template>
  <el-select v-model="proxyValue" :style="{ width }">
    <el-option v-for="item in channelList" :key="item.id" :label="item.categoryId" :value="item.categoryId" />
  </el-select>
</template>