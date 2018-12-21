var express = require('express');
var router = express.Router();
var Db = require('../model/Db').connect();
router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//设置跨域访问
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     console.log(1);
//     if (req.method == 'OPTIONS') {
//       res.send(200); /*让options请求快速返回*/
//     } else {
//       next();
//     }
//   })

router.get('/login', function(req, res, next) {
    console.log(Db);
    res.send({status:1});
});
module.exports = router;