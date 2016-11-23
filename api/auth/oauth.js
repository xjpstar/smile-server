const security = require('../../cfg/security');

module.exports.get = function (oauthCode) {

  let redirectUri = encodeURIComponent('http://www.smilplex.com/api/auth/token/weixin');
  let scope = 'snsapi_userinfo'; // snsapi_base(只能获取openid) 
  let state = ''; // a-zA-Z0-9 最多128字节

  return [
    {
      href: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${security.WEIXIN_APPID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`,
      logoUrl: '/assets/images/login_weixin.png'
    },
    {
      href: '/',
      logoUrl: '/assets/images/login_qq.png'
    },
    {
      href: '/',
      logoUrl: '/assets/images/login_sina.png'
    }
  ];
}

module.exports.ignorefilter = ['authenticate'];