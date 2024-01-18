import * as fs from 'fs';
import helper from 'csvtojson';

const fileNameCsv = 'file.csv';
const fileNameTxt = 'file.txt';
const path = 'src/hw-1';
const csvPath = `${path}/${fileNameCsv}`;
const txtPath = `${path}/${fileNameTxt}`;

const errorHandler: (error: Error) => void = (error: Error) => console.log('Something has been wrong', error.message);
const successHandler: () => void = () => console.log(`The file ${fileNameCsv} has been converted to ${fileNameTxt} succesfully`);

const readStream: fs.ReadStream = fs.createReadStream(csvPath);
const writeStream: fs.WriteStream = fs.createWriteStream(txtPath);

readStream
    .on('error', errorHandler)
    .pipe(helper())
    .on('error', errorHandler)
    .on('end', successHandler)
    .pipe(writeStream)
