const conn = new Mongo();
db = conn.getDB('smile');
db.auth('root', '');

db.createCollection('user', {
  validator: {
    $and: [
      { UserID: { $type: 'string' } },
      { OAuthID: { $type: 'string' } },
      { OAuthType: { $in: ['weixin'] } }
    ]
  },
  validationAction: 'error',
  validationLevel: 'strict'
});
