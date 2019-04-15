
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
// function getConnection(){
    //var connection = mysql.createConnection({
    var pool  = mysql.createPool({
        host     : 'ec2-54-215-144-28.us-west-1.compute.amazonaws.com',
        user     : 'root',
        password : 'Cricket2012@',
        database : 'sjsu_canvas',
        port	 : 3001
    });
    /*return connection;
}*/


function fetchData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    pool.getConnection(function(err,connection) {

        connection.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log("ERROR: " + err.message);
            }
            else {	// return err or result
                console.log("DB Results:" + rows);
                callback(err, rows);
            }
        });
        console.log("\nConnection closed..");
        connection.release();
    });
}

function executeQuery(callback, sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);


    pool.getConnection(function(err,connection) {

        connection.query(sqlQuery, function (err, result) {
            callback(err);
        });
        console.log("\nConnection closed..");
        connection.release();
    });
}


exports.fetchData=fetchData;
exports.executeQuery=executeQuery;



