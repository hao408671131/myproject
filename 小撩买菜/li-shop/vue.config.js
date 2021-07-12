
module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
             '/api': {
                 target: 'http://localhost:3000/web/xlmc',
                 changeOrigin: true,
                 pathRewrite: {
                     '^/api': ''
                 }
             },

            // 支付已经部署到线上，不需要进行跨域操作
            '/pay': {
                target: 'http://47.98.157.152/WXPayProject/pay',
                changeOrigin: true,
                pathRewrite: {
                    '^/pay': ''
                }
            }
        }
    }
};