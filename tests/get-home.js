var graph = require('../index.js');
var uid = ''; 
var params = {
  access_token : ''
}
graph.getHome(uid, params, function(e, data){
  console.log(data);
});
