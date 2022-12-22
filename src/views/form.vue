<template>
	<div class="container">
		<div class="form-box">
			<el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
				<el-form-item label="通知名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="发送单位" prop="region">
					<el-select v-model="form.region" placeholder="请选择">
						<el-option key="jwb" label="教务部" value="jwb"></el-option>
						<el-option key="xsc" label="学生处" value="xsc"></el-option>
						<el-option key="wlzx" label="网络中心" value="wlzx"></el-option>
						<el-option key="xwb" label="校务办" value="xwb"></el-option>
						<el-option key="glc" label="管理处" value="glc"></el-option>
						<el-option key="sdzx" label="水电中心" value="sdzx"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发布日期">
					<el-col :span="11">
						<el-form-item prop="date">
							<el-date-picker
								type="date"
								placeholder="选择日期"
								v-model="form.date"
								style="width: 100%"
							></el-date-picker>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="接收单位" prop="type">
					<el-checkbox-group v-model="form.type">
						<el-checkbox label="教务部" name="upload"></el-checkbox>
						<el-checkbox label="学生处" name="upload"></el-checkbox>
						<el-checkbox label="网络中心" name="upload"></el-checkbox>
						<el-checkbox label="校务办" name="upload"></el-checkbox>
						<el-checkbox label="管理处" name="upload"></el-checkbox>
						<el-checkbox label="水电中心" name="sdzx"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="优先级" prop="priority">
					<el-radio-group v-model="form.priority">
						<el-radio label="低"></el-radio>
						<el-radio label="中"></el-radio>
						<el-radio label="高"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="通知详情" prop="desc">
					<el-input type="textarea" rows="5" v-model="form.desc"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit(formRef)">表单提交</el-button>
					<el-button @click="onReset(formRef)">重置表单</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup lang="ts" name="baseform">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';


const rules: FormRules = {
	name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }]
};
const formRef = ref<FormInstance>();
const form = reactive({
	name: '',
	region: '',
	date:'',
	type: '',
	priority: '中',
	desc: '',
	options: []
});
// 提交
const onSubmit = (formEl: FormInstance | undefined) => {
	// 表单校验
	if (!formEl) return;
	formEl.validate(valid => {
		if (valid) {
			console.log(form);
			ElMessage.success('提交成功！');
		} else {
			return false;
		}
	});
};
// 重置
const onReset = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};
</script>

<style>
.el-checkbox__inner:hover {
  background-color:  rgb(235, 178, 72) !important;
  border-color: rgb(235, 178, 72) !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner {
  background-color:  rgb(235, 178, 72) !important;
  border-color: rgb(235, 178, 72) !important;
}
.el-checkbox {
  color: #111;
  margin-right: 30px;
  font-size: 16px;
  margin-bottom: -1px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: rgb(235, 178, 72) !important;
}
.el-radio__input.is-checked .el-radio__inner{
  background-color: rgb(235, 178, 72) !important;
  border-color: rgb(235, 178, 72) !important;
}

</style>