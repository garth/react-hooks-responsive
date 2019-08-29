# react-hooks-responsive

A react hooks approach to responsive layout.

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
  const { size, orientation, screenIsAtLeast, screenIsAtMost } = useResponsive(breakpoints)

  return (
    <div>
      <p>
        The screen is currently {size} in {orientation}.{' '}
      </p>
      <p>is the screen at least sm? {screenIsAtLeast('sm') ? 'yes' : 'no'}.</p>
      <p>is the screen at most sm and portrait? {screenIsAtMost('sm', 'portrait') ? 'yes' : 'no'}.</p>
    </div>
  )
}

export default App
```
