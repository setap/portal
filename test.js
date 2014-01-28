var oracle = require('oracle');

var connectData = {
    hostname: "localhost",
    port: 1521,
    database: "sccd", // System ID (SID)
    user: "sc",
    password: "123"
}

oracle.connect(connectData, function (err, connection) {
    if (err) {
        console.log("Error connecting to db:", err);
        return;
    }

    connection.execute("SELECT systimestamp FROM dual", [], function (err, results) {
        if (err) {
            console.log("Error executing query:", err);
            return;
        }

        console.log(results);
        connection.close(); // call only when query is finished executing
    });
});