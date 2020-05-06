import React from 'react'
import {
  SlotProvider,
  createSlot,
  createSlotFn,
  createSlotOneInput
} from 'react-slot-rendering'

import styles from './styles.module.css'

const HeaderSlot = createSlot()
const BodySlot = createSlot()
const FooterSlot = createSlot()
const SideBarSlot = createSlotFn()
const PlaceholderExampleSlot = createSlot()
const SlotOneInput = createSlotOneInput()

function Layout() {
  console.log('render layout')

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <HeaderSlot.Output />
        <PlaceholderExampleSlot.Output>
          Placeholder
        </PlaceholderExampleSlot.Output>
      </div>
      <div className={styles.body}>
        <BodySlot.Output />
        <SlotOneInput.Output></SlotOneInput.Output>
      </div>
      <div className={styles.footer}>
        <FooterSlot.Output />
      </div>
      <div className={styles.sidebar}>
        <SideBarSlot.Output payload='look it is payload!' />
      </div>
    </div>
  )
}

function MainPage({ index }) {
  const [d, tick] = React.useState(0)
  return (
    <>
      <button onClick={() => tick((p) => p + 1)}>
        Rerender Main Page {index}
      </button>
      <HeaderSlot.Input>
        <p>Header {index}</p>
      </HeaderSlot.Input>
      <BodySlot.Input>
        <p>Body {index}</p>
      </BodySlot.Input>
      <FooterSlot.Input>
        <p>Footer {index}</p>
      </FooterSlot.Input>
      <SideBarSlot.Input>
        {(payload) => (
          <p>
            Sidebar {index} {payload}
          </p>
        )}
      </SideBarSlot.Input>
    </>
  )
}

const App = () => {
  const [d, tick] = React.useState(0)
  console.log('render app')

  return (
    <>
      <button onClick={() => tick((p) => p + 1)}>Rerender whole App</button>
      <SlotProvider>
        {/* <SlotOneInput.Input>
          <>Only one input</>
        </SlotOneInput.Input> */}
        <button onClick={() => tick((p) => p + 1)}>
          Rerender Provider children
        </button>
        <Layout />
        <MainPage index={1} />
        <MainPage index={2} />
      </SlotProvider>
    </>
  )
}

export default App
