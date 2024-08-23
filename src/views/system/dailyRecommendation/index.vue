<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="标题" prop="title">
        <el-input
            v-model="queryParams.title"
            placeholder="请输入标题"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地址" prop="url">
        <el-input
            v-model="queryParams.url"
            placeholder="请输入地址"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px">
        <el-date-picker
            v-model="daterangeCreateTime"
            value-format="YYYY-MM-DD"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        ></el-date-picker>
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
            v-hasPermi="['system:dailyRecommendation:add']"
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
            v-hasPermi="['system:dailyRecommendation:edit']"
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
            v-hasPermi="['system:dailyRecommendation:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['system:dailyRecommendation:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dailyRecommendationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="今日推荐id" align="center" prop="id"/>
      <el-table-column label="今日推荐标题" align="center" prop="dailyTitle"/>
      <el-table-column label="今日推荐按钮文本" align="center" prop="btnText"/>
      <el-table-column label="标题" align="center" prop="title"/>
      <el-table-column label="封面" align="center" prop="cover" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.cover" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center" prop="description"/>
      <el-table-column label="地址" align="center" prop="url">
        <template #default="scope">
          <el-link :href="scope.row.url" target="_blank">
            <el-tooltip :content="scope.row.url" placement="top">
            <span style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis">
              {{ scope.row.url }}
            </span>
            </el-tooltip>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180" sortable>
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
                     v-hasPermi="['system:dailyRecommendation:edit']">修改
          </el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['system:dailyRecommendation:remove']">删除
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

    <!-- 添加或修改今日推荐管理 对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="dailyRecommendationRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="推荐标题" prop="dailyTitle">
          <el-input v-model="form.dailyTitle" placeholder="请输入今日推荐标题"/>
        </el-form-item>
        <el-form-item label="按钮文本" prop="btnText">
          <el-input v-model="form.btnText" placeholder="请输入今日推荐按钮文本"/>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <image-upload v-model="form.cover"/>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="地址" prop="url">
          <el-input v-model="form.url" placeholder="请输入地址"/>
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

<script setup name="DailyRecommendation">
import {
  listDailyRecommendation,
  getDailyRecommendation,
  delDailyRecommendation,
  addDailyRecommendation,
  updateDailyRecommendation
} from "@/api/system/dailyRecommendation";

const {proxy} = getCurrentInstance();

const dailyRecommendationList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const daterangeCreateTime = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    title: null,
    url: null,
    createTime: null
  },
  rules: {
    title: [
      {required: true, message: "标题不能为空", trigger: "blur"}
    ],
    description: [
      {required: true, message: "描述不能为空", trigger: "blur"}
    ],
    url: [
      {required: true, message: "地址不能为空", trigger: "blur"}
    ],
    createTime: [
      {required: true, message: "创建时间不能为空", trigger: "blur"}
    ]
  }
});

const {queryParams, form, rules} = toRefs(data);

/** 查询今日推荐管理 列表 */
function getList() {
  loading.value = true;
  queryParams.value.params = {};
  if (null != daterangeCreateTime && '' != daterangeCreateTime) {
    queryParams.value.params["beginCreateTime"] = daterangeCreateTime.value[0];
    queryParams.value.params["endCreateTime"] = daterangeCreateTime.value[1];
  }
  listDailyRecommendation(queryParams.value).then(response => {
    dailyRecommendationList.value = response.rows;
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
    dailyTitle: null,
    btnText: null,
    title: null,
    cover: null,
    description: null,
    url: null,
    createTime: null
  };
  proxy.resetForm("dailyRecommendationRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  daterangeCreateTime.value = [];
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
  title.value = "添加今日推荐管理 ";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getDailyRecommendation(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改今日推荐管理 ";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["dailyRecommendationRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateDailyRecommendation(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addDailyRecommendation(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除今日推荐管理 编号为"' + _ids + '"的数据项？').then(function () {
    return delDailyRecommendation(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/dailyRecommendation/export', {
    ...queryParams.value
  }, `dailyRecommendation_${new Date().getTime()}.xlsx`)
}

getList();
</script>