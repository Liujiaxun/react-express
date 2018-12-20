    
var mysql=require('mysql');
  
    function connectServer(){
        var client=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'abc123456',
            database:'dby'
        })
        return client;
    }
 
 
 function  selectFun(client,username,callback){
     //client为一个mysql连接对象
     client.query('select password from table_1 where username="'+username+'"',function(err,results,fields){
         if(err) throw err;
 
         callback(results);
     });
 }
 
 function insertFun(client , username , password,callback){
     client.query('insert into table_1 value(?,?)', [username, password], function(err,result){
         if( err ){
             console.log( "error:" + err.message);
             return err;
         }
           callback(err);
     });
 }
 
 exports.connect = connectServer;
 exports.selectFun  = selectFun;
 exports.insertFun = insertFun;
