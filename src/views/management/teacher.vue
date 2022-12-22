<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.college" placeholder="学院" class="handle-select mr10">
					<el-option key="1" label="工学院" value="工学院"></el-option>
					<el-option key="2" label="文学院" value="文学院"></el-option>
					<el-option key="3" label="理学院" value="理学院"></el-option>
					<el-option key="4" label="商学院" value="商学院"></el-option>
					<el-option key="5" label="农学院" value="农学院"></el-option>
					<el-option key="6" label="医学院" value="医学院"></el-option>
					<el-option key="7" label="艺术学院" value="艺术学院"></el-option>
					<el-option key="8" label="社会学院" value="社会学院"></el-option>
				</el-select>
				<el-select v-model="query.department" placeholder="系" class="handle-select mr10">
					<el-option key="1.1" label="计算机系" value="计算机系"></el-option>
					<el-option key="2.1" label="电子系" value="电子系"></el-option>
					<el-option key="3.1" label="机械系" value="电子系"></el-option>
				</el-select>				
				<el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="subManage" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="subManage" :icon="Plus">新增</el-button>
			</div>
			<template>
				<div class="boxShadow">
				<div >
				<el-table
				:data="tableData"
				ref="multipleTable"
				tooltip-effect="dark"
				>
				<el-table-column type="selection" width="45px"></el-table-column>
				<el-table-column label="序号" width="62px" type="index">
				</el-table-column>
				<template v-for='(col) in TeacherCol.cols'>
				<el-table-column
				sortable
				:show-overflow-tooltip="true"
				:prop="col.prop"
				:label="col.label"
				width="124px">
				</el-table-column>
				</template>
				<el-table-column label="操作" width="80" align="center">
				<template slot-scope="scope">
				<el-button size="mini" class="del-com" @click="handleDelete" ><i class="iconfont icon-shanchu"></i></el-button>
				</template>
				</el-table-column>
				</el-table>	
				</div>
				</div>
			</template>	
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
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
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

<script setup lang="ts" name="table_teacher">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchTeacher} from '../../../src/api/index';
import { TeacherCol } from '../config/TeacherCol';

interface TableItem {
	id: number;
	name: string;
	gender:string;
	college: string;
	department: string;
	post:string;
	status: string;
	reg_time: string;
	birth:string;
	thism_attendance:number;
	lecture:string;
}

const query = reactive({
	gender: '',
	status: '',
	college: '',
	department:'',
	name: '',
	pageIndex: 1,
	pageSize: 10
});

const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchTeacher().then(res => {
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
	address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.address = row.address;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
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
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #ff0000;
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
.el-button--subManage{
	background-color: #fa7e23;
	border-color: #fa7e23;
}	
.el-button--subManage:hover{
	background-color: #fba414;
	border-color: #fba414;
}	
</style>
