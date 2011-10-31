/*
 * Simple Facebook Graph API
 */

var https = require('https')
, querystring = require('querystring');

module.exports = {

  host : 'graph.facebook.com',

  _makeRequest : function(httpOpts, cb){
    var req = https.request(httpOpts, function(res){
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function(d){
        console.log('got data');
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
    var httpOpts = {
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