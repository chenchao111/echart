const request = require('request')
function myRequest(options) {
  return new Promise((resolve, reject) => {
    const _default = {
      url: '',
      method: 'get',
      headers: {},
      body: {}
    }
    for ( let attr in options) {
      if (options.hasOwnProperty(attr)) {
        _default[attr] =  options[attr]
      }
    }
    console.log('_default: ', _default)
    request({
      url: _default.url,
      method: _default.method,
      json: true,
      headers: {
          "content-type": "application/json",
          ..._default.headers
      },
      body: JSON.stringify(_default.body)
    }, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(err)
      }
    })
  })
}
module.exports = myRequest