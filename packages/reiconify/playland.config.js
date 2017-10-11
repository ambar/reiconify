module.exports = {
  title: require(`${process.cwd()}/package.json`).name,
  directory: require('path').join(__dirname, 'docs'),
  buildDirectory: 'dist',
}
