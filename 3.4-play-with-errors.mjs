import { EventEmitter } from "events";

const ticker = (num, cb) => {
    const emitter = new EventEmitter();
    const err = new Error("Timestamp non-divisible by 5")


    setImmediate(() => emitter.emit('tick', count))
    if(!Boolean(Date.now()%5)){
        emitter.emit('error', err);
        cb(err)
    }
    let count = 0;

    
    let timer = setTimeout(function fifty(){
    
        count++;
       
        if(!Boolean(count%5)){
            emitter.emit('error', err);
            cb(err)
    
        }
        emitter.emit('tick', count);
        if(!Boolean(Date.now()%5)){
            emitter.emit('error', err);
            cb(err)
        }
        timer = setTimeout(fifty,50);
    
    },50)

    setTimeout( () => {
        clearTimeout(timer)
        cb(null, count)} , num)

    return emitter;

}

const emitter = ticker(1000, (err, data)=> console.log({err},{data}))

emitter.on('tick', (count)=> console.log(count)).on('error', (err)=> console.log(err))