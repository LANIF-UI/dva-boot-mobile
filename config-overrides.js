const path = require("path");
const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less-modules");

module.exports = function override(config, env) {
  config.resolve = {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets")
    }
  };

  if (env === "development") {
    config = injectBabelPlugin(["dva-hmr"], config);
  } else {
    config.output.publicPath = "/"; // 实际跟据项目设置
  }

  config = injectBabelPlugin("transform-decorators-legacy", config);

  // 如果用了antd的话可以配置按需加载
  config = injectBabelPlugin(
    ["import", { libraryName: "antd-mobile", style: "css" }],
    config
  );

  config.externals = {};

  config.plugins.push();

  // 如果用了antd的话可以修改皮肤
  return rewireLess.withLoaderOptions(
    `${env === "production" ? "app" : "[local]"}-[hash:base64:8]`,
    {
      modifyVars: {}
    }
  )(config, env);
};
