
const fs=require('fs');


// const path=require('path');

// //console.log(path);


// console.log(path.join(__dirname,'demo1.txt'));






//create file
// fs.writeFile('demo.txt','welcome to node js class',(err)=>{
//     if(err) throw err;
//     console.log('file created');
// })


//read file
// fs.readFile('demo.txt','utf-8',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

//rename file
// fs.rename('demo.txt','demo1.txt',(err)=>{
//     if(err) throw err;
//     console.log('file renamed');
// })

//update file
// fs.appendFile('demo1.txt',' welcome webskitters',(err)=>{
//     if(err) throw err;
//     console.log('file updated');
// })


const http=require('http');


const server=http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    res.write('<h1>hello welcome to node js class </h1>');
    res.end();
});

server.listen(3005,()=>{
    console.log('server is running on port 3005');
});