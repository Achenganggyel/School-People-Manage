<template>
	<div class="sidebar">
		<el-menu
			class="sidebar-el-menu"
			:default-active="onRoutes"
			:collapse="sidebar.collapse"
			background-color="#b88558"
			text-color="#bfcbd9" 
			active-text-color="#f7da94"
			unique-opened
			router
		>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-sub-menu :index="item.index" :key="item.index" v-permiss="item.permiss">
						<template #title>
							<el-icon>
								<component :is="item.icon"></component>
							</el-icon>
							<span>{{ item.title }}</span>
						</template>
						
						<template v-for="subItem in item.subs">
							<el-menu-item
								:index="subItem.index"
								v-permiss="subItem.permiss"
							>
								<template #title>{{ subItem.title }}</template>
							</el-menu-item>
							
						</template>
					</el-sub-menu>
				</template>
				<template v-else>
					<el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
						<el-icon>
							<component :is="item.icon"></component>
						</el-icon>
						<template #title>{{ item.title }}</template>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
	{
		icon: 'Odometer',
		index: '/dashboard',
		title: '系统首页',
		permiss: '1'
	},
	{
		icon: 'Calendar',
		title: '人员信息',
		permiss: '2',
		subs: [
			{	index:'/teacher',
				title:'老师管理',
				permiss: '2'
			},
			{	index:'/student',
				title:'学生管理',
				permiss: '2'
			},
			{	index:'/stuff',
				title:'其他职工',
				permiss: '2'
			},
			{	index:'/mobileWorker',
				title:'流动人员',
				permiss: '2'
			},
		]
	},
	{
		icon: 'DocumentCopy',
		index: '/tabs',
		title: '消息通知',
		permiss: '3'
	},
	{
		icon: 'Edit',
		index: '/form',
		title: '通知发送',
		permiss: '4',
		
	},
	{
		icon: 'DataAnalysis',
		index: '/charts',
		title: '数据统计',
		permiss: '11'
	},
	{
		icon: 'Warning',
		index: '/permission',
		title: '权限管理',
		permiss: '13'
	},
	{
		icon:'Compass',
		index:'/info',
		title:'系统信息',
		permiss:'14'
	}
];

const route = useRoute();
const onRoutes = computed(() => {
	return route.path;
});

const sidebar = useSidebarStore();
</script>

<style>
.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
	width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
}
.sidebar > ul {
	height: 100%;
}
</style>
