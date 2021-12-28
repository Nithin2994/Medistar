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
                    if(updateQueryValue.quantity!==undefined)
                    {
                        update =update+' quantity = ?'
                        updateValues.push(updateQueryValue.quantity);
                    }
                    update =update+' where ';
                    if(condition.cart_id){
                        update =update+' cart_id = ?'
                        updateValues.push(condition.cart_id);
                    } if(condition.user_id){
                        update =update+' user_id = ?'
                        updateValues.push(condition.user_id);
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
                    connection.query("insert into cart (product_id,them,category_id,amount,currency,quantity,user_id,status,created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?)",values, function (err, response){
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


                    connection.query("select c.category_id,c.them,c.product_id,c.cart_id,c.amount,c.currency,c.user_id,c.quantity,pd.product_details from cart as c inner join product_details as pd on pd.sku=c.product_id where c.user_id = ? and c.status= ? order by c.created_at desc",[userId,1], function (err, response){
                        connection.release();
                          if(response && response.length){
                              for(let p=0;p<response.length;p++){
                                  response[p].product_details=JSON.parse(response[p].product_details)
                              }
                          }
                        resolve([err, response]);
                    });

                });
            })
        }
    };


