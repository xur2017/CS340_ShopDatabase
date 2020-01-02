var mysql = require('mysql');
var pool = mysql.createPool({
  //connectionLimit : 10,
  //host            : 'classmysql.engr.oregonstate.edu',
  //user            : 'cs340_xurui',
  //password        : '7905',
  //database        : 'cs340_xurui',
  //dateStrings: 'date'
  
  connectionLimit : 10,
  host            : '127.0.0.1',
  user            : 'root',
  password        : '1234',
  database        : 'test',
  dateStrings: 'date'
});

module.exports.pool = pool;