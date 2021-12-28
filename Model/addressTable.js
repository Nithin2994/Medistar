var db=require('../database');
var tableName='scheduled_items';
var utility=require("../utility/utility");
module.exports=
    {
        updateAddress: function (updateQueryValue,condition) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }
                    let update='update address set ';

                    let updateValues=[];
                       console.log(updateQueryValue,'Updated Vlaues');
                    if(updateQueryValue.status!==undefined)
                    {

                        update =update+' status = ?'
                        console.log(update,"comes iNDIfee");
                        updateValues.push(updateQueryValue.status);
                    }
                    update =update+' where ';
                    if(condition.address_id){
                        update =update+' address_id = ?'
                        updateValues.push(condition.address_id);
                    }
                     console.log(update,"updatedddd");
                    connection.query(update,updateValues, function (err, response){
                        console.log(this.sql);
                        connection.release();

                        resolve([err, response]);
                    });

                });
            })
        },
        addAddress: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err){
                        resolve([err, null]);
                    }
                    values.push(new Date());
                    values.push(new Date());
                    connection.query("insert into address (user_id,first_name,last_name,mobile,line_1,line_2,city,region,country,postcode,status,created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",values, function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getAddressList:function (userId){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }


                    connection.query("select address_id,user_id,first_name,last_name,mobile,line_1,line_2,city,region,country,postcode from address where user_id = ? and status =? order by created_at desc",[userId,1], function (err, response){
                        connection.release();
                        console.log(err,"check Errr");
                        resolve([err, response]);
                    });

                });
            })
        },
        getAddressDetails:function (userId){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {

                    if (err) {
                        resolve([err, null]);
                    }


                    connection.query("select address_id,user_id,first_name,last_name,mobile,line_1,line_2,city,region,country,postcode from address where user_id = ? and status =? order by created_at desc",[userId,1], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        }
    };


