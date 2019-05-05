This file contains code conventions for this project (not including tsconfig.json/tslint.json)

# useReducer hook

## typing actions

- Use Prefix IA for interface describing action type.
- Use `type` field to describe type of action, which you will use in reducer to identify your action
- Don't use `payload` field which means nothing. But do use named fields for payload
- To describe all action types in one type use typescript union types
- Don't create action creators since they don't help you in typing your actions, but your code becomes more complicated (1 more layer) and bundle size of an application will be larger.
- Don't create constants which contains action names: they don't help in typing: when you already described action types in interfaces, you will not be able to make typo in action type and you will get full intellisense support.

```ts
interface IALoadTimestamps {
  type: 'LOAD_TIMESTAMPS'
  timestamps: ITimestamp[]
}

interface IARemoveTimestamp {
  type: 'REMOVE_TIMESTAMP'
  id: number
}

type ActionsTypes = IALoadTimestamps | IARemoveTimestamp
```

## reducer function

- Always provide a type for action parameter to strictly provide only certain action types.
- Always create default branch in switch with `return neverReached(action)` to make sure all action types are described in the reducer. If you don't provide all branches in switch the code will not compile and it will help you to understand where you should change your code.


```ts
const reducer = (state: ITimestamp[], action: ActionTypes) => {
  switch (action.type) {
    case 'LOAD_TIMESTAMPS':
      // ...
    case 'REMOVE_TIMESTAMP':
      // ...
    default:
      return neverReached(action)
  }
}
```

# Extending built-in prototypes

- Must use prefix `ext` to explitly show that this is an extension method and to avoid future problems if js will later implement method with the same name
