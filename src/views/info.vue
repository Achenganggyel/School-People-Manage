<template>
    <div class="hello">
        <div style="padding: 14px;"> 
            <div align="center" class="header-t">
                <span>系统介绍</span>
            </div>
        <div class="text">
        <br><br><br>
        各位好，我们是汕头大学软件工程课程小组-麻辣咸鱼队，基于vue-elementplus和mysql开发了这款简易的校园人员管理系统。
        该系统于2022-2023学年秋季创建，开发时间一个月左右。
        <br><br><br>
        本系统的宗旨是，减轻人员管理的复杂度、降低人员流动的不透明度
        <br><br>
        该系统的目标是为建设数字化社会添砖加瓦XPP
        </div>
        </div>
    </div>
</template>
   
<script lang="ts">
    export default {
    data() {
        return {
        currentDate: new Date()
        };
    }
}
</script>

<style>
.hello{
    background-image: url(../assets/img/info_bg.jpeg);
    width: 100%;
    height: 100%;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.text{
    margin-left: 10%;
    margin-right: 10%;
}
</style>
   
