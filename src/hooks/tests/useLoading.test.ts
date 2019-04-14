import { renderHook } from 'react-hooks-testing-library'
import { LoadingStastes, useLoading } from '../useLoading'

describe('UseLoading.test', () => {
  test('should change state from false to true', async () => {
    const expected = 42
    const load = () => Promise.resolve(expected)
    let actual = 0

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoading(load)(given => actual = given)
    )

    await waitForNextUpdate()
    expect(actual).toEqual(expected)
    expect(result.current).toBe(LoadingStastes.Success)
  })

  test('initial loading state is true', () => {
    const expected = 42
    const load = () => Promise.resolve(expected)
    let actual = 0

    const { result } = renderHook(() =>
      useLoading(load)(given => actual = given)
    )

    expect(actual).not.toEqual(expected)
    expect(result.current).toBe(LoadingStastes.Loading)
  })

  test('should change state to error', async () => {
    const message = 'some message'
    const load = () => Promise.reject(message)
    const successFn = jest.fn()
    const failFn = jest.fn()

    const { result, waitForNextUpdate } = renderHook(() =>
      useLoading(load)(successFn, failFn)
    )

    await waitForNextUpdate()
    expect(result.current).toBe(LoadingStastes.Error)
    expect(failFn).toBeCalledTimes(1)
    expect(successFn).not.toBeCalled()
  })
})
