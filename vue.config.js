// const path=require("path")

// function resolve(dir){
// 	return path.join(__dirname,dir)
// }
const path = require("path");
function resolveFile(dir) {
  return path.join(__dirname, dir);
}


module.exports  = { 
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
		}
}