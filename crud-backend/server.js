const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fs = require("fs");
const pg = require("pg");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"]
}));

const config = {
    user: process.env.AIVEN_USER,
    password: process.env.AIVEN_SERVICE_PASSWORD,
    host: process.env.AIVEN_HOST_LINK,
    port: 24954,
    database: process.env.AIVEN_DATABASE_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('./ca.pem').toString()
    }
};

const client = new pg.Client(config);
client.connect((err) => {
    if (err) {
        return console.error("Database failed to connect: " + err.stack);
    }
    console.log("Database connection established");

    const query = `SELECT content_id, text, title, created_at FROM content ORDER BY content_id ASC;`;
    console.log("Executing query:", query);

    client.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query: " + err);
        } else {
            console.log('Query Result: ', result.rows);
        };
    });
});


app.get('/getProduct', (req, res) => {
    client.query('SELECT product_id, product_name, price, in_stock, description, brand FROM product ORDER BY product_id ASC;',
        (err, results) => {
            if (err) {
                console.error("Error running query", err.stack);
                return res.status(500).send("Error running query");
            };
            if (results.rows.length > 0) {
                return res.json(results.rows);
            } else {
                return res.json({ Error: 'Text Not Found' });
            }
        });
});

app.get('/getContent', (req, res) => {
    const contentQuery = `SELECT * FROM CONTENT ORDER BY content_id ASC;`;
    client.query(contentQuery, (err, results) => {
        if (err) {
            console.error("Error running query: " + contentQuery, err.stack);
            return res.status(500).send("Error running this query: " + contentQuery + err.stack);
        };
        if (results.rows.length > 0) {
            return res.json(results.rows);
        } else {
            return res.json({Error: 'Content db not found.'});
        }
    })
})

app.post("/newsletter", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    };
    try {
        const result = await client.query(
            `INSERT INTO newsletter (email, receive_at) VALUES ($1, CURRENT_TIMESTAMP)`,
            [email]
        );
        res.status(200).json({ success: true, data: result.rows[0] });
    }
    catch(err) {
        console.error('Error inserting email into the database:', err);
        res.status(500).json({ success: false, message: 'Server error. Try again later.' });
    
    };
});

app.post("/content", async (request, respond) => {
    const { title, text } = request.body;

    if (!title || !text) {
        return respond.status(400).json({ success: false, data: 'Title or text of the content is required.' });
    };

    try {
        const contentResult = await client.query(`INSERT INTO content (text, title, created_at)
            VALUES ($1, $2, CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Kuala_Lumpur')
            RETURNING *
            `, [title, text]
        );

        respond.status(200).json({success: true, data: contentResult.rows[0]});
    }
    catch(error) {
        console.error(`Error inserting content details into the database: ` + error);
        respond.status(500).json({success: false, message:  `Server error. Try again later.`});
    };
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT} or http://localhost:5001`);
});
