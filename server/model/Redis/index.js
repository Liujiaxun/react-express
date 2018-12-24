
var redis   = require('redis');
var client  = redis.createClient('35379', '127.0.0.1');
// redis 链接错误
client.on("error", function(error) {
  console.log(error,'错误');
});

// async function setValue(key,value,time){
//     await client.set(key,value,time,redis.print);
// }

// async function getValue(key){
//     await client.get(key,redis.print);
// }

module.exports = client;