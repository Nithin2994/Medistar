var db=require('../database');
var tableName='users';
var utility=require("../utility/utility");
module.exports=
    {
        checkUser: function (condition) {
            return  new Promise((resolve )=>{
            db.connection.getConnection(function (err, connection) {
                      console.log(err,"connection erroror")
                if (err) {
                    return resolve([err, null]);
                }
                let select='';
                let where=[];
               if(condition.email){
                   select =' email = ?'
                   where.push(condition.email);
               }
                if(condition.mobile){
                    select =' mobile = ?'
                    where.push(condition.mobile);
                }
                connection.query("select * from users where "+select,where, function (err, response){
                    connection.release();
                    console.log(err,"check Errr");
                    resolve([err, response]);
                });

            });
            })
        },
        getUserDetails: function (condition) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let select='';
                    let where=[];
                    if(condition.user_id){
                        select =' user_id = ?'
                        where.push(condition.user_id);
                    }
                    if(condition.mobile){
                        select =' mobile = ?'
                        where.push(condition.mobile);
                    }
                    connection.query("select user_id,first_name,last_name,email,mobile from users where "+select,where, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        insertUser: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    values.push(new Date());
                    values.push(new Date());
                    connection.query("insert into users (first_name,last_name,mobile,email,password,hash,role,created_at,updated_at) values (?,?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                           console.log(err,"insert Errr");
                        resolve([err, response]);
                    });

                });
            })
        },
    };


