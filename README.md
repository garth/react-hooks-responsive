# react-hooks-responsive

A react hooks approach to responsive layout.

> Disclaimer: To use hooks a pre-release version of react 16.7 is required. Since the hooks API is subject to change, this library may or may not work with future versions of react.

## Install

```
yarn add react-hooks-responsive
```

or

```
npm install react-hooks-responsive
```

## Usage Example

```tsx
import React from 'react'
import { useResponsive } from 'react-hooks-responsive'

// smallest breakpoint must be 0
// any number of breakpoints with any names can be given
const breakpoints = { xs: 0, sm: 480, md: 1024 }

const App: React.StatelessComponent = () => {
  const [size, orientation] = useResponsive(breakpoints)

  return (
    <p>
      The screen is currently {size} in {orientation}.
    </p>
  )
}

export default App
```
