var tables=require('./Model/baseTable');
var utility=require("./utility/utility");
module.exports=
    {
        socketsConnection:function (io) {
            io.on('connection', function(client){
            });
        }
    };
