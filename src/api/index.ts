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
        url:'./teacher.json'||'/teachermanage', 
    })
}

export const fetchStudent=()=>{
    return request({
        url:'./student.json'||'/studentmanage',
        method:'get'
    })
}

export const fetchStuff=()=>{
    return request({
        url:'./stuff.json'||'/stuffmanage',
        method:'get'
    })
}

export const fetchMobile=()=>{
    return request({
        url:'./mobile.json'||'/mobilemanage',
        method:'get'
    })
}