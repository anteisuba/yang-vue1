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


// 可以在 data.ts 中添加这个函数和模拟数据
const commentTemplates = [
    "#WutheringWaves #Wuwafanart #Phoebe 好可爱！！",
    "#WutheringWaves #Wuwafanart #Phoebe 画的真好看",
    "#WutheringWaves #Wuwafanart #Phoebe Phoebe 太漂亮了",
    "#WutheringWaves #Wuwafanart #Phoebe 期待游戏",
    "#WutheringWaves #Wuwafanart #Phoebe 画风绝了"
];

const getRandomComment = () => {
    const randomIndex = Math.floor(Math.random() * commentTemplates.length);
    return commentTemplates[randomIndex];
};

//评论
export const comment = Mock.mock({
    code: 200,
    "data": {
        "count": 123,
        "list|123": [{
            "id|+1": 0,
            "article": {
                "id|+1": 2,
                "name": "@title(3,12)",
            },
            "user": {
                "id|+1": 3,
                "name": "antei",
                "imgurl": "https://pbs.twimg.com/profile_images/1818293893651398656/5oEtC9tB_400x400.jpg",
            },
            "comment": getRandomComment(),
            "moment": "@datetime()",
            "complaint|0-12": 0
        }]
    }
})