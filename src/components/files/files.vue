<!-- 
  文件管理组件
  功能：
  1. 显示文件列表
  2. 支持文件的批量选择、删除和分组管理
  3. 支持分页显示
-->
<template>
  <!-- 顶部工具栏：显示选择和批量操作按钮 -->
  <div class="files">
    <div class="files__tool" v-show="selectedFilesId.length > 0">
      <yk-space>
        <yk-checkbox :checked="checkedAll" :indeterminate="indeterminate" @change="handleChangeAll">
          全选
        </yk-checkbox>
        <yk-text>已选择 {{ selectedFilesId.length }} 个内容</yk-text>
        <yk-text type="primary" style="cursor: pointer" @click="removeAll">取消选择</yk-text>
      </yk-space>
      <yk-space>
        <IconDeleteOutline class="files__tool-delete" @click="deleteFiles" />
        <yk-popconfirm
          title="选择分组"
          tigger="click"
          placement="bottomRight"
          @cancel="cancel"
          @confirm="confirm"
        >
          <IconSwitchOutline class="files__tool-switch" />
          <template #content>
            <yk-scrollbar ref="scrollbar" height="148px" class="subset">
              <div
                v-for="item in subsetStore.data"
                class="subset__item"
                :class="{ 'subset-elected': subsetSelectedId == item.id }"
                @click="changeOption(item.id)"
              >
                {{ item.name }}{{ item.value }}
              </div>
            </yk-scrollbar>
          </template>
        </yk-popconfirm>
      </yk-space>
    </div>
    <!-- 文件列表主体区域 -->
    <div class="files__main">
      <filesItem
        v-for="item in files"
        :data="item"
        :key="item.id"
        @selected="selectFile"
        @delete="deleteFile"
        @changeSubsetId="changeSubset"
      />
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <yk-pagination :total="count" size="xl" @change="chagePage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, getCurrentInstance } from 'vue'
  import { mkfile } from '@/mock/data'
  import filesItem from './files-item.vue'
  import { useSubsetStore } from '../../store/subset'
  import './files.less'

  // 使用分组状态管理
  const subsetStore = useSubsetStore()

  // 组件属性定义
  type FileProps = {
    pageSize: number // 每页显示数量
    subsetId: number | string // 分组ID
  }

  const props = withDefaults(defineProps<FileProps>(), {
    pageSize: 8,
    subsetId: -1, // -1表示显示全部文件
  })

  // =============== 文件选择相关 ===============
  const indeterminate = ref(false) // 是否为半选状态
  const checkedAll = ref(false) // 是否全选
  const selectedFilesId = ref<number[]>([]) // 已选择的文件ID列表

  /**
   * 处理全选/取消全选操作
   * @param value 是否全选
   */
  const handleChangeAll = (value: boolean) => {
    indeterminate.value = false
    //先情况选择Id
    selectedFilesId.value = []
    if (value) {
      checkedAll.value = true
      for (let i = 0; i < files.value.length; i++) {
        files.value[i].selected = true
        selectedFilesId.value.push(files.value[i].id)
      }
    } else {
      checkedAll.value = false
      for (let i = 0; i < files.value.length; i++) {
        files.value[i].selected = false
      }
    }
  }

  /**
   * 取消所有选择
   */
  const removeAll = () => {
    selectedFilesId.value = []
    for (let i = 0; i < files.value.length; i++) {
      files.value[i].selected = false
    }
  }

  /**
   * 单个文件选择处理
   * @param e 文件ID
   */
  const selectFile = (e: number) => {
    for (let i = 0; i < files.value.length; i++) {
      if (files.value[i].id === e) {
        files.value[i].selected = !files.value[i].selected
        if (files.value[i].selected) {
          selectedFilesId.value.push(e)
        } else {
          //从数组移除对应项
          selectedFilesId.value = selectedFilesId.value.filter(item => {
            return item != e
          })
        }
        //半选与全选
        if (selectedFilesId.value.length == 0) {
          indeterminate.value = false
          checkedAll.value = false
        } else if (selectedFilesId.value.length == files.value.length) {
          indeterminate.value = false
          checkedAll.value = true
        } else {
          indeterminate.value = true
          checkedAll.value = false
        }
      }
    }
  }

  // =============== 文件操作相关 ===============
  /**
   * 删除单个文件
   * @param e 要删除的文件ID
   */
  const deleteFile = (e: number) => {
    files.value = files.value.filter((item: any) => {
      return item.id != e
    })
  }

  /**
   * 批量删除选中的文件
   * 遍历选中文件ID数组，从files中过滤掉这些文件
   */
  const deleteFiles = () => {
    if (selectedFilesId.value.length > 0) {
      for (let i = 0; i < selectedFilesId.value.length; i++) {
        files.value = files.value.filter((item: any) => {
          return item.id !== selectedFilesId.value[i]
        })
      }
      //清除选择的id
      selectedFilesId.value = []
    }
  }

  /**
   * 切换单个文件的分组
   */
  const changeSubset = (e: number) => {
    console.log(e)
  }

  // =============== 数据和分页相关 ===============
  const count = ref<number>(123) // 文件总数
  const files = ref() // 文件列表数据

  // 请求参数类型定义
  type Requset = {
    token?: string
    pageSize: number // 每页条数
    nowPage: number // 当前页码
  }

  const request: Requset = {
    pageSize: props.pageSize,
    nowPage: 1,
  }

  /**
   * 获取并处理文件数据
   * @param e 是否需要更新总数
   */
  const drwData = (e: boolean) => {
    let data = mkfile.data
    if (e) {
      count.value = data.count
    }
    files.value = data.list.slice(
      (request.nowPage - 1) * request.pageSize,
      request.nowPage * request.pageSize
    )
    //加入选择项
    for (let i = 0; i < files.value.length; i++) {
      files.value[i].selected = false
    }
    // console.log(files.value)
  }

  /**
   * 处理分页变化
   * @param e 新的页码
   */
  const chagePage = (e: number) => {
    request.nowPage = e
    drwData(false)
  }

  // =============== 分组操作相关 ===============
  const subsetSelectedId = ref<number | string>() // 当前选中的分组ID

  /**
   * 切换文件分组
   * @param e 分组ID
   */
  const changeOption = (e: number | string) => {
    subsetSelectedId.value = e
  }

  // =============== 消息提示相关 ===============
  const proxy: any = getCurrentInstance()?.proxy

  /**
   * 取消操作的回调
   */
  function cancel() {
    proxy.$message({ type: 'warning', message: '你点击了取消按钮' })
  }

  /**
   * 确认操作的回调
   */
  function confirm() {
    proxy.$message({ type: 'primary', message: '你点击了确认按钮' })
  }

  // 组件挂载时加载数据
  onMounted(() => {
    drwData(true)
  })
</script>

<style lang="less" scoped>
  .files {
    background: @bg-color-l;
    border-radius: @radius-m;
    background: @bg-color-l;
    width: 100%;
    &__tool {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: @space-l;
      border-radius: @radius-s;
      background: @bg-color-m;
      &-delete,
      &-switch {
        width: 20px;
        height: 20px;
        color: @font-color-s;
        cursor: pointer;
        &:hover {
          color: @font-color-l;
        }
      }
    }
    &__main {
      padding: 24px 0 32px;
      display: grid;
      grid-template-columns: repeat(auto-fill, 200px);
      row-gap: 32px;
      column-gap: 24px;
      justify-content: center;
    }
  }
  .pagination {
    padding: @space-l @space-xl;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid @line-color-s;
    bottom: 0;
    width: 100%;
    left: 0;
    background-color: #fff;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  }
</style>
