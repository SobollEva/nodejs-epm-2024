import { stdin, stdout } from 'node:process';
import { Stream } from 'stream';

function getReversData(data: string){
    return data.split('').reverse().join('') + '\r\n';
}

class ReversStream extends Stream.Transform {
    _transform(chunk, encoding, callback) {
        callback(null, getReversData(chunk.toString('utf-8')));
    }
    
}

stdin
.pipe(new ReversStream())
.on('error', console.error)
.pipe(stdout);
 