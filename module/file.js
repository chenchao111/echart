const fs = require('fs')

function read(dir){
  return new Promise((resolve,reject)=>{
      fs.readFile(dir,'utf-8',(err,data)=>{
          if(err){
              reject(err)
          }else{
              resolve(JSON.parse(data))
          }
      })
  })
}

function write(filename, data) {
  return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, {encoding : 'utf8'}, (err, res) => {
          if (err) {
              reject(err)
          }
          resolve(res)
      });

  })
}

module.exports = {
  read,
  write
}
