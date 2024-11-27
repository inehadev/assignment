import { useState } from 'react'

import './App.css'
import Hero from './assets/component/Hero'

function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <Hero/>
      {/* <div>hello</div> */}
    </>
  )
}

export default App
