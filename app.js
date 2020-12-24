console.log("Hello world from Node.js");
const tutorial = require ('./tutorial')
console.log(tutorial);
console.log(tutorial.sum(1,1));
console.log(tutorial.PI);
console.log( new tutorial.SomeMathObject());


//Events Module and Events Emitter Class
const EventEmitter = require ('events');
const eventEmitter = new EventEmitter();
eventEmitter.on('tutorial',(num1,num2)=>{ // will only be executed when a tutorial event occurs
    console.log('tutorial event has occured');
    console.log( num1 + num2);
});
eventEmitter.emit('tutorial',1,2);

class Person extends EventEmitter{
    constructor(name){
        super();
        this._name= name;
    }
}
let pedro = new Person('pedro').on('name', ()=>{
    console.log('My name is '+ pedro._name);
})
let christina = new Person('christina').on('name', ()=>{
    console.log('My name is '+christina._name);
})
pedro.emit('name');
christina.emit('name');//Synchronous execution of events occur in node.js*/

//READLINE module
const readLine = require('readline');
const rl= readLine.createInterface({input:process.stdin, output:process.stdout});
let num1 = Math.floor((Math.random()*10)+1);
let num2= Math.floor((Math.random()*10)+1);
let answer = num1+num2;

rl.question(`What is ${num1} + ${num2}? \n`,
    (userInput)=>{
        //console.log(userInput); // just printing the above line what is 7 + 3 on consoleb
        if(userInput.trim()==answer){
            rl.close();
        }
        else{ // continues to loop unless correct answer is given
            rl.setPrompt('Incorrect response.\n Please try again');
            rl.prompt();
            rl.on('line', (userInput)=>{
                if(userInput.trim()==answer){
                    rl.close();
                }
                else{
                    rl.setPrompt(`Your answer of ${ userInput } is incorrect`);
                    rl.prompt();
                }
            })
        }

    }
);
rl.on('close',()=>{
    console.log('Correct!!');
});
//File System Module
const fs= require('fs');
fs.writeFile('example.txt','This is an example',(err)=>{
    if(err){
        console.log('error');
    }
    else{
        console.log('file successfully created');
        fs.readFile('example.txt','utf8',(err,file)=>{
            if(err){
                console.log('error');
            }
            else{
                console.log(file);
            }
        })
    }
})

fs.rename('example.txt','example2.txt', (err)=>{
   if(err){
       console.log(err);
   }
   else{
       console.log('successfully renamed file');
   }
})
fs.appendFile('example2.txt','Some data being appended',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully appended data to file');
    }
})
fs.unlink('example2.txt',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully deleted file');
    }
})
 fs.mkdir('tutorial',(err)=>{// folder creation and multiple file creation within folder
    if(err){
        console.log(err);
    }
    else{
        fs.writeFile('./tutorial/example.txt','123', (err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Successfully Created File');
            }
        })
        fs.writeFile('./tutorial/example2.txt','456',(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Successfully Created File');
            }
        })
        console.log('folder successfully created');
    }
})

fs.unlink('./tutorial/example.txt',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        fs.rmdir('tutorial',(err)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log('Successfully deleted folder and file within the folder');
            }
        })
    }
})
fs.rmdir('tutorial',(err)=>{ // folder deletion
    if(err){
        console.log(err);
    }
    else{
        console.log('folder successfully deleted');
    }
})
fs.readdir('tutorial',(err,files)=>{//delete multiple files within the folder
    if(err){
        console.log(err);
    }
    else{
        console.log(files);
        for(let file of files){
            fs.unlink('./tutorial/'+file, (err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(file+' has been successfully deleted');
                }
            })
        }
    }
})
const fs= require('fs');
const readStream = fs.createReadStream('example.txt', 'utf-8');
const writeStream = fs.createWriteStream('example2.txt')
readStream.on('data', (chunk)=>{
    console.log(chunk);// on getting chunk we can manipulate it 
    // sending data to a new file while reading it. Hence chunk is useful
    writeStream.write(chunk);

}) //alternative is pipe chaining
//Need to use Streams - For large files, using readFile doesn't help because a buffer of such big size 
// is not present. 

/*Pipes and Pipes Chaining */
readStream.pipe(writeStream); 
//Pipe Chainling

const zlib = require('zlib');
const gzip = zlib.createGzip();// creating zip file
const writeStream = fs.createWriteStream('example2.txt.gz');
readStream.pipe(gzip).pipe(writeStream);

/*HTTP Module */
const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write('Hello World from Node.js');
        res.end();
    }
    else{
        res.write('Using some other domain');
        res.end();
    }
});
server.listen(3000);
/*Serving Static files using HTTP and File System Module */
const http = require('http');
const fs= require('fs');
const { type } = require('os');
const server = http.createServer((req,res)=>{
    const readStream = fs.createReadStream('./static/example.json');
    res.writeHead(200, {'Content-type':'application/json'})
    readStream.pipe(res);
}).listen(3000);

/*
Server static file serving using express.js
const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.send('Hello World');
    
});
app.get('/example',(req,res)=>{
    res.send('Example route');
});
app.get('/example/:name/:age',(req,res)=>{
    console.log(req.params);
    console.log(req.query);//http://localhost:3001/example/bidisha/25?tutorials=pa
    res.send('example with route params with name :'+ req.params.name +' age: '+req.params.age);
    
})
app.listen(3001);
*/
/*Server on express.js*/

const express = require ('express');
const path = require ('path');
const app = express();
app.use('/public',express.static(path.join(__dirname,'static')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','index.html'))
});
app.listen(3000);
