<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="链接地址" prop="linkUrl">
        <el-input
            v-model="queryParams.linkUrl"
            placeholder="请输入链接地址"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入标题"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
              v-for="dict in related_link_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
            type="primary"
            plain
            icon="Plus"
            @click="handleAdd"
            v-hasPermi="['system:relatedLink:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="success"
            plain
            icon="Edit"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['system:relatedLink:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['system:relatedLink:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['system:relatedLink:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="relatedLinkList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="相关链接id" align="center" prop="id"/>
      <el-table-column label="链接地址" align="center" prop="linkUrl">
        <template #default="scope">
          <el-link :href="scope.row.linkUrl" target="_blank">
            <el-tooltip :content="scope.row.linkUrl" placement="top">
            <span style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis">
              {{ scope.row.linkUrl }}
            </span>
            </el-tooltip>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="图标" align="center" prop="icon" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.icon" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center" prop="title"/>
      <el-table-column label="排序" align="center" prop="sort" sortable/>
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="related_link_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['system:relatedLink:edit']">修改
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['system:relatedLink:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!-- 添加或修改相关链接管理对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="relatedLinkRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="链接地址" prop="linkUrl">
          <el-input v-model="form.linkUrl" placeholder="请输入链接地址"/>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <image-upload v-model="form.icon"/>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" placeholder="请输入排序" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
                v-for="dict in related_link_status"
                :key="dict.value"
                :label="parseInt(dict.value)"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="RelatedLink">
import {
  listRelatedLink,
  getRelatedLink,
  delRelatedLink,
  addRelatedLink,
  updateRelatedLink
} from "@/api/system/relatedLink";

const {proxy} = getCurrentInstance();
const {related_link_status} = proxy.useDict('related_link_status');

const relatedLinkList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    linkUrl: null,
    title: null,
    status: null,
  },
  rules: {
    linkUrl: [
      {required: true, message: "链接地址不能为空", trigger: "blur"}
    ],
    icon: [
      {required: true, message: "图标不能为空", trigger: "blur"}
    ],
    title: [
      {required: true, message: "标题不能为空", trigger: "blur"}
    ],
    status: [
      {required: true, message: "状态不能为空", trigger: "change"}
    ],
  }
});

const {queryParams, form, rules} = toRefs(data);

/** 查询相关链接管理列表 */
function getList() {
  loading.value = true;
  listRelatedLink(queryParams.value).then(response => {
    relatedLinkList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    linkUrl: null,
    icon: null,
    title: null,
    sort: null,
    status: null,
    remark: null
  };
  proxy.resetForm("relatedLinkRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加相关链接管理";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getRelatedLink(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改相关链接管理";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["relatedLinkRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateRelatedLink(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addRelatedLink(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除相关链接管理编号为"' + _ids + '"的数据项？').then(function () {
    return delRelatedLink(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/relatedLink/export', {
    ...queryParams.value
  }, `relatedLink_${new Date().getTime()}.xlsx`)
}

getList();
</script>
