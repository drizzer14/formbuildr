module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    '@babel/preset-react',
    ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  ignore: ['src/**/*.d.ts'],
};
