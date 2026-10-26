const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./orders.sqlite');

console.log("EXPLAIN QUERY PLAN (Before Index)");

db.all("EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 'CUST-1045' ", [], (err, rows)=>{
    if (err) throw err;

    console.table(rows);

    db.run("CREATE INDEX IF NOT EXISTS idx_customer ON orders(customer_id)", ()=> {
        console.log("EXPLAIN QUERY PLAN (After Index)");

        db.all("EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 'CUST-1045' ", [], (err2, rows2)=> {
            if (err2) throw err2;
            console.table(rows2);
            db.close(()=> console.log("Database connection closed cleanly."))
        })

    })

})