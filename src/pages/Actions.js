import api from '../libs/api'

export function getFishDatas () {
  return async dispatch => {
    const storeData = {
      type: 'pages/getFishDatas',
      data: null
    }
    try {
      const data = await api.read('list')
      if (data) {
        storeData.data = data
        dispatch(storeData)
      }
    } catch (error) {
      throw error
    }
  }
}
