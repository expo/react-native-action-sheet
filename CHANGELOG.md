# Changelog

## [4.1.0](https://github.com/expo/react-native-action-sheet/compare/v4.0.1...v4.1.0) (2024-05-15)


### Features

* update peer dep ([#324](https://github.com/expo/react-native-action-sheet/issues/324)) ([bc33f9f](https://github.com/expo/react-native-action-sheet/commit/bc33f9f4d0c171ff17c098f94fab1b22ed6816ed))


### Bug Fixes

* use release-please instead of semantic release ([#300](https://github.com/expo/react-native-action-sheet/issues/300)) ([b35a403](https://github.com/expo/react-native-action-sheet/commit/b35a403a213d596252ec5e8a20db5291396fafc0))

## [4.0.1](https://github.com/expo/react-native-action-sheet/compare/v4.0.0...v4.0.1) (2022-11-04)


### Bug Fixes

* expose ref on ActionSheetProvider for statically invoking ([#283](https://github.com/expo/react-native-action-sheet/issues/283)) ([b2f5f43](https://github.com/expo/react-native-action-sheet/commit/b2f5f433ff2070c77fdd62b273d2d80e636efd3a))

# [4.0.0](https://github.com/expo/react-native-action-sheet/compare/v3.14.0...v4.0.0) (2022-10-26)


### Features

* iOS use custom action sheet ([#281](https://github.com/expo/react-native-action-sheet/issues/281)) ([372dc80](https://github.com/expo/react-native-action-sheet/commit/372dc8065006a4da510ef5f31c27225d14a71ff3))


### BREAKING CHANGES

* This implementation is backwards compatible, but just to be safe I'm marking this as breaking so that it bumps the major version.

# [3.14.0](https://github.com/expo/react-native-action-sheet/compare/v3.13.1...v3.14.0) (2022-10-03)


### Features

* support cancelButtonTintColor ([#278](https://github.com/expo/react-native-action-sheet/issues/278)) ([2dcd54c](https://github.com/expo/react-native-action-sheet/commit/2dcd54c56f35a64c66f8d9a7d09a9475801cf037))

## [3.13.1](https://github.com/expo/react-native-action-sheet/compare/v3.13.0...v3.13.1) (2022-10-03)


### Bug Fixes

* add return type to connectActionSheet ([#273](https://github.com/expo/react-native-action-sheet/issues/273)) ([f46a5cf](https://github.com/expo/react-native-action-sheet/commit/f46a5cfc473807478c558a733c8adb1440941017))

# [3.13.0](https://github.com/expo/react-native-action-sheet/compare/v3.12.0...v3.13.0) (2022-01-10)


### Bug Fixes

* defer calling onSelect until after animation ([#248](https://github.com/expo/react-native-action-sheet/issues/248)) ([1fb3411](https://github.com/expo/react-native-action-sheet/commit/1fb3411f575b4fa1cb762a804fc38cf3e2a5c73b)), closes [#203](https://github.com/expo/react-native-action-sheet/issues/203)
* stabilize the identity of the context provider value ([#251](https://github.com/expo/react-native-action-sheet/issues/251)) ([55005ba](https://github.com/expo/react-native-action-sheet/commit/55005ba0fb4bc6aff546390cf324619bf2e0ed2a))


### Features

* support closing actionsheet with Esc key on web ([#247](https://github.com/expo/react-native-action-sheet/issues/247)) ([c4c3f8b](https://github.com/expo/react-native-action-sheet/commit/c4c3f8b873d76ff40daf8d2061d9f43346a3577f)), closes [#194](https://github.com/expo/react-native-action-sheet/issues/194)

# [3.12.0](https://github.com/expo/react-native-action-sheet/compare/v3.11.0...v3.12.0) (2021-10-14)


### Bug Fixes

* use correct callback type allowing for undefined `i` ([#239](https://github.com/expo/react-native-action-sheet/issues/239)) ([b54b9f1](https://github.com/expo/react-native-action-sheet/commit/b54b9f16c251cb2ca5f1bd41ca7cc41b1393c6b3))


### Features

* adds support for disabledButtonIndices ([#246](https://github.com/expo/react-native-action-sheet/issues/246)) ([feed1f7](https://github.com/expo/react-native-action-sheet/commit/feed1f78b4c85855d48c1742fe9f8a67c0604609)), closes [#224](https://github.com/expo/react-native-action-sheet/issues/224)

# [3.11.0](https://github.com/expo/react-native-action-sheet/compare/v3.10.0...v3.11.0) (2021-09-07)


### Bug Fixes

* yarn lock issues ([#238](https://github.com/expo/react-native-action-sheet/issues/238)) ([22fc214](https://github.com/expo/react-native-action-sheet/commit/22fc2144b3ce3b5fc1892eefd86f484dc1af58e9))


### Features

* default useModal to true when autoFocus is set ([688fd47](https://github.com/expo/react-native-action-sheet/commit/688fd47227dab6994b59ed85af622cb04ebed220))

# [3.10.0](https://github.com/expo/react-native-action-sheet/compare/v3.8.0...v3.10.0) (2021-08-09)

### Features
* Allow multiple destructive indices ([#210](https://github.com/expo/react-native-action-sheet/issues/210)) ([81112b9](https://github.com/expo/react-native-action-sheet/commit/81112b9553dc34725e2708b02b64b7a5e5c57509))

# [3.9.0](https://github.com/expo/react-native-action-sheet/compare/v3.8.0...v3.9.0) (2021-03-12)


### Bug Fixes

* allow callback to be async ([#183](https://github.com/expo/react-native-action-sheet/issues/183)) ([d0d5182](https://github.com/expo/react-native-action-sheet/commit/d0d518278028556a80deec3d9b57c332b82ba28d))
* center icons with titles ([#188](https://github.com/expo/react-native-action-sheet/issues/188)) ([d48c323](https://github.com/expo/react-native-action-sheet/commit/d48c323e4563363c8683c427d1803e1ff4cddcb5))


### Features

* add `userInterfaceStyle` option for iOS ([#206](https://github.com/expo/react-native-action-sheet/issues/206)) ([735cfa5](https://github.com/expo/react-native-action-sheet/commit/735cfa54ba1bfd90139671489aca525fdbd59626))

# [3.8.0](https://github.com/expo/react-native-action-sheet/compare/v3.7.0...v3.8.0) (2020-05-19)


### Features

* Add destructiveColor option ([#171](https://github.com/expo/react-native-action-sheet/issues/171)) ([5549e36](https://github.com/expo/react-native-action-sheet/commit/5549e36a92d8afcc0ce2bf6a601e83209b5ce080))
* Improvements to Android accessibility ([#168](https://github.com/expo/react-native-action-sheet/issues/168)) ([b605fb8](https://github.com/expo/react-native-action-sheet/commit/b605fb8a3b6421c244f7f18d934bb5ea0753d461))

# [3.7.0](https://github.com/expo/react-native-action-sheet/compare/v3.6.0...v3.7.0) (2020-05-06)


### Features

* adds `useModal` prop wrap action sheet in a modal ([9ed955d](https://github.com/expo/react-native-action-sheet/commit/9ed955dbba7259cbcf5e31ef3d4ed091ae4a3145)), closes [#169](https://github.com/expo/react-native-action-sheet/issues/169)

# [3.6.0](https://github.com/expo/react-native-action-sheet/compare/v3.5.0...v3.6.0) (2020-03-30)


### Bug Fixes

* Android 'Super expression must either be null or a function' ([37156da](https://github.com/expo/react-native-action-sheet/commit/37156dacf114aa5146da153db9ee00c1aea8eaca))


### Features

* Add accessibility label to Action options ([#158](https://github.com/expo/react-native-action-sheet/issues/158)) ([bc3c27d](https://github.com/expo/react-native-action-sheet/commit/bc3c27d767a5657032b73f70aa1aacfea0481f66))

# [3.5.0](https://github.com/expo/react-native-action-sheet/compare/v3.4.1...v3.5.0) (2020-02-04)


### Features

* add anchor option for iPads ([#155](https://github.com/expo/react-native-action-sheet/issues/155)) ([370e6e8](https://github.com/expo/react-native-action-sheet/commit/370e6e855fbacbfc683cc6ab16304f26c159e6b5))

## [3.4.1](https://github.com/expo/react-native-action-sheet/compare/v3.4.0...v3.4.1) (2019-12-13)


### Bug Fixes

* **iOS:** crash when using Android only options ([#144](https://github.com/expo/react-native-action-sheet/issues/144)) ([8016008](https://github.com/expo/react-native-action-sheet/commit/8016008781cbe418dc03f04a324d5e5ef5bcdaa7))

# [3.4.0](https://github.com/expo/react-native-action-sheet/compare/v3.3.2...v3.4.0) (2019-11-19)


### Features

* **android:** allow customizing container styles ([#142](https://github.com/expo/react-native-action-sheet/issues/142)) ([39fc431](https://github.com/expo/react-native-action-sheet/commit/39fc431c97cb0ec03ab2a8386bd1b836d9f1cd2f))
* Allow pointerEvents prop to pass through to containing view ([#124](https://github.com/expo/react-native-action-sheet/issues/124)) ([76397fa](https://github.com/expo/react-native-action-sheet/commit/76397fa7c4bff7318780ac72600156d753fad3f0))
