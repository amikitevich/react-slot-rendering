import React from 'react'
import { v4 } from 'uuid'

const slotContext = React.createContext()

export function SlotProvider({ children }) {
  const [activeSlots, setActiveSlots] = React.useState({})
  const activeChildrenRef = React.useRef({})

  const mount = React.useCallback((childJSX, slotId, entryId) => {
    const activeChildren = activeChildrenRef.current

    if (!activeChildren[slotId] || !activeChildren[slotId].includes(entryId)) {
      Object.assign(activeChildren, {
        [slotId]: [...(activeChildren[slotId] || []), entryId]
      })
    }

    setActiveSlots((prev) => {
      const newEntryMap = { ...prev[slotId], [entryId]: childJSX }
      return { ...prev, [slotId]: newEntryMap }
    })

    return function unmount() {
      if (!(activeChildren[slotId] || []).includes(entryId)) {
        return
      }

      Object.assign(activeChildren, {
        [slotId]: activeChildren[slotId].filter((item) => item !== entryId)
      })
      setActiveSlots((prev) => {
        const newEntryMap = { ...prev[slotId] }
        delete newEntryMap[entryId]
        return { ...prev, [slotId]: newEntryMap }
      })
    }
  }, [])

  const contextValue = React.useMemo(
    () => ({
      mount,
      activeSlots
    }),
    [mount, activeSlots]
  )

  return (
    <slotContext.Provider value={contextValue}>{children}</slotContext.Provider>
  )
}

export function createSlot() {
  const defaultSlotId = v4()

  function Input({ children, slotId = defaultSlotId }) {
    const entryId = React.useMemo(() => v4(), [])
    const { mount } = React.useContext(slotContext)

    React.useEffect(() => {
      const unmount = mount(children, slotId, entryId)
      return unmount
    }, [children, mount, slotId, entryId])

    return null
  }

  function Output({ slotId = defaultSlotId, children: placeholder = null }) {
    const { activeSlots } = React.useContext(slotContext)
    const activeEntries = activeSlots[slotId] || {}
    console.log('render output')
    const entriesList = Object.values(activeEntries)
    return entriesList.length > 0 ? entriesList : placeholder
  }

  return {
    Input,
    Output
  }
}

export function createSlotFn() {
  const defaultSlotId = v4()

  function Input({ children, slotId = defaultSlotId }) {
    const entryId = React.useMemo(() => v4(), [])
    const { mount } = React.useContext(slotContext)

    React.useEffect(() => {
      const unmount = mount(children, slotId, entryId)
      return unmount
    }, [children, mount, slotId, entryId])

    return null
  }

  function Output({ slotId = defaultSlotId, payload }) {
    const { activeSlots } = React.useContext(slotContext)
    const activeEntries = activeSlots[slotId] || {}
    console.log('render output')

    return React.Children.toArray(
      Object.values(activeEntries).map((e) => e(payload))
    )
  }

  return {
    Input,
    Output
  }
}

export function createSlotOneInput() {
  const defaultSlotId = v4()

  function Input({ children, slotId = defaultSlotId }) {
    const entryId = React.useMemo(() => v4(), [])
    const { mount } = React.useContext(slotContext)

    React.useEffect(() => {
      const unmount = mount(children, slotId, entryId)
      return unmount
    }, [children, mount, slotId, entryId])

    return null
  }

  function Output({ slotId = defaultSlotId, children: placeholder = null }) {
    const { activeSlots } = React.useContext(slotContext)
    const activeEntries = activeSlots[slotId] || {}
    console.log('render output')
    const entriesList = React.memo(() => Object.values(activeEntries), [
      activeEntries
    ])

    if (entriesList.length > 1) {
      throw new Error(`Expected only one Input, get ${entriesList.length}`)
    }
    return entriesList.length > 0 ? entriesList[0] : placeholder
  }

  return {
    Input,
    Output
  }
}
