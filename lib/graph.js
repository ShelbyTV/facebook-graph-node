/*
 * Simple Facebook Graph API
 */

var https = require('https')
, querystring = require('querystring');

module.exports = {

  agent : https.getAgent('graph.facebook.com', 80),

  host : 'graph.facebook.com',

  _makeRequest : function(httpOpts, cb){
    var req = https.request(httpOpts, function(res){
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function(d){
        data += d;
      });
      res.on('end', function(){
        try{
          data = JSON.parse(data);
        } catch (e){
          console.log('non-JSON response');
          return cb(null, data);
        }
        cb(null, data);
      });
    });
    req.end();
  },

  _makeGet : function(path, params, cb){
    var self = this; 
    var httpOpts = {
      agent : self.agent,
      method : 'GET',
      host : this.host,
      path : '/'+path+((params) ? '?'+querystring.stringify(params): '')
    };
    this._makeRequest(httpOpts, cb);
  },

  getAccessToken : function(params, cb){
    this._makeGet('oauth/access_token', params, function(e, data){
      return cb(e, querystring.parse(data));
    });
  },

  getHome : function(user_id, params, cb){
    this._makeGet(user_id+'/home', params, cb);
  },

  getMe : function(access_token, cb){
    this._makeGet('me', {access_token : access_token}, cb);
  }
};
