const path = require('path')
    // const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js']

module.exports = {
    publicPath: '/h5/', // 根域上下文目录
    devServer: { // 环境配置
        host: '0.0.0.0',
        port: 8089,
        open: false, //配置自动启动浏览器

    },
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        plugins: [
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

                // 下面是下载的插件的配置
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new webpack.optimize.LimitChunkCountPlugin({
                    maxChunks: 5,
                    minChunkSize: 100
                })
            ],
        performance: {
	    	hints:'warning',
	    	maxEntrypointSize: 50000000,
	    	maxAssetSize: 30000000,
	    	assetFilter: function(assetFilename) {
	    		return assetFilename.endsWith('.js');
	    	}
	    }
            // Object.assign(config, { // 开发生产共同配置
            //     resolve: {
            //         alias: {
            //             '@': path.resolve(__dirname, './src'),
            //             '@c': path.resolve(__dirname, './src/components'),
            //             'vue$': 'vue/dist/vue.esm.js'
            //         }
            //     }
            // })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (config) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    }

}