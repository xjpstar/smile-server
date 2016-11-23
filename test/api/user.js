var assert = require('chai').expect;
var User = require('../../src/api/user');

describe('user',function(){
  it('should return data',function(){
    let data = User.get()
    expect(data).to.not.be.null;
  })
})