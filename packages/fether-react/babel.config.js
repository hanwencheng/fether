module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'inline-import-data-uri'
  ],
  presets: ['@babel/preset-env', '@babel/preset-react']
};
