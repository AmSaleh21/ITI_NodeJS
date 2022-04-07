// import fs from
import fs from 'fs';
import readline from 'readline';

// Read file line by line
const rl = readline.createInterface({
    input: fs.createReadStream('./data.json'),
    crlfDelay: Infinity
})

rl.on('line', line => console.log(`read line, ${line} \n`))

/* 
create file with data and read it with sync
*/
//create file
fs.writeFileSync('./test-dir/syncWrite.txt'
    , 'line written in sync', (err,data) => {
        if(err)
            console.log(err);
    });

//read from file
let data = fs.readFileSync('./test-dir/syncWrite.txt')
console.log(data.toString());

/*
create file with data and read it with async
*/
//create file
fs.writeFile('./test-dir/asyncWrite.txt'
    , 'line written in async', (err,data) => {})

//read from file
fs.readFile('./test-dir/asyncWrite.txt'
    , (err,data) => {
        if(err){
            console.log(err);
        }else{
            console.log(data.toString());
        }
    })

//read data.json
fs.readFile('./data.json', (err,data) => {
    if(err)
        console.log(err);
    else
        console.log(JSON.parse(data));
})

//rename test.txt to file.info
//renames the file, then throws an err on next runs because file doesn't exist
    // fs.rename('./test-dir/test.txt', './test-dir/file.info', err => {
    //     console.log(err);
    // })

//remove file.info 
//deletes the file, then throws an err on next runs because file doesn't exist
    // fs.unlink('./test-dir/file.info', err => {
    //     if(err)
    //         console.log(err);
    // })

//create a directory
if (!fs.existsSync('bonus7')){
    fs.mkdirSync('bonus7')
}
