const fs = require('fs')
const path = require('path')
const util = require('util')
const globby = require('globby')
// Node v8.5.0+
const copyFile = util.promisify(fs.copyFile)
;(async () => {
  const files = await globby(
    'node_modules/material-design-icons/*/svg/production/*_24px.svg'
  )

  const names = await files.map(file => {
    const name = path.basename(file, '.svg')
    let newName = name.replace(/(^ic_)|(_24px$)/g, '')
    // 文件名将用做标识符，不能以数字开头(仅有一个，`3d_rotation`)
    if (/^\d+/.test(newName)) {
      newName = 'Md' + newName
    }
    copyFile(file, path.resolve(__dirname, '../icons', newName + '.svg'))
  })

  // NOTE: 还有一个重复（`rv_hookup`），因为名称和内容都相同，所以不影响结果：
  // https://github.com/google/material-design-icons/issues/267
  // material-design-icons/notification/svg/production/ic_rv_hookup_24px.svg
  // material-design-icons/places/svg/production/ic_rv_hookup_24px.svg
})()
