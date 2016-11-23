var authorize = require('../../filter/authorize');

module.exports.get = function () {
  // 通过某个属性 判断能否使用该接口
  return { "src": "/assets/img/img_001.jpg", "width": 352, "height": 3220 };
}

module.exports.filter = [authorize]

module.exports.ignorefilter = ['authorize']
