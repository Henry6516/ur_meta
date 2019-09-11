var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://58.246.226.254:8089/v1"'
  BASE_API: '"http://192.168.0.7/v1"'

})
