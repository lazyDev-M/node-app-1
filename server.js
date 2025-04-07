
const http = require('http')

const fs = require('fs')
console.log('log one');


fs.writeFile('greeting.html','<p> Hello world</p>',(err)=>{
    if(err) throw err
    console.log('file created');
    
})

fs.readFile('greeting.txt', 'utf8', (err, data) =>{
    if(err) throw err
    console.log('file content: ', data);
    
})

console.log('This should come first');



const server = http.createServer((req,res)=> {
    res.writeHead(200, {'content-type':'text/plain'})
    res.end('hello world')
})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
    
})