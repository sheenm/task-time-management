import { renderHook } from 'react-hooks-testing-library'
import { useLoading } from '../useLoading'

describe('UseLoading.test', () => {
  test('should change state from initial to success', async () => {
    const expected = 42
    const load = () => Promise.resolve(expected)
    let actual = 0

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoading({
        load,
        then: given => actual = given
      })
    )

    await waitForNextUpdate()
    expect(actual).toEqual(expected)
    expect(result.current).toBe('Success')
  })

  test('initial loading state is Loading', () => {
    const expected = 42
    const load = () => Promise.resolve(expected)
    let actual = 0

    const { result } = renderHook(() =>
      useLoading({
        load,
        then: given => actual = given
      })
    )

    expect(actual).not.toEqual(expected)
    expect(result.current).toBe('Loading')
  })

  test('should change state to error', async () => {
    const message = 'some message'
    const load = () => Promise.reject(message)
    const then = jest.fn()
    const error = jest.fn()

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoading({
        load,
        then,
        error
      })
    )

    await waitForNextUpdate()
    expect(result.current).toBe('Error')
    expect(error).toBeCalledTimes(1)
    expect(then).not.toBeCalled()
  })
})
