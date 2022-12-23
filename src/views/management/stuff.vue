<template>
	<div>
		<div class="container">
			<div class="handle-box">
			<el-select v-model="query.department" placeholder="部门" class="handle-select">
				<el-option key="1.1" label="后勤部" value="后勤部"></el-option>
				<el-option key="2.1" label="行政部" value="行政部"></el-option>
				<el-option key="3.1" label="联络处" value="联络处"></el-option>
				<el-option key="4.1" label="学生处" value="处"></el-option>
			</el-select>				
			<el-input v-model="query.name" placeholder="姓名" class="handle-input"></el-input>
			<el-button type="subManage" :icon="Search" @click="handleSearch()">搜索</el-button>
			<el-button type="subManage" :icon="Plus">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column sortable prop="id" label="工号" width="80" align="center"></el-table-column>
				<el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
				<el-table-column prop="gender" label="性别" width="80" align="center"></el-table-column>
				<el-table-column prop="department" label="部门" width="150" align="center"></el-table-column>
				<el-table-column prop="post" label="职位" width="150" align="center"></el-table-column>
				<el-table-column prop="status" label="工作状态" width="150" align="center">
					<template #default="stuff_data">
						<el-tag 
						:type="stuff_data.row.status<0?'danger':
						stuff_data.row.status>0?'info':'success'">
						<template v-if="stuff_data.row.status==-1">
							未到
						</template>
						<template v-else-if="stuff_data.row.status==0">
							在岗
						</template>
						<template v-else-if="stuff_data.row.status==1">
							出差
						</template>
						<template v-else-if="stuff_data.row.status==2">
							请假
						</template>
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column sortable prop="reg_time" label="注册时间" width="100"></el-table-column>
				<el-table-column sortable prop="birth" label="出生日期"  width="100"></el-table-column>
				<el-table-column sortable prop="thism_attendance" label="出勤率" width="100" align="center">
					<template #default="teacher_data">
						{{teacher_data.row.thism_attendance}} %
					</template>
				</el-table-column>
				<el-table-column prop="mailbox" label="邮箱账号"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" class="blue" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="工号">
					<el-input v-model="form.id"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="form.gender"></el-input>
				</el-form-item>
				<el-form-item label="部门">
					<el-input v-model="form.department"></el-input>
				</el-form-item>
				<el-form-item label="职位">
					<el-input v-model="form.post"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-input v-model="form.status"></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-input v-model="form.reg_time"></el-input>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-input v-model="form.birth"></el-input>
				</el-form-item>
				<el-form-item label="出勤率">
					<el-input v-model="form.thism_attendance"></el-input>
				</el-form-item>
				<el-form-item label="邮箱账号">
					<el-input v-model="form.mailbox"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="table_stuff">
import { ref, reactive } from 'vue'; 
import { ElMessage, ElMessageBox } from 'element-plus'; 
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchStuff } from '../../../src/api/index';

interface TableItem {
	id: number;
	name: string;
	gender: string;
	department:string;
	post:string;
	reg_time:string;
	birth:string;
	status: number;
	thism_attendance:number;
	mailbox:string;
}

const query = reactive({
	department: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchStuff().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal || 50;
	});
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	id: 0, 
	name: '',
	gender: '',
	department:'',
	post:'',
	reg_time:'',
	birth:'',
	status: 0,
	thism_attendance:100,
	mailbox:''
});

let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index
	form.id = row.id
	form.name = row.name
	form.gender = row.gender
	form.department = row.department
	form.post = row.post
	form.reg_time = row.reg_time
	form.birth = row.birth
	form.status = row.status
	form.thism_attendance = row.thism_attendance
	form.mailbox = row.mailbox
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].id = form.id
	tableData.value[idx].name = form.name
	tableData.value[idx].gender = form.gender
	tableData.value[idx].department = form.department
	tableData.value[idx].post = form.post
	tableData.value[idx].reg_time = form.reg_time
	tableData.value[idx].birth = form.birth
	tableData.value[idx].status = form.status
	tableData.value[idx].thism_attendance = form.thism_attendance
	tableData.value[idx].mailbox = form.mailbox
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
	margin-left: 10px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.el-button--subManage{
	background-color: #fa7e2316;
	border-color: #fa7e2316;
	color: #ff0000;
	margin-left: 15px;
}	
.el-button--subManage:hover{
	background-color: #fba414;
	border-color: #fba414;
	color:#fff;
}	

.blue{
	background-color:#5698c330;
	border-color:#5698c330;
}
.red{
	background-color: #e3b4b875;
	border-color:#e3b4b875;
}
</style>
