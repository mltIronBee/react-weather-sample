const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	webpackFinal: (config) => {
		const appSrc = path.resolve(__dirname, "../src");

		Object.assign(config.resolve, {
			alias: {
				...config.resolve.alias,
				src: appSrc,
				"@src": appSrc,
				"@components": path.resolve(appSrc, "components"),
				"@containers": path.resolve(appSrc, "containers"),
				"@redux": path.resolve(appSrc, "redux"),
				"@services": path.resolve(appSrc, "services"),
				"@utils": path.resolve(appSrc, "utils"),
			},
		});

		return config;
	},
};
