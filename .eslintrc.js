module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    // 'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ["warn", "error"] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-mixed-spaces-and-tabs": 0,
    "vue/html-self-closing": "off", // Fix v-for/template/key bug
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
