const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    db: 'grocerskart_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.YOUTIMO_EMAIL_USERNAME,
            pass: process.env.YOUTIMO_EMAIL_PASSWORD
        }
    },
    jwt_secret: process.env.YOUTIMO_JWT_SECRET,
    supremeLeader: process.env.YOUTIMO_SUPREME_LEADER,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


const production =  {
    name: 'production',
    db: process.env.YOUTIMO_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.YOUTIMO_EMAIL_USERNAME,
            pass: process.env.YOUTIMO_EMAIL_PASSWORD
        }
    },
    jwt_secret: process.env.YOUTIMO_JWT_SECRET,
    supremeLeader: process.env.YOUTIMO_SUPREME_LEADER,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

// module.exports = development;
//module.exports = production;
module.exports = eval(process.env.YOUTIMO_ENVIRONMENT) == undefined ? development : eval(process.env.YOUTIMO_ENVIRONMENT);
