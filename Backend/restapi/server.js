require('dotenv').config();
const http = require('http');
const app=require('./app');


let port=process.env.PORT;
let host=process.env.HOST;
let server=http.createServer(app);
server.listen(9999,()=>{
    console.log(`my server get started on  ${host}:${port}`);
})