import { renderHook } from 'react-hooks-testing-library'
import { useLoading } from '../useLoading'

describe('UseLoading.test', () => {
  test('should change state from false to true', async () => {
    const expected = 42
    const load = () => Promise.resolve(expected)
    let actual = 0

    const { result, waitForNextUpdate } = renderHook(() => useLoading(load,
      (given) => actual = given))

    await waitForNextUpdate()
    expect(actual).toEqual(expected)
    expect(result.current).toBeFalsy()
  })

  test('initial loading state is true', () => {
    const expected = 42
    const load = () => Promise.resolve(expected)
    let actual = 0

    const { result } = renderHook(() => useLoading(load,
      (given) => actual = given))

    expect(actual).not.toEqual(expected)
    expect(result.current).toBeTruthy()
  })
})
