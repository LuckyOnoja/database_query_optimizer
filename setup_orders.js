const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./orders.sqlite');

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS orders");
    db.run(`CREATE TABLE orders (
        id INTEGER PRIMARY KEY, 
        customer_id TEXT, 
        order_date TEXT, 
        total_amount REAL, 
        status TEXT
    )`);

    const stmt = db.prepare("INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES (?, ?, ?, ?)");
    for (let i = 1; i <= 100; i++) {
        stmt.run(`CUST-${1000 + i}`, `2026-03-${(i % 28) + 1}`, Math.floor(Math.random() * 500) + 50, i % 2 === 0 ? 'COMPLETED' : 'PENDING');
    }
    stmt.finalize();
});

db.close(() => console.log("Synthetic orders database initialized without indexes."));