import intialState from './State'

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case 'GET_FISH_DATA':
      return {
        ...state,
        fishDatas: action.data
      }
    case 'ADD_FISH_DATA':
      return {
        ...state,
        fishDatas: state.fishDatas.concat(action.data)
      }
    case 'EDIT_FISH_DATA':
      return {
        ...state,
        fishDatas: state.fishDatas.map(data => {
          if (action.data.uuid !== data.uuid) {
            return data 
          }

          return {
            ...data,
            ...action.data
          }
        })
      }
    case 'DELETE_FISH_DATA':
      return {
        ...state,
        fishDatas: state.fishDatas.filter(({ uuid }) => uuid !== action.data.uuid)
      }
    default:
      return state
  }
}

export default reducer
