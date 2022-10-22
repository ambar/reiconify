const fsp = require('fs/promises')
const path = require('path')
const prompts = require('prompts')

const resolveCli = path.resolve.bind(null, __dirname, '..')
const hasFile = (file) =>
  fsp.stat(file).then(
    () => true,
    () => false
  )

const ensureTemplate = async (root) => {
  const templateDir = resolveCli('docs/template')
  const filesToCheck = ['index.html', 'public/favicon.ico']
  const toDest = (x) => path.resolve(root, x)
  const toDestRelative = (x) => path.relative(process.cwd(), toDest(x))

  const filesToCopy = []
  for (const file of filesToCheck) {
    if (!(await hasFile(toDest(file)))) {
      filesToCopy.push(file)
    }
  }
  if (!filesToCopy.length) {
    return
  }

  const {shouldCopyFiles} = await prompts(
    {
      type: 'confirm',
      name: 'shouldCopyFiles',
      message: `reiconify needs template files, do you want to create them? (${filesToCopy
        .map(toDestRelative)
        .join(', ')}`,
    },
    {onCancel: process.exit}
  )
  if (shouldCopyFiles) {
    for (const file of filesToCopy) {
      const fromFile = path.resolve(templateDir, file)
      const toFile = toDestRelative(file)
      console.info('Adding', toFile)
      await fsp.mkdir(path.dirname(toFile), {recursive: true})
      await fsp.copyFile(fromFile, toFile)
    }
  } else {
    process.exit(0)
  }
}

exports.ensureTemplate = ensureTemplate
