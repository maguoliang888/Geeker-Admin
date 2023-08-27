<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}用户`">
    <el-form
      ref="ruleFormRef"
      label-width="110px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="头像">
        <UploadImg v-model:image-url="drawerProps.row!.avatar" border-radius="50%" :file-size="3">
          <template #empty>
            <span>请上传头像</span>
          </template>
          <template #tip> 头像大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="drawerProps.row!.username" placeholder="请填写用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="drawerProps.row!.nickname" placeholder="请填写昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-select v-model="drawerProps.row!.enabled" placeholder="请选择状态" clearable>
          <el-option v-for="item in userEnabled" :key="item.key" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="上次登录时间">
        <el-date-picker v-model="drawerProps.row!.lastLoginTime" type="datetime" disabled clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="drawerProps.row!.createTime"
          type="datetime"
          placeholder="请选择创建时间"
          disabled
          clearable
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false"> 取消 </el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit"> 确定 </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { userEnabled } from "@/utils/serviceDict";
import { ElMessage, FormInstance } from "element-plus";
import { User } from "@/api/interface";
import UploadImg from "@/components/Upload/Img.vue";
import { checkUsernameIsExists } from "@/api/modules/accountManage";

// 检查用户名是否存在
const checkUsername = async (rule: any, value: any, callback: any) => {
  if (!drawerProps.value.row.username) {
    callback(new Error("请填写用户名"));
  }
  const params = { id: drawerProps.value.row.id, username: drawerProps.value.row.username };
  const { data } = await checkUsernameIsExists(params);
  if (data) {
    callback(new Error("用户名已存在"));
  }
  callback();
};

const rules = reactive({
  username: [
    {
      required: true,
      validator: checkUsername,
      trigger: "blur"
    }
  ],
  nickname: [{ required: true, message: "请填写昵称" }],
  enabled: [{ required: true, message: "请选择状态" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<User.ResUserList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
