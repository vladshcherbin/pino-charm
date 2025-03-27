import config from '@shcherbin/eslint-config'

export default [
  ...config.nodeTypescript,
  {
    rules: {
      'import-x/extensions': 'off'
    }
  }
]
