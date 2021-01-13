
module.exports = api => {

	api.registerCommand('publish', args => {
		// 拷贝dist文件夹下的东西，到：
		// /Users/hongjue/Desktop/course/正课第十节--vue-cli/online
		// xxxx -> xxxx
		const webpackConfig = api.resolveWebpackConfig();
		console.log('webpackConfig:', webpackConfig);
	});

};