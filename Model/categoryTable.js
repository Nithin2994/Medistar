var db=require('../database');
var tableName='cart';
var utility=require("../utility/utility");
module.exports=
    {

        updateCart: function (updateQueryValue,condition) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let update='update cart set ';

                    let updateValues=[];
                    if(updateQueryValue.status!==undefined)
                    {
                        update =update+' status = ?'
                        updateValues.push(updateQueryValue.status);
                    }
                    update =update+' where ';
                    if(condition.cart_id){
                        update =update+' cart_id = ?'
                        updateValues.push(condition.cart_id);
                    }

                    connection.query(update,updateValues, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        addCart: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err){
                        resolve([err, null]);
                    }
                    values.push(new Date());
                    values.push(new Date());
                    connection.query("insert into cart (product_id,category_id,amount,currency,user_id,status,created_at,updated_at) values (?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                        console.log(err,"insert Errr");
                        resolve([err, response]);
                    });

                });
            })
        },getCartList:function (userId){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }


                    connection.query("select category_id,product_id,cart_id,amount,currency from cart where user_id = ? and status= ? order by created_at desc",[userId,1], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        }
    };


