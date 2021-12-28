var db=require('../database');
var tableName='cart';
var utility=require("../utility/utility");

module.exports=
    {
        addProduct: function (values) {
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err){
                        resolve([err, null]);
                    }
                    connection.query("insert into products (category_id,sku,product,created_at) values ?",[values], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getProduct:function (categoryId,sku){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select sku from products where sku = ? and category_id=?",[sku,categoryId], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        checkCategoryExists:function (categoryId){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select sku from products where and category_id=?",[sku,categoryId], function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        },
        getProducts:function (category,limit,offset){
            return  new Promise((resolve)=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select product from products  where status = 1 limit ? offset ?",[limit,offset], function (err, response){
                        connection.release();
                           if(err){
                               return resolve(err,null)
                           }
                           let products=[];
                           for(let product of response){
                               products.push(JSON.parse(product.product));
                           }
                       return  resolve([err, products]);
                    });

                });
            })
        },
        getProductCount:function (categoryId){
            return  new Promise((resolve )=>{
                db.connection.getConnection(function (err, connection) {
                    if (err) {
                        resolve([err, null]);
                    }
                    connection.query("select count(*) from products category_id =?",[categoryId] ,function (err, response){
                        connection.release();
                        resolve([err, response]);
                    });

                });
            })
        }
    };


