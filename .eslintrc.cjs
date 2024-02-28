module.exports = {
  extends: '@shcherbin/eslint-config-node-typescript',
  parserOptions: {
    EXPERIMENTAL_useProjectService: true,
    tsconfigRootDir: __dirname
  },
  root: true
}
