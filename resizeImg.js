const fs = require('fs');
const path = require('path');
const img = require('images');

fs.readdir('./static/img/20160822', (err,files)=>{
  console.log(files)
  files.forEach(value=>{
    img(path.resolve('./static/img/20160822',value)).resize(240).save(path.resolve('./tmp',value))
  })
})
