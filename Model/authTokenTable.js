var db=require('../database');
var tableName='scheduled_items';
var utility=require("../utility/utility");
module.exports=
    {
        addToken: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err){
                        resolve([err, null]);
                    }
                    values.push(new Date());

                    connection.query("insert into auth_tokens (auth_token,auth_type,created_at) values (?,?,?)",values, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getAuthDetails:function (authType){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select auth_token,created_at from auth_tokens where auth_type = ? ",[authType], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        deleteAuthToken:function (authType){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("delete from auth_tokens where auth_type = ? ",[authType], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        }
    };


