let baseUrl = "";
let baseImgPath = "";
let baseApiPath = "";

// 根据环境确定API基础URL
const isDevelopment = import.meta.env.DEV;

if (isDevelopment) {
    //开发环境
    baseUrl = 'http://127.0.0.1:3001';
    baseImgPath = 'http://localhost:3001/img';
    baseApiPath = 'http://localhost:3001';
} else {
    baseUrl='http://182.123.21:3001';
    baseImgPath='http://182.123.21:3001/img';
    baseApiPath = 'http://182.123.21:3001';
}

export {
    baseUrl,
    baseImgPath,
    baseApiPath,
}