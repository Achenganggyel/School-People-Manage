import request from '../utils/request';
//存放前端调用的接口

//本地静态数据
export const fetchData = () => {
    return request({
        url: './table.json',
        method: 'get'
    });
};

export const fetchTeacher=()=>{
    return request({
        url:'/teachermanage',
        method:'get'
    })
}

export const fetchStudent=()=>{
    return request({
        url:'/studentmanage',
        method:'get'
    })
}

export const fetchStuff=()=>{
    return request({
        url:'/stuffmanage',
        method:'get'
    })
}

export const fetchMobile=()=>{
    return request({
        url:'/mobilemanage',
        method:'get'
    })
}