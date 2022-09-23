// const CracoLessPlugin = require("craco-less");
// plugins: [
//   {
//     plugin: CracoLessPlugin,
//     options: {
//       lessLoaderOptions: {
//         lessOptions: {
//           modifyVars: { "@primary-color": "#1DA57A" },
//           javascriptEnabled: true,
//         },
//       },
//     },
//   },
// ],
module.exports = {

  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
