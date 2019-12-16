  
const path    = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    devServer: {
      proxy: {
        '/token': {
          target: 'https://account.kkbox.com/oauth2/token',
          ws: true,
          changeOrigin: true,
        },
      },
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('api', resolve('src/api'))
            .set('styles', resolve('src/assets/styles'))
            .set('util', resolve('src/util'))
    },
  };