module.exports = {
  presets: ['@vue/app'],
  resolve: {
    alias: {
      icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons')
    },
    extensions: ['.vue']
  }
};
