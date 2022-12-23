<template>
	<div>
		<div class="container">
			<div class = "handle-select">
				<el-select v-model="query.college" placeholder="学院" class="handle-select-college">
				<el-option key="1" label="工学院" value="工学院"></el-option>
				<el-option key="2" label="文学院" value="文学院"></el-option>
				<el-option key="3" label="理学院" value="理学院"></el-option>
				<el-option key="4" label="商学院" value="商学院"></el-option>
				<el-option key="5" label="农学院" value="农学院"></el-option>
				<el-option key="6" label="医学院" value="医学院"></el-option>
				<el-option key="7" label="艺术学院" value="艺术学院"></el-option>
				<el-option key="8" label="社会学院" value="社会学院"></el-option>
			</el-select>
			<el-select v-model="query.department" placeholder="系" class="handle-select-department">
				<el-option key="1.1" label="计算机系" value="计算机系"></el-option>
				<el-option key="2.1" label="电子系" value="电子系"></el-option>
				<el-option key="3.1" label="机械系" value="电子系"></el-option>
			</el-select>				
			<el-input v-model="query.name" placeholder="姓名" class="handle-input-long"></el-input>
			<el-button type="subManage" :icon="Search" @click="handleSearch()">搜索</el-button>
			<el-button type="subManage" :icon="Plus">新增</el-button>
			</div>

			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column sortable prop="id" label="学号" width="80" align="center"></el-table-column>
				<el-table-column prop="name" label="姓名" align="center"></el-table-column>
				<el-table-column prop="gender" label="性别" width="60" align="center"></el-table-column>
				<el-table-column prop="college" label="学院" align="center"></el-table-column>
				<el-table-column prop="department" label="系" align="center"></el-table-column>
				<el-table-column prop="major" label="专业" align="center"></el-table-column>
				<el-table-column prop="birth" label="生日" align="center"></el-table-column>
				<el-table-column prop="status_s" label="学业情况" align="center">
					<template #default="student_data">
					<el-tag 
					:type="'info'">
						<template v-if="student_data.row.status_s===1">
							休学
						</template>
						<template v-else-if="student_data.row.status_s===2">
							在读
						</template>
						<template v-else-if="student_data.row.status_s===3">
							毕业
						</template>
						<template v-else-if="student_data.row.status_s===4">
							结业
						</template>
						<template v-else-if="student_data.row.status_s===5">
							肄业
						</template>
						<template v-else-if="student_data.row.status_s===6">
							辍学
						</template>
						<template v-else-if="student_data.row.status_s===7">
							开除
						</template>
						<template v-else-if="student_data.row.status_s===8">
							留校
						</template>
					</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status_l" label="位置" align="center">
					<template #default="student_data">
						<el-tag
						:type="student_data.row.status_l===1?'success':'danger'">
						<template v-if="student_data.row.status_l===1">
							在校
						</template>
						<template v-else>
							外出
						</template>
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column sortable prop="card_id" label="校卡号"></el-table-column>
				<el-table-column prop="mailbox" label="邮箱账号" width="150"></el-table-column>
				<el-table-column prop="dorm" label="宿舍"></el-table-column>
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
			<el-form label-width="100px">
				<el-form-item label="学号">
				<el-input v-model="form.id"></el-input>
			</el-form-item>
			<el-form-item label='姓名'>
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label='性别'>
				<el-input v-model="form.gender"></el-input>
			</el-form-item>
			<el-form-item label='学院'>
				<el-input v-model="form.college"></el-input>
			</el-form-item>
			<el-form-item label='系'>
				<el-input v-model="form.department"></el-input>
			</el-form-item>
			<el-form-item label='专业'>
				<el-input v-model="form.major"></el-input>
			</el-form-item>
			<el-form-item label='学业情况'>
				<el-input v-model="form.status_s"></el-input>
			</el-form-item>
			<el-form-item label='位置'>
				<el-input v-model="form.status_l"></el-input>
			</el-form-item>
			<el-form-item label='校卡号'>
				<el-input v-model="form.card_id"></el-input>
			</el-form-item>
			<el-form-item label='邮箱账号'>
				<el-input v-model="form.mailbox"></el-input>
			</el-form-item>
			<el-form-item label='宿舍'>
				<el-input v-model="form.dorm"></el-input>
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

<script setup lang="ts" name="table_stduent">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchStudent } from '../../../src/api/index';

interface TableItem {
	id: number;
	name: string;
	gender:string;
	college: string;
	department:string;
	major:string;
	status_s:number;
	status_l:number;
	birth:string;
	card_id:number;
	mailbox:string;
	dorm:string;
}

const query = reactive({
	college: '',
	department:'',
	name:'',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchStudent().then(res => {
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
	gender:'',
	college: '',
	department:'',
	major:'',
	birth:'',
	status_s:3,
	status_l:1,
	card_id:2342,
	mailbox:'',
	dorm:''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index
	form.id = row.id
	form.name = row.name
	form.gender = row.gender
	form.college= row.college
	form.department=row.department
	form.major=row.major
	form.birth = row.birth
	form.status_s = row.status_s
	form.status_l = row.status_l
	form.card_id = row.card_id
	form.mailbox = row.mailbox
	form.dorm = row.dorm
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].id = form.id
	tableData.value[idx].name = form.name
	tableData.value[idx].gender = form.gender
	tableData.value[idx].department = form.department
	tableData.value[idx].college = form.college
	tableData.value[idx].major = form.major
	tableData.value[idx].status_l = form.status_l
	tableData.value[idx].status_s = form.status_s
	tableData.value[idx].mailbox= form.mailbox
	tableData.value[idx].dorm = form.dorm
	tableData.value[idx].card_id = form.card_id
	tableData.value[idx].birth = form.birth
	};
</script>

<style scoped>
.handle-box {
	margin-bottom: 80px;
}

.handle-select-college {
	margin-right: 10px;
}
.handle-select-department {
	margin-right: 10px;
}
.handle-input-long{
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.blue{
	background-color:#5698c330;
	border-color:#5698c330;
}
.red{
	background-color: #e3b4b875;
	border-color:#e3b4b875;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>
