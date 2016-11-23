/*
 * @Author: star 
 * @Date: 2016-10-26 09:29:54 
 * @Last Modified by: star
 * @Last Modified time: 2016-11-17 18:54:07
 */

const https = require('https');
const fs = require('fs');
const app = require('koa')();
const args = require('minimist')(process.argv.slice(2));

const Router = require('./router');
const authenticate = require('./filter/authenticate');

// project enviroment to build
process.env.NODE_ENV = args.env || 'dev';

console.log('Scan api files to create router table ...')

// create router table
const router = Router({
  api: 'api',
  resources: ['assets', 'static', '.well-known'],
  filter: [authenticate]
});

app.use(router.routes())
  .on('error', function (err, ctx) {
    console.log(err);
  });

console.log('Starting server ...')

https.createServer({
  ca: fs.readFileSync('./.ssl/ca.crt'),
  key: fs.readFileSync('./.ssl/smilplex.key'),
  cert: fs.readFileSync('./.ssl/smilplex.crt'),
  passphrase: '1234'
}, app.callback()).listen(443);

console.log('Waiting request ...')