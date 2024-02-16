module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@app': './src/app',
          '@src': './src',
          '@': './src',
          '/': '.',
        },
      },
    ],
  ],
};
