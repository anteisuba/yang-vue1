
let baseUrl = "";
let baseImgPath = "";

if (process.env.NODE_ENV === 'development') {
    //开发环境
    baseUrl = 'http://127.0.0.1:3001';
    baseImgPath = 'http://localhost:3001/files';
} else {
    baseUrl='http://182.123.21:3001';
    baseImgPath='http://182.123.21:3001/files';
}

export {
    baseUrl,
    baseImgPath,
}