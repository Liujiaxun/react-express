var MySql = require('./dataBase');

var Db ={
    find:null,
    select:null,
    query:null
};

Db.find = function(tableName,id,callback){
    var sql = `select * from ${tableName} where id = ${id}`;
    MySql.pool.getConnection(function(err,connection){
        if(err){
            callback(true,err);
            return;
        }
        connection.query(sql,function(err,results){
            connection.release();
            if(err){
                callback(true,err);
                return;
            }
            callback(false, results);
        });
    });
};

Db.query = function($sql,callback){
    MySql.pool.getConnection(function(err,connection){
        if(err){
            callback(true,err);
            return;
        }
        connection.query($sql,function(err,results){
            if(err){
                callback(true,err);
                return;
            }
            callback(false,results);
        })
    });
}

module.exports = Db;