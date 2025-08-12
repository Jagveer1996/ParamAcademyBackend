const log = require('node-file-logger');
const { folderPath, dateBasedFileNaming, fileNamePrefix, fileNameExtension, dateFormat, timeFormat } = require('node-file-logger/libs/config');

const options = {
    folderPath : "./logs/",
    dateBasedFileNaming : true,
    fileNamePrefix : "Logs_",
    fileNameExtension: ".log",
    dateFormat : "YYYY_MM_D",
    timeFormat : "h:mm:ss A"
}


log.SetUserOptions(options);