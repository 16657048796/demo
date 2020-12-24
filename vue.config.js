// const path=require("path")

// function resolve(dir){
// 	return path.join(__dirname,dir)
// }
const path = require("path");
function resolveFile(dir) {
  return path.join(__dirname, dir);
}


module.exports  = { 
	//基本路径
	publicPath:process.env_Node_ENV === 'production' ? '':'/',
	lintOnSave:false,//是否开启语法检测
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true, 
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: `@import "./src/styles/theme.scss";`
			}
		},
	},
	// chainWebpack:config=>{
	// 	config.resolve.alins.set("@c",resolve("src/component"))
	// }
	chainWebpack: config => {
		config.resolve.alias
		.set("@", resolveFile("src"))
		.set("@a", resolveFile("src/assets"))
		.set("@c", resolveFile("src/components"))
		.set("b", resolveFile("baseConfig"))
		.set("p", resolveFile("public"));
	},
	//配置解析svg的loader
	chainWebpack:(config)=>{
		const svgRule = config.module.rule("svg");     
		svgRule.uses.clear();     
		svgRule       
		  .use("svg-sprite-loader")       
		  .loader("svg-sprite-loader")       
		  .options({         
		    symbolId: "icon-[name]",         
		    include: ["./src/icons"]       
		  });
	},
	//配置目录的别名
	// configureWebpack:(config) => {
	// 	config.resolve = {
	// 		extensions:['.js','.json','.vue'],//引入文件的时候不写后缀名。默认先加载的文件类型
	// 		alias:{
	// 			'@':path.resolve(__dirname,'./src'),
	// 			'@c':path.resolve(__dirname,'./src/components'),
	// 			'@a':path.resolve(__dirname,'./src/assets'),
	// 			'public':path.resolve(__dirname,'./public'),
	// 			vue$:"vue/dist/vue.esm.js"
	// 		}
	// 	}
	// },

	devServer: {
		port : 8080 , //本地node端口
		open:true,//启动项目会自动打开浏览器
		proxy: {
			'/devApi': {     //这里最好有一个 /
				target: 'http://www.web-jshtml.cn/productapi/token',  // 后台接口域名
				// ws: true,        //如果要代理 websockets，配置这个参数
				// secure: false,  // 如果是https接口，需要配置这个参数
				changeOrigin: true,  //是否跨域
				pathRewrite:{
					'^/devApi':''
				}
			}
		}
	  }
	  
}