// APi设置面板
// API端口
const port = 666
// 不进行token验证的子口
const api = [/^\/todo\/my\//]
// 允许每日用户上传的条数
const row = 10
/*　生成格式化日期 */
const dayjs = require('dayjs')
let d = new Date()
const pub_date = dayjs(d).format('YYYY-MM-DD')
const pub_month = dayjs(d).format('MM')
/* 生成随机ＵＩＤ */
const art_idnum = Math.floor(Math.random() * (100 - 10 + 1)) + 10
let str = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function generateMixed(n) {
    let res = "";
    for(let i = 0; i < n ; i ++) {
        let id = Math.ceil(Math.random() * 35);
        res += str[id];
    }
    return res + art_idnum;
}
// 配置一个token加密密钥
const jwtSecretKey = 'todolistVue'
    // token的有效期 3h
const expiresIn = '24h'
module.exports={
    port,
    api,
    pub_date,
    pub_month,
    generateMixed,
    row,
    jwtSecretKey,
    expiresIn
}
