module.exports.get = function (userName, encryptToken) {
  // 每次打开登录页面的时候 都获取一个带时间戳的 随机token  然后利用这个token 进行密码加密传输  服务器收到数据后 进行解密 验证相关信息  在数据库存的时候 加个solt值 然后加密存储
  //  这样 可以防止加密后的密码被保存 再次使用
  // 无法确定token来源及匹配对象 如果在cookie中带有sessionID 就可以唯一确定目的
  // 服务器验证通过后生成一个 带有时间戳的token 以证明该用户已经登录 获取数据生成token
  this.cookies.set('tokendd', 'world', {
    httpOnly: true 
  });
  return 'world';
}

// module.exports.get = function () {
//   // 首次访问的时候 生成一个cookieID 以及一个随机token 然后在服务器保存一份对应表 每次刷新页面 都必须要刷新这个token
// }

// expires: 
// Cookie.prototype.expires = undefined;
// Cookie.prototype.domain = undefined;
// Cookie.prototype.httpOnly = true;
// Cookie.prototype.secure = false;
// Cookie.prototype.overwrite = false;