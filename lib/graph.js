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
          return cb(e, null);
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

  getHome : function(user_id, params, cb){
    this._makeGet(user_id+'/home', params, cb);
  }

};
