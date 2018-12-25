var express = require('express');
var router = express.Router();
var Db = require('../model/Db');
var client = require('../model/Redis');
var md5 = require('../model/md5fun');
var redisConfig = require('../model/Redis/config');

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
};

//根据token获得用户ID
async function getUserId(res, token, callback) {
    if(!token) {
        jsonResponse(res, 500, '身份验证失败');
    }else{
        console.log('get=======>',token);
        return await client.get(token, function(err, tokenInfo) {
            console.log('tokenInfo=======>',token,tokenInfo);
            if(err) {
                 console.log(err);
             }else{
                if(!tokenInfo) {
                    jsonResponse(res, 500, '身份验证失败，请重新登录');
                }else{
                    var user_id = JSON.parse(tokenInfo).id;
                    if(callback){
                        callback(user_id);
                    }else{
                        return user_id
                    }
                }
             }
        })
    }
}
 
/**
 * [jsonResponse 接口返回json]
 * @param  {[type]} res    [res]
 * @param  {[type]} status [状态吗]
 * @param  {[type]} message    [信息]
 * @param  {[type]} data   [数据]
 * @return {[type]}        [json]
 */
function jsonResponse(res, code, message, data='') {
    return res.json({ code: code, message: message, data: data });
};

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if(req.url === '/login'){
        next();
    }else{
        var authorization = req.headers.authorization || false
        if(authorization){
            client.get(authorization,(err,data) => {
                if(err){
                    jsonResponse(res,40164,'请先登录');
                }
                client.expire(authorization,redisConfig.TOKENTIME);
                next();
            });
        }else{
            jsonResponse(res,40164,'请先登录');
        }
    }
});

//登录接口
router.post('/login', function(req, res, next) {
    var $sql = `select id,username,token from rn_admin_users where username="${req.body.username}" and password ="${req.body.password}" and status=1`;
    Db.query($sql,function(err,data){
        if(err){
            jsonResponse(res,500,'无服务',err);
        }
        if(data.length){
            var token = md5.getToken(data[0].username);
            var oldToken = data[0].token || token;
            client.get(oldToken,function(getErr,reply){
                if(getErr){
                    jsonResponse(res,1000,'服务器繁忙');
                }
                if(reply){
                    jsonResponse(res,200,'登录成功！',oldToken);
                }else{
                    client.set(token,JSON.stringify(data[0]),'EX',redisConfig.TOKENTIME,function(setErr){
                        if(setErr){
                            jsonResponse(res,1000,'服务器繁忙');
                        }
                        var $insertSql = `UPDATE rn_admin_users SET token = "${token}" WHERE id = ${data[0].id};`
                        Db.query($insertSql,function(insertErr,data){
                            if(insertErr){
                                jsonResponse(res,1000,'服务器繁忙');
                            }
                            jsonResponse(res,200,'登录成功！',token);
                        });
                    });
                }
            });
            
        }else{
            jsonResponse(res,1000,'用户名或密码不正确',token);
        }
    })
})

router.get('/index',(req,res,next) =>{
    // console.log(req.headers)
    // var token = req.headers.authorization;
    // console.log(token)
    res.send('去你的数据');
})
module.exports = router;