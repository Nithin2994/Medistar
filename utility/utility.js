let usersByRooms={};
var crypto = require('crypto');

function formatDateTime(date) 
{
    return ('{0}-{1}-{3} {4}:{5}:{6}').replace('{0}', date.getFullYear()).replace('{1}', date.getMonth() + 1).replace('{3}', date.getDate()).replace('{4}', date.getHours()).replace('{5}', date.getMinutes()).replace('{6}', date.getSeconds())
}
function generateHash()
{
        let hashLength = 16;
        let characters = '1234567890123456';
        let hash = '';
        for (var i = 0; i < characters.length; i++) {
            hash = hash + characters.charAt(Math.random() * (hashLength - 0) + 0);

        }
        return hash;
}
function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function encrypt(string)
{
    let iv = '1234567890123456';
    let hash=generateHash();
    let cipher = crypto.createCipheriv('aes-128-cbc', hash, iv);

    let encrypted = cipher.update(string, 'utf8', 'binary');
    encrypted += cipher.final('binary');
    let hexVal = new Buffer.from(encrypted, 'binary');
    let newEncrypted = hexVal.toString('hex');
    return {'password':newEncrypted,'hash':hash};
}
function decrypt(password, hash)
{
    console.log(hash,password,"passwordddd");
    let iv = '1234567890123456';

    let decipher = crypto.createDecipheriv('aes-128-cbc', hash, iv);

    let decrypted = decipher.update(password, 'hex', 'binary');
    decrypted += decipher.final('binary');
    return decrypted;

    /*   let mykey = crypto.createDecipher('aes-128-cbc', hash);
     let mystr = mykey.update(password, 'hex', 'utf8');
     mystr += mykey.final('utf8');
     return mystr;*/
}
module.exports = {
        formatDateTime:formatDateTime,
        usersByRooms:usersByRooms,
    encrypt,decrypt,
   CART_TYPE_ADD:1,
    CART_TYPE_DELETE:2,
    CART_TYPE_UPDATE_QUANTITY:3,
    CART_STATUS_ADD:1,
    CART_STATUS_DELETE:2,
    ADDRESS_STATUS_ACTIVE:1,
    ADDRESS_STATUS_DELETE:2,
    BOOKING_STATUS_PROCESSING:1,
    BOOKING_STATUS_BOOKING:2,
    makeid
    };
