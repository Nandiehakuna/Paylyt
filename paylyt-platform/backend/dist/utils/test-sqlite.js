"use strict";
const db = require('./utils/db');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY, name TEXT)");
    db.run("INSERT INTO test_table (name) VALUES (?)", ["PayLyt"], function (err) {
        if (err)
            return console.error(err.message);
        console.log(`Inserted row with id ${this.lastID}`);
        db.get("SELECT * FROM test_table WHERE id = ?", [this.lastID], (err, row) => {
            if (err)
                return console.error(err.message);
            console.log("Row:", row);
            db.close();
        });
    });
});
