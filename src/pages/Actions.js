import api from '../libs/api'

const storeData = {
  type: '',
  data: null
}

export function getFishDatas () {
  return async dispatch => {
    try {
      const data = await api.read('list')
      if (data) {
        storeData.type = 'GET_FISH_DATA'
        storeData.data = data
        dispatch(storeData)
      }
    } catch (error) {
      throw error
    }
  }
}

export function addFishData (payload) {
  return async dispatch => {
    try {
      const data = await api.append('list', [payload])
      if (data) {
        storeData.type = 'ADD_FISH_DATA'
        storeData.data = payload
        dispatch(storeData)
      }
    } catch (error) {
      throw error
    }
  }
}

export function editFishData (payload) {
  return async dispatch => {
    try {
      const data = await api.edit('list', {
        search: { uuid: payload.uuid },
        set: { ...payload }
      })
      if (data) {
        storeData.type = 'EDIT_FISH_DATA'
        storeData.data = payload
        dispatch(storeData)
      }
    } catch (error) {
      throw error
    }
  }
}

export function deleteFishData (payload) {
  return async dispatch => {
    try {
      const data = await api.delete('list', {
        search: { uuid: payload.uuid }
      })
      if (data) {
        storeData.type = 'DELETE_FISH_DATA'
        storeData.data = payload
        dispatch(storeData)
      }
    } catch (error) {
      throw error
    }
  }
}
