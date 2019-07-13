import { act, renderHook } from '@testing-library/react-hooks'
import { useToggle } from '../useToggle'

describe('UseToggle.test', () => {
  test('should change state from false to true', () => {
    const { result } = renderHook(() => useToggle(false))

    const toggle = result.current[1]
    act(toggle)

    const state = result.current[0]
    expect(state).toBeTruthy()
  })

  test('should change state from true to false', () => {
    const { result } = renderHook(() => useToggle(true))

    const toggle = result.current[1]
    act(toggle)

    const state = result.current[0]
    expect(state).toBeFalsy()
  })

  test('should hold the same state after 2 iterations', async () => {
    const { result } = renderHook(() => useToggle(true))

    const toggleFirstTime = result.current[1]
    act(toggleFirstTime)
    const toggleSecondTime = result.current[1]
    act(toggleSecondTime)

    const state = result.current[0]
    expect(state).toBeTruthy()
  })
})
