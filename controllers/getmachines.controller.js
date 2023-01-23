let mysql = require('mysql2');

let conn = mysql.createConnection({
    host : 'localhost',
    user : 'username',
    password : 'pwd',
    database : 'mydb',
});

conn.connect();


exports.getVms = (req, res) => {
    conn.query('select * from vms', function(error, results){
        if ( error ){
            res.status(418).send('Error in database operation');
        } else {
            res.status(200).send(JSON.stringify(results));
        }
    });
};