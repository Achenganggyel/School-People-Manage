<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="query.name" placeholder="姓名" class="handle-input"></el-input>
				<el-button type="subManage" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="subManage" :icon="Plus">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
				<el-table-column prop="gender" label="性别" width="80" align="center"></el-table-column>
				<el-table-column sortable prop="entry" label="本次进入日期" width="150" align="center"></el-table-column>
				<el-table-column sortable prop="avoid_reg" label="免登记" width="100" align="center">
					<template #default="mobile_data">
						<el-tag
						:type="mobile_data.row.avoid_reg===1?'success':'danger'">
						<template v-if="mobile_data.row.avoid_reg===1">
							是
						</template>
						<template v-else>
							否
						</template>
					</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="位置状态" width="120" align="center">
					<template #default="mobile_data">
						<el-tag
						:type="mobile_data.row.status===1?'sucess':mobile_data.row.status===0?'warning':'info'"
						>
						<template v-if="mobile_data.row.status===1">
							仍在校
						</template>
						<template v-else-if="mobile_data.row.status===0">
							暂离开
						</template>
						<template v-else-if="mobile_data.row.status===-1">
							已离开
						</template>
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="history" label="历史信息" width="300" align="center"></el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
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
				<el-form-item label="姓名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="form.gender"></el-input>
				</el-form-item>
				<el-form-item label="本次进入日期">
					<el-input v-model="form.entry"></el-input>
				</el-form-item>
				<el-form-item label="位置状态">
					<el-input v-model="form.status"></el-input>
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

<script setup lang="ts" name="table_mobile">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchMobile } from '../../../src/api/index';
import { table } from 'console';

interface TableItem {
	name: string;
	gender: string;
	entry:string;
	avoid_reg:number;
	status: number;
	history: string;
}

const query = reactive({
	address: '',
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchMobile().then(res => {
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
	name: '',
	gender: '男',
	entry:'',
	status: -1
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.gender = row.gender
	form.entry = row.entry
	form.status = row.status
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
	tableData.value[idx].gender = form.gender;
	tableData.value[idx].entry = form.entry
	tableData.value[idx].status = form.status
};
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
	margin-left: 5%;
}

.handle-input {
	width: 300px;
	margin-left: 10px;
}
.table {
	width: 100%;
	font-size: 14px;
	margin-left: 5%;
	margin-right: 5%;
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
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
