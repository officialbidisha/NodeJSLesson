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
christina.emit('name');//Synchronous execution of events occur in node.js

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
/*fs.writeFile('example.txt','This is an example',(err)=>{
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
})*/

/*fs.rename('example.txt','example2.txt', (err)=>{
   if(err){
       console.log(err);
   }
   else{
       console.log('successfully renamed file');
   }
})*/
/*fs.appendFile('example2.txt','Some data being appended',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully appended data to file');
    }
})*/
/*fs.unlink('example2.txt',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('successfully deleted file');
    }
})*/

