import pathToRegexp from 'path-to-regexp'
import { addMedia, delMedia, updateMedia } from '../services/mass-medias.service'
import firebaseApp from '../utils/firebase'

export default {
  namespace: 'massMedias',
  state: {
    list: [],
    mode: '',
    selectedMedia: undefined,
    selectedKeys: [],
    modalVisible: false
  },
  reducers: {
    saveMedias(state, action) {
      return {
        ...state,
        list: action.list
      }
    },
    saveSelectedMedia(state, action) {
      return {
        ...state,
        selectedMedia: action.media
      }
    },
    onSelectedChange(state, action) {
      return {
        ...state,
        selectedKeys: action.selectedKeys
      }
    },
    showAddModal(state) {
      return {
        ...state,
        mode: 'add',
        modalVisible: true
      }
    },
    showEditModal(state) {
      return {
        ...state,
        mode: 'edit',
        modalVisible: true
      }
    },
    hideModal(state) {
      return {
        ...state,
        mode: '',
        modalVisible: false,
        selectedMedia: undefined
      }
    }
  },
  effects: {
    *addMedia({ payload, onSuccess, onError }, { call, put }) {
      const { media } = payload
      try {
        yield call(addMedia, media)
        onSuccess('add success : )')
        yield put({ type: 'hideModal' })
      } catch (error) {
        onError(error.message)
      }
    },
    *editMedia({ payload, onSuccess, onError }, { call, put, select }) {
      try {
        const key = yield select(state => state.massMedias.selectedMedia.key)
        const media = {
          ...payload.media,
          key
        }
        yield call(updateMedia, media)
        onSuccess('edit success : )')
        yield put({ type: 'hideModal' })
      } catch (error) {
        onError(error.message)
      }
    },
    *delMedia({ payload, onSuccess, onError }, { call }) {
      const { key } = payload
      try {
        yield call(delMedia, key)
        onSuccess('delete success : )')
      } catch (error) {
        onError(error.message)
      }
    },
    *getSelectedMedia({ payload }, { put, select }) {
      const { key } = payload
      const medias = yield select(state => state.massMedias.list)
      const media = medias.find(m => m.key === key)
      yield put({ type: 'saveSelectedUser', media })
    },
    *convert({ payload }, { put }) {
      const list = []
      payload.mediaObj.forEach((snapshort) => {
        list.push({ key: snapshort.key, ...snapshort.val() })
      })
      yield put({ type: 'saveUsers', list })
    }
  },
  subscriptions: {
    onMediaChange({ history, dispatch }) {
      let mediaRef
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/mass-medias').exec(pathname)
        if (match && !mediaRef) {
          mediaRef = firebaseApp.database().ref('mass-medias')
          mediaRef.on('value', (snapshort) => {
            dispatch({ type: 'convert', payload: { mediaObj: snapshort } })
          })
        } else if (!match && mediaRef) {
          mediaRef.off()
          mediaRef = null
        }
      })
    }
  }
}
