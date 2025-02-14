import Mock from 'mockjs'

const Random = Mock.Random
//总览数据
export const overview = Mock.mock({
    code: 200,
    "data": {
        "file": Random.float(60, 100, 2, 2) + 'M',
        "article|0-50": 0,
        "gallery|0-50": 0,
        "diary|0-50": 0,
        "project|0-50": 0,
        "resource|0-50": 0,

    }
})

//访问量数据
export const visit = Mock.mock({
    code: 200,
    "data|30": [
        {
            //时间
            "date": "@datetime('MM-dd')",
            "count|10-100": 12,

        }
    ]
})

//数据监测
export const survey = Mock.mock({
    "data": {
        "device": [
            {
                "key": "mobile",
                "name": "移动端",
                "value|30-120": 50,
            },
            {
                "key": "pc",
                "name": "电脑端",
                "value|30-120": 40,
            },
        ],
        "website": [
            {
                "key": "home",
                "name": "首页",
                "value|30-120": 50,
            },
            {
                "key": "project",
                "name": "项目",
                "value|30-120": 40,
            },
            {
                "key": "diary",
                "name": "日记",
                "value|30-120": 40,
            },
            {
                "key": "photo",
                "name": "摄影",
                "value|30-120": 40,
            },
        ]
    }
}) 