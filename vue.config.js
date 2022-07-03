'use strict'
const clientTheme = process.env.VUE_APP_CLIENT
const variables = `@import "@/styles/variables.scss";`
const theme = `@import "@/styles/${clientTheme}/client-themes.scss";`
console.log('theme', theme)
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  css: {
    loaderOptions: {
      sass: {
        prependData: theme + variables
      }
    }
  }
}
