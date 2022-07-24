'use strict'
const clientTheme = process.env.VUE_APP_CLIENT
const gql = process.env.VUE_APP_GRAPHQL_HTTP
const variables = `@import "@/styles/variables.scss";`
const theme = `@import "@/styles/${clientTheme}/client-themes.scss";`
module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static/',
  css: {
    loaderOptions: {
      sass: {
        prependData: theme + variables
      }
    }
  },
  devServer: {
    port: 9528,
    proxy: gql
  }
}
