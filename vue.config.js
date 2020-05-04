module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    publicPath:'',
    devServer: {
      proxy: 'https://immense-thicket-40687.herokuapp.com'
    }
}
