<template>
	<div class="container">
		<div class="schart-box">
			<div class="content-title">柱状图</div>
			<schart class="schart" canvasId="bar" :options="options1"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">折线图</div>
			<schart class="schart" canvasId="line" :options="options2"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">饼状图</div>
			<schart class="schart" canvasId="pie" :options="options3"></schart>
		</div>
		<div class="schart-box">
			<div class="content-title">环形图</div>
			<schart class="schart" canvasId="ring" :options="options4"></schart>
		</div>
	</div>
</template>

<script setup lang="ts" name="basecharts">
import Schart from 'vue-schart';
import type_distribute from '../../public/type_distribute.json'
let type_name:string[]=[]
let type_number:number[]=[]
let stu_type_name:string[]=[]
let stu_type_number:number[]=[]

//从本地json中获取指定数组
for(let i of type_distribute.type){
	type_name.push(i.title)
	type_number.push(i.number)
	if(i.id=="BKS"||i.id=="FQYJS"||i.id=="QYJS"){
		stu_type_name.push(i.title)
		stu_type_number.push(i.number)
	}
}

const options1 = {
	type: 'bar',
	title: {
		text: '本周校内出勤次数直方图'
	},
	bgColor: '#fbfbfb',
	labels: ['周一', '周二', '周三', '周四', '周五'],
	datasets: [
		{
			label: '行政人员',
			fillColor: 'rgba(241, 49, 74, 0.5)',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: '教师',
			data: [164, 178, 190, 135, 160]
		},
		{
			label: '学生',
			data: [144, 198, 150, 235, 120]
		}
	]
};
const options2 = {
	type: 'line',
	title: {
		text: '本学期校内人员出勤次数折线图'
	},
	bgColor: '#fbfbfb',
	labels: ['9月', '10月', '11月', '12月', '1月'],
	datasets: [
		{
			label: '行政人员',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: '教师',
			data: [164, 178, 150, 135, 160]
		},
		{
			label: '学生',
			data: [114, 138, 200, 235, 190]
		}
	]
};
const options3 = {
	type: 'pie',
	title: {
		text: '校内各类人员数量分布'
	},
	legend: {
		position: 'left'
	},
	bgColor: '#fbfbfb',
	labels: type_name,
	datasets: [{
			data: type_number
	}]
};
const options4 = {
	type: 'ring',
	title: {
		text: '学生类别分布'
	},
	showValue: false,
	legend: {
		position: 'bottom',
		bottom: 40
	},
	bgColor: '#fbfbfb',
	labels: stu_type_name,
	datasets: [{
		data: stu_type_number
	}]
};
</script>

<style scoped>
.schart-box {
	display: inline-block;
	margin: 20px;
}
.schart {
	width: 600px;
	height: 400px;
}
.content-title {
	clear: both;
	font-weight: 400;
	line-height: 50px;
	margin: 10px 0;
	font-size: 22px;
	color: #1f2f3d;
}
</style>
