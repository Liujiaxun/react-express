var md5 = require('md5');
function getToken(str){
    var date = new Date().getTime();
    var tokenStr = '__TOKEN__REACT__ADMIN__LJX__'
    return md5(tokenStr+date+str);
}

module.exports = {
    getToken:getToken
}