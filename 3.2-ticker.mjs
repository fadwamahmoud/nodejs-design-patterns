import EventEmitter from "events";

function ticker(num, cb){

    const emitter = new EventEmitter();
    let count = 0

    let timer = setTimeout(function fifty(){
        count++;
        emitter.emit('tick', count)
        timer = setTimeout(fifty, 50)
    }, 50)

    setTimeout(()=> {

  
        clearTimeout(timer)
        
        cb(count)

    }, num)
        
    return emitter
      

}

const emitter = ticker(1000, (count)=> console.log({count}))

emitter.on('tick', (count)=>{

    console.log(`this is tick`, {count})

})