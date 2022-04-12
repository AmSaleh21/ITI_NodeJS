// To use the HTTP server and client
// import http from 'http'
// import { createServer } from 'http' => line 14 (const app = createServer())
const http = require('http');

// file stream module to CRUD on files
// import fs from 'fs'
// import { readFile, existsSync, writeFileSync, readFileSync } from 'fs'
//      and change from fs.<method> to <method> 
const fs = require('fs');

//to separate .on from .error from listen 
//and to be able to work on promise with async 
const app = http.createServer();

/**
 * to display the GET url
 * @param url url to be displayed
 * @param res response
 */
const displayGET = (url, res) => {
    fs.readFile(__dirname + url, function (err, data) {
        if (err) {
            sendStatusResponse(res, 404, JSON.stringify(err));
            return;
        }
        sendStatusResponse(res, 200, data, 'text/html');
    });
}

/**
 * send the status response as JSON (default)
 * @param res response 
 * @param status html status code
 * @param data data to be written (if status 200)
 * @param contentType json || html || text/plain
 */
const sendStatusResponse = (res, status = 404, data = '', contentType = 'application/json') => {
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(data);
};

/**
 * returns JSON array from the POST body
 * @param  req the POST request
 * @returns JSON array
 */
const getRequestBody = async req => {
    let data = '';
    let buffers = [];
    let params = {};
    let formData = {};
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    data = Buffer.concat(buffers).toString();
    if (req.headers['content-type'] === 'application/json') {
        formData = JSON.parse(data)
    } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        params = new URLSearchParams(data);
        params.forEach((value, key) => {
            formData[key] = value;
        });
    }
    return formData;
}

/**
 * add a listener
 */
app.on("request", async (req, res) => {
    const { method, url } = req;

    //url must contain /api to activate POST
    if (url.search("/api") === 0) {
        if (method === 'POST') {
            // get the data from the POST body
            const { email, password, username } = await getRequestBody(req);
            //create data.json (storing users data) if not exists
            if (!fs.existsSync("data.json")) {
                fs.writeFileSync("data.json", "{}");
            }
            const fileData = JSON.parse(fs.readFileSync("data.json").toString());
            //if data not sent or not correctly received send status 500 
            if (email === undefined || password === undefined) {
                sendStatusResponse(res, 500);
                return;
            }
            //email is the main identifier
            const current = fileData[email];
            //check if the uri is login / register
            switch (url.toLowerCase()) {
                case "/api/login":
                    if (current) {
                        if (current.password === password) {
                            sendStatusResponse(res, 200, JSON.stringify({ "success": true, username: current.username }));
                            // displayGET('/static/html/profile.html', res)
                        } else {
                            sendStatusResponse(res, 403, JSON.stringify({ "error": "Wrong Password" }));
                        }
                    } else {
                        sendStatusResponse(res, 403, JSON.stringify({ "error": "Wrong Email" }));
                    }
                    break;
                case "/api/sign-up":
                    if (current) {
                        sendStatusResponse(res, 400, JSON.stringify({ error: "Email already exists" }));
                    } else {
                        fileData[email] = {
                            password, username
                        };
                        try {
                            fs.writeFileSync("data.json", JSON.stringify(fileData));
                            sendStatusResponse(res, 200, JSON.stringify({ "success": true, username }));
                            // displayGET('/static/html/login.html', res)
                        } catch (e) {
                            console.log(e);
                            sendStatusResponse(res, 500, JSON.stringify({ "error": "Server Error" }));
                        }
                    }
                    break;
                default:
                    sendStatusResponse(res, 404, JSON.stringify({ error: "Not Found" }));
            }
            //if url /api and not POST or any other method
        } else {
            sendStatusResponse(res, 405, JSON.stringify({ error: "Method not allowed" }));
        }

        //if url doesn't contain /api then GET
    } else {
        if (method === 'GET') {
            if (url === '/') {
                displayGET('/static/html/home.html', res);
            } else {
                sendStatusResponse(res, 404, JSON.stringify({ error: "Not Found" }));
            }
        } else {
            sendStatusResponse(res, 405, JSON.stringify({ error: "Method not allowed" }));
        }
    }
});
app.on("error", (error) => {
    console.log(error)
})
app.listen(3000);
