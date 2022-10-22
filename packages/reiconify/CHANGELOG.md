# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.4.0 (2022-10-22)

### Features

- use vite to serve icons, change JSX file extension to .jsx ([1411dc8](https://github.com/ambar/reiconify/commit/1411dc8d2369dfa08a7d37f21e50e36f8c96f535))

# 2.3.0 (2022-02-25)

### Features

- add template for index file ([ed079a0](https://github.com/ambar/reiconify/commit/ed079a0e71e2ecda9ce7ec601b827e9c24f83175))

## 2.2.2 (2021-01-28)

### Bug Fixes

- make transform compatible with ES5 ([12aa171](https://github.com/ambar/reiconify/commit/12aa1713053313937e0083962d4b5b668fd7d8d2))

## 2.2.1 (2021-01-28)

### Bug Fixes

- disable removeViewBox ([6dd9b53](https://github.com/ambar/reiconify/commit/6dd9b538230fb0af7725d68e833a97608553aa30))

# 2.2.0 (2021-01-27)

### Features

- add format option to transform ([4f09f02](https://github.com/ambar/reiconify/commit/4f09f022dc47c5229cd10ed1d7b61f1c09519c75))

# 2.1.0 (2021-01-27)

### Features

- disable prettier in transform API ([bc1feda](https://github.com/ambar/reiconify/commit/bc1feda05affa44d44a996dafb14c0b91dfcee8b))

# 2.0.0 (2021-01-23)

### Features

- use esbuild instead of babel ([eb9edea](https://github.com/ambar/reiconify/commit/eb9edea6dd75b16798373fa04576d61f64a4955e))

### BREAKING CHANGES

- migrate to esbuild

# 1.7.0 (2021-01-17)

### Features

- replace postcss-js with style-to-object ([d7540bc](https://github.com/ambar/reiconify/commit/d7540bc0a93721929be8a412fd2657e4d6df162b))
- use babel `transformAsync` ([f7b5028](https://github.com/ambar/reiconify/commit/f7b5028ff38836d19f5f6a0d0d6137006cfd3a98))

# 1.6.0 (2021-01-12)

### Features

- upgrade svgo ([16604aa](https://github.com/ambar/reiconify/commit/16604aa8dd5a3ba79715a8f8426ec5727d839923))

# 1.5.0 (2020-11-05)

### Features

- update prettier ([2e02c63](https://github.com/ambar/reiconify/commit/2e02c639080a8b2ddd82b159e02c4793b52a8aa6))

## 1.4.1 (2020-08-21)

# 1.4.0 (2020-08-20)

### Features

- ignore Babel config by default ([45ea22e](https://github.com/ambar/reiconify/commit/45ea22e471910c6550c52530a9d9207d9c8b48db))

## 1.3.1 (2018-11-29)

### Bug Fixes

- **reiconify:** convert namespaced attrs to camel case ([4d19f16](https://github.com/ambar/reiconify/commit/4d19f16ba9af57663c462657cb59ad9b91747834))

# 1.3.0 (2018-11-19)

### Features

- add reiconify-cli ([6570d81](https://github.com/ambar/reiconify/commit/6570d81046d258cb06e55eb71e3ff8594956b2a6))

## 1.2.2 (2018-11-16)

### Bug Fixes

- add babel.config.js to files filed package.json ([c6bc0c7](https://github.com/ambar/reiconify/commit/c6bc0c7b498bff995867988fc1c99432faac73bf))

## 1.2.1 (2018-11-16)

# 1.2.0 (2018-11-15)

### Features

- remove baseMapProps ([2779be7](https://github.com/ambar/reiconify/commit/2779be77f6fff55df8c3d105331d1ef80c6b1d9d))

## 1.1.1 (2018-11-15)

### Bug Fixes

- change base element name to SVG ([9afffd2](https://github.com/ambar/reiconify/commit/9afffd2fb9fc8c740b3abef124c09e77f3e6919e))

# 1.1.0 (2018-09-27)

### Features

- use `baseClassName` instead of `defaultClassName` ([b0ac001](https://github.com/ambar/reiconify/commit/b0ac001b7af27214107d8e68a548912a72def335))

## 1.0.1 (2018-09-21)

### Bug Fixes

- use babel.config.js in example ([51ac714](https://github.com/ambar/reiconify/commit/51ac7145c482d56b68fbf71395a7c8adab4d19f5))

# 1.0.0 (2018-09-21)

### Features

- add `useBuiltIns` to @babel/preset-react ([8b07f8d](https://github.com/ambar/reiconify/commit/8b07f8d5c51a746b53040d72433cf9be1325c766))
- add transform API ([7536f0d](https://github.com/ambar/reiconify/commit/7536f0d2b35499d3bada78d7c6912f4b7eb37b41))
- drop Node 6 support ([bbd775d](https://github.com/ambar/reiconify/commit/bbd775d638f8626a69635d8e08a6952b3661a584))
- update babel to v7, use yarn workspaces ([41f9ec6](https://github.com/ambar/reiconify/commit/41f9ec6bc0f9365532b78beaa5f54ac7a4a7372b))

### BREAKING CHANGES

- please use Node 8+

## 0.2.1 (2018-06-04)

### Bug Fixes

- **svg2jsx:** converts inline styles to style objects ([324af0f](https://github.com/ambar/reiconify/commit/324af0f94d9750d1c90dd4cf277cc226d5fed25a))

# 0.2.0 (2018-05-22)

### Features

- prettier code from custom template ([0a998e9](https://github.com/ambar/reiconify/commit/0a998e9444f36f679141b79d5a9f6cdca98ef239))

## 0.1.3 (2018-04-18)

## 0.1.2 (2018-04-18)

### Bug Fixes

- make sure to delete falsy props ([efc0406](https://github.com/ambar/reiconify/commit/efc04069ed87ac888a7e1b905d47a70061bdc7b1))
- use `npm-which` to resolve bin path ([ee75789](https://github.com/ambar/reiconify/commit/ee7578986b43bba89cf5e3d80bfa61d5667f9c30))

## 0.1.1 (2018-04-18)

# 0.1.0 (2018-01-31)

### Bug Fixes

- support custom directory ([888beba](https://github.com/ambar/reiconify/commit/888beba9cd4bf26b4fd1d06dbc872ebbd5b8d169))

### Features

- add output directory options ([cd3100f](https://github.com/ambar/reiconify/commit/cd3100f08fa0f5d8b2e2620e4c6e20a28f93a88d))

# [2.3.0](https://github.com/ambar/reiconify/compare/v2.2.2...v2.3.0) (2022-02-25)

### Features

- add template for index file ([ed079a0](https://github.com/ambar/reiconify/commit/ed079a0))

## [2.2.2](https://github.com/ambar/reiconify/compare/v2.2.1...v2.2.2) (2021-01-28)

### Bug Fixes

- make transform compatible with ES5 ([12aa171](https://github.com/ambar/reiconify/commit/12aa171))

## [2.2.1](https://github.com/ambar/reiconify/compare/v2.2.0...v2.2.1) (2021-01-28)

### Bug Fixes

- disable removeViewBox ([6dd9b53](https://github.com/ambar/reiconify/commit/6dd9b53))

# [2.2.0](https://github.com/ambar/reiconify/compare/v2.1.0...v2.2.0) (2021-01-27)

### Features

- add format option to transform ([4f09f02](https://github.com/ambar/reiconify/commit/4f09f02))

# [2.1.0](https://github.com/ambar/reiconify/compare/v2.0.1...v2.1.0) (2021-01-27)

### Features

- disable prettier in transform API ([bc1feda](https://github.com/ambar/reiconify/commit/bc1feda))

# [2.0.0](https://github.com/ambar/reiconify/compare/v1.7.0...v2.0.0) (2021-01-23)

### Features

- use esbuild instead of babel ([eb9edea](https://github.com/ambar/reiconify/commit/eb9edea))

### BREAKING CHANGES

- migrate to esbuild

# [1.7.0](https://github.com/ambar/reiconify/compare/v1.6.0...v1.7.0) (2021-01-17)

### Features

- replace postcss-js with style-to-object ([d7540bc](https://github.com/ambar/reiconify/commit/d7540bc))
- use babel `transformAsync` ([f7b5028](https://github.com/ambar/reiconify/commit/f7b5028))

# [1.6.0](https://github.com/ambar/reiconify/compare/v1.5.0...v1.6.0) (2021-01-12)

### Features

- upgrade svgo ([16604aa](https://github.com/ambar/reiconify/commit/16604aa))

# [1.5.0](https://github.com/ambar/reiconify/compare/v1.4.1...v1.5.0) (2020-11-05)

### Features

- update prettier ([2e02c63](https://github.com/ambar/reiconify/commit/2e02c63))

## [1.4.1](https://github.com/ambar/reiconify/compare/v1.4.0...v1.4.1) (2020-08-21)

**Note:** Version bump only for package reiconify

# [1.4.0](https://github.com/ambar/reiconify/compare/v1.3.1...v1.4.0) (2020-08-20)

### Features

- ignore Babel config by default ([45ea22e](https://github.com/ambar/reiconify/commit/45ea22e))

## [1.3.1](https://github.com/ambar/reiconify/compare/v1.3.0...v1.3.1) (2018-11-29)

### Bug Fixes

- **reiconify:** convert namespaced attrs to camel case ([4d19f16](https://github.com/ambar/reiconify/commit/4d19f16))

# [1.3.0](https://github.com/ambar/reiconify/compare/v1.2.2...v1.3.0) (2018-11-19)

### Features

- add reiconify-cli ([6570d81](https://github.com/ambar/reiconify/commit/6570d81))

# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.2.2"></a>

## [1.2.2](https://github.com/ambar/reiconify/compare/v1.2.1...v1.2.2) (2018-11-16)

### Bug Fixes

- add babel.config.js to files filed package.json ([c6bc0c7](https://github.com/ambar/reiconify/commit/c6bc0c7))

<a name="1.2.1"></a>

## [1.2.1](https://github.com/ambar/reiconify/compare/v1.2.0...v1.2.1) (2018-11-16)

<a name="1.2.0"></a>

# [1.2.0](https://github.com/ambar/reiconify/compare/v1.1.1...v1.2.0) (2018-11-15)

### Features

- remove baseMapProps ([2779be7](https://github.com/ambar/reiconify/commit/2779be7))

<a name="1.1.1"></a>

## [1.1.1](https://github.com/ambar/reiconify/compare/v1.1.0...v1.1.1) (2018-11-15)

### Bug Fixes

- change base element name to SVG ([9afffd2](https://github.com/ambar/reiconify/commit/9afffd2))

<a name="1.1.0"></a>

# [1.1.0](https://github.com/ambar/reiconify/compare/v1.0.1...v1.1.0) (2018-09-27)

### Features

- add base-icon package ([9c7a1b2](https://github.com/ambar/reiconify/commit/9c7a1b2))
- use `baseClassName` instead of `defaultClassName` ([b0ac001](https://github.com/ambar/reiconify/commit/b0ac001))

<a name="1.0.1"></a>

## [1.0.1](https://github.com/ambar/reiconify/compare/v1.0.0...v1.0.1) (2018-09-21)

### Bug Fixes

- use babel.config.js in example ([51ac714](https://github.com/ambar/reiconify/commit/51ac714))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/ambar/reiconify/compare/v0.2.1...v1.0.0) (2018-09-21)

### Features

- add `useBuiltIns` to [@babel](https://github.com/babel)/preset-react ([8b07f8d](https://github.com/ambar/reiconify/commit/8b07f8d))
- add transform API ([7536f0d](https://github.com/ambar/reiconify/commit/7536f0d))
- drop Node 6 support ([bbd775d](https://github.com/ambar/reiconify/commit/bbd775d))
- update babel to v7, use yarn workspaces ([41f9ec6](https://github.com/ambar/reiconify/commit/41f9ec6))

### BREAKING CHANGES

- please use Node 8+

<a name="0.2.1"></a>

## [0.2.1](https://github.com/ambar/reiconify/compare/v0.2.0...v0.2.1) (2018-06-04)

### Bug Fixes

- **svg2jsx:** converts inline styles to style objects ([324af0f](https://github.com/ambar/reiconify/commit/324af0f))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/ambar/reiconify/compare/v0.1.3...v0.2.0) (2018-05-22)

### Features

- prettier code from custom template ([0a998e9](https://github.com/ambar/reiconify/commit/0a998e9))

<a name="0.1.3"></a>

## [0.1.3](https://github.com/ambar/reiconify/compare/v0.1.2...v0.1.3) (2018-04-18)

### Bug Fixes

- make sure to delete falsy props ([efc0406](https://github.com/ambar/reiconify/commit/efc0406))

<a name="0.1.2"></a>

## [0.1.2](https://github.com/ambar/reiconify/compare/v0.1.1...v0.1.2) (2018-04-18)

### Bug Fixes

- use `npm-which` to resolve bin path ([ee75789](https://github.com/ambar/reiconify/commit/ee75789))

<a name="0.1.1"></a>

## [0.1.1](https://github.com/ambar/reiconify/compare/v0.1.0...v0.1.1) (2018-04-18)

<a name="0.1.0"></a>

# 0.1.0 (2018-01-31)

### Bug Fixes

- support custom directory ([888beba](https://github.com/ambar/reiconify/commit/888beba))

### Features

- add output directory options ([cd3100f](https://github.com/ambar/reiconify/commit/cd3100f))
