var db=require('../database');
var tableName='cart';
var utility=require("../utility/utility");
module.exports=
    {

        updateBooking: function (updateQueryValue,condition) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let update='update bookings set ';

                    let updateValues=[];
                    if(updateQueryValue.status!==undefined)
                    {
                        update =update+' status = ?'
                        updateValues.push(updateQueryValue.status);
                    }
                    if(updateQueryValue.booking_status!==undefined){
                        if(updateQueryValue.status!==undefined) {
                            update =update+' , ';
                        }
                        update =update+' booking_status = ?';
                        updateValues.push(updateQueryValue.booking_status);
                    }
                    if(updateQueryValue.order_id!==undefined){
                        if(updateQueryValue.status!==undefined || updateQueryValue.booking_status!==undefined) {
                            update =update+' , ';
                        }
                        update =update+' order_id = ?';
                        updateValues.push(updateQueryValue.order_id);
                    }
                    if(updateQueryValue.booking_response!==undefined){
                        if(updateQueryValue.order_id!==undefined || updateQueryValue.status!==undefined || updateQueryValue.booking_status!==undefined) {
                            update =update+' , ';
                        }
                        update =update+' booking_response = ?';
                        updateValues.push(updateQueryValue.booking_response);
                    }

                    update =update+' where ';
                    if(condition.ref_no){
                        update =update+' ref_no = ?'
                        updateValues.push(condition.ref_no);
                    }

                    connection.query(update,updateValues, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        saveBooking: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err){
                        resolve([err, null]);
                    }
                    values.push(new Date());
                    values.push(new Date());
                    connection.query("insert into bookings (cart_id,ref_no,sku,amount,currency,user_id,status,created_at,updated_at) values (?,?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        checkRefNo:function (refNo) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select ref_no from bookings where ref_no = ? ",[refNo], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        userBookingsList:function (userId,limit,offset){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select b.amount,b.booking_status,b.status,b.created_at,b.order_id,b.booking_id,b.ref_no,pd.product_details from bookings  as b inner join product_details as pd on pd.sku=b.sku   where b.user_id = ?  order by b.created_at desc limit ? offset  ? ",[userId,limit,offset], function (err, response){
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
        },
        cardDetails:function (orderId) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select booking_response from bookings where order_id = ? ",[orderId], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
    };


