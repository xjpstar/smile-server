var http = require('http');
var fs = require('fs');

module.exports.put = function (userId, mediaids) {
  mediaids.forEach(value => {
    http.get('https://api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID', res => {
      fs.write();
    })
  })
}