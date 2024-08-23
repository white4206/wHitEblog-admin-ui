<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="ip" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入ip"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="归属地" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入归属地"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="访问时间" style="width: 308px">
        <el-date-picker
          v-model="daterangeAccessTime"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="访问设备" prop="accessOs">
        <el-select v-model="queryParams.accessOs" placeholder="请选择访问设备" clearable>
          <el-option
            v-for="dict in access_os"
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
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="Plus"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['system:ipAddress:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          plain-->
<!--          icon="Edit"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['system:ipAddress:edit']"-->
<!--        >修改</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:ipAddress:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['system:ipAddress:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="ipAddressList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ip id" align="center" prop="id" />
      <el-table-column label="ip" align="center" prop="ip" />
      <el-table-column label="归属地" align="center" prop="address" />
      <el-table-column label="访问时间" align="center" prop="accessTime" width="180">
        <template #default="scope">
          <span>{{ scope.row.accessTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问设备" align="center" prop="accessOs">
        <template #default="scope">
          <dict-tag :options="access_os" :value="scope.row.accessOs"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
<!--          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:ipAddress:edit']">修改</el-button>-->
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:ipAddress:remove']">删除</el-button>
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

    <!-- 添加或修改IP地址 对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="ipAddressRef" :model="form" :rules="rules" label-width="80px">
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

<script setup name="IpAddress">
import { listIpAddress, getIpAddress, delIpAddress, addIpAddress, updateIpAddress } from "@/api/system/ipAddress";

const { proxy } = getCurrentInstance();
const { access_os } = proxy.useDict('access_os');

const ipAddressList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const daterangeAccessTime = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    ip: null,
    address: null,
    accessTime: null,
    accessOs: null
  },
  rules: {
    ip: [
      { required: true, message: "ip不能为空", trigger: "blur" }
    ],
    address: [
      { required: true, message: "归属地不能为空", trigger: "blur" }
    ],
    accessTime: [
      { required: true, message: "访问时间不能为空", trigger: "blur" }
    ],
    accessOs: [
      { required: true, message: "访问设备不能为空", trigger: "change" }
    ]
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询IP地址 列表 */
function getList() {
  loading.value = true;
  queryParams.value.params = {};
  if (null != daterangeAccessTime && '' != daterangeAccessTime) {
    queryParams.value.params["beginAccessTime"] = daterangeAccessTime.value[0];
    queryParams.value.params["endAccessTime"] = daterangeAccessTime.value[1];
  }
  listIpAddress(queryParams.value).then(response => {
    ipAddressList.value = response.rows;
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
    ip: null,
    address: null,
    accessTime: null,
    accessOs: null
  };
  proxy.resetForm("ipAddressRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  daterangeAccessTime.value = [];
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
  title.value = "添加IP地址 ";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getIpAddress(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改IP地址 ";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["ipAddressRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateIpAddress(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addIpAddress(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除IP地址 编号为"' + _ids + '"的数据项？').then(function() {
    return delIpAddress(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/ipAddress/export', {
    ...queryParams.value
  }, `ipAddress_${new Date().getTime()}.xlsx`)
}

getList();
</script>
