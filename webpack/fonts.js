module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.(svg|ttf|eot|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          },
        },
      ],
    },
  };
};
