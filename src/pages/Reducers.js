import intialState from './State'

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'pages/getFishDatas':
      return {
        fishDatas: action.data
      }
    default:
      return state
  }
}

export default reducer
