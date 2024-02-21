import compiler from './compiler'

test('compiler svg', async () => {
  const stats = await compiler('./icons/check.svg?react')
  const output = stats.toJson({source: true})?.modules?.[0]?.modules?.[0].source
  expect(output).toMatchSnapshot()
})

test('compiler svg for RN', async () => {
  const stats = await compiler('./icons/check.svg?react', true)
  const output = stats.toJson({source: true})?.modules?.[0]?.modules?.[0].source
  expect(output).toMatchSnapshot()
})
