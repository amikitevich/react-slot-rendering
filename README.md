# react-slot-rendering

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-slot-rendering.svg)](https://www.npmjs.com/package/react-slot-rendering) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-slot-rendering
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-slot-rendering'
import 'react-slot-rendering/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## Development

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
yarn
yarn start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
yarn
yarn start # runs create-react-app dev server
```

navigate to [http://localhost:3000](http://localhost:3000)

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

## License

MIT © [amikitevich](https://github.com/amikitevich)
