//file stream to read and write the JSON file with the data
const fs = require('fs');

module.exports = (app) => {
    //render the index.ejs from views, as the home
    app.get('/', (req, res) => {
        res.render('index');
    });

    //POST
    app.post("/api/sign-up", (req, res) => {
        const { email, password, username } = req.body;
        //create data.json (storing users data) if not exists
        if (!fs.existsSync("data.json")) {
            fs.writeFileSync("data.json", "{}");
        }
        const fileData = JSON.parse(fs.readFileSync("data.json").toString());
        //if data not sent or not correctly received send status 500 
        //and JSON error 
        if (email === undefined || password === undefined) {
            res.status(500).send({ error: "missing data (email || password)" });
            return;
        }
        //email is the main identifier
        const current = fileData[email];
        if (current) {
            //email exists
            res.status(400).send({ error: "Email already exists", success: false });
        } else {
            fileData[email] = {
                password, username
            };
            try {
                fs.writeFileSync("data.json", JSON.stringify(fileData));
                res.status(200).send({ "success": true, username });
            } catch (e) {
                console.log(e);
                res.status(500).send({ "error": "Server Error" });
            }
        }
    });


    app.post("/api/login", (req, res) => {
        const { email, password } = req.body;
        if (!fs.existsSync("data.json")) {
            fs.writeFileSync("data.json", "{}");
        }
        const fileData = JSON.parse(fs.readFileSync("data.json").toString());
        if (email === undefined || password === undefined) {
            res.status(500).send({ error: "missing data (email || password)" });
            return;
        }
        const current = fileData[email];
        if (current) {
            if (current.password === password) {
                res.status(200).send({ "success": true, username: current.username });
            } else {
                res.status(403).send({ "error": "Wrong Password", success: false });
            }
        } else {
            res.status(403).send({ "error": "Wrong Email", success: false });
        }
    })
}