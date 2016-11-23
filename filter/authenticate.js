module.exports = function authenticate() {
  // TODO: 判断是否已登录
  let isLogin = true;
  if (isLogin) {

  } else {
    this.redirect('/');
    return false;
  }
}