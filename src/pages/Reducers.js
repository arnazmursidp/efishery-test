import intialState from './State'

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_FISH_DATA':
      return {
        ...state,
        fishDatas: action.data
      }
    default:
      return state
  }
}

export default reducer
