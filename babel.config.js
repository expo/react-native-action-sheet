module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@expo/react-native-action-sheet": "./js"
        },
        cwd: "babelrc"
      }
    ]
  ]
}
