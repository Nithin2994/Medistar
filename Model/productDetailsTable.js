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
        addProductDetails: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err){
                        resolve([err, null]);
                    }
                    values.push(new Date());
                    values.push(new Date());
                    connection.query("insert into product_details (sku,product_details,status,created_at,updated_at) values (?,?,?,?,?)",values, function (err, response){
                        connection.release();

                        resolve([err, response]);
                    });

                });
            })
        },
        checkProductDetails:function (sku){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }


                    connection.query("select product_details from product_details where sku = ?",[sku], function (err, response){
                            console.log(err,this.sql);
                        connection.release();
                        if(err){
                            return resolve([err,null])
                        }
                        if(response && response.length){
                            response=JSON.parse(response[0]['product_details']);
                        }
                        resolve([null, response]);
                    });

                });
            })
        }
    };


