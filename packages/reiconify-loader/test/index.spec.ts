import compiler from './compiler'

test('compiler svg', async () => {
  const stats = await compiler('./icons/check.svg?react')
  const output = stats.toJson({source: true})?.modules?.[0]?.modules?.[0].source
  expect(output).toMatchSnapshot()
})

test('compiler svg for RN with default', async () => {
  const stats = await compiler('./icons/check.svg?react', {native: true})
  const output = stats.toJson({source: true})?.modules?.[0]?.modules?.[0].source
  expect(output).toMatchSnapshot()
})

test('compiler svg for RN with base-icon', async () => {
  const stats = await compiler('./icons/check.svg?react', {
    native: true,
    baseName: 'base-icon',
  })
  const output = stats.toJson({source: true})?.modules?.[0]?.modules?.[0].source
  expect(output).toMatchSnapshot()
})

test('compiler svg for RN with empty base', async () => {
  const stats = await compiler('./icons/check.svg?react', {
    native: true,
    baseName: '',
  })
  const output = stats.toJson({source: true})?.modules?.[0]?.modules?.[0].source
  expect(output).toMatchSnapshot()
})
