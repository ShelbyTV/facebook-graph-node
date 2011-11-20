var graph = require('../index.js');

var path = 'https://graph.facebook.com/oauth/access_token?';
var auth_params = {
  client_id : config.facebook.client_id,
  redirect_uri : config.facebook.redirect_uri,
  client_secret : config.facebook.client_secret,
  code : req.query.code
};

var url = path + qs.stringify(auth_params);
graph.getAccessToken(uid, params, function(e, data){
  console.log(data);
});
