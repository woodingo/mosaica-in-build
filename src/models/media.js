import pathToRegexp from 'path-to-regexp'
import { addMedia, delMedia, updateMedia, createUploadLogoChannel } from '../services/media.service'
import firebaseApp from '../utils/firebase'

export default {
  namespace: 'media',
  state: {
    list: [],
    mode: '',
    selectedMedia: undefined,
    selectedKeys: [],
    modalVisible: false,
    logoUrl: '',
    currentMedia: {
      name: '',
      description: '',
      logoUrl: ''
    }
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
    onChange(state, action) {
      return {
        ...state,
        currentMedia: {
          ...state.currentMedia,
          ...action.payload
        }
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
    },
    updateUploadLogoProgress(state, action) {
      return {
        ...state,
        uploadLogoProgress: action.payload.progress,
        logoUrl: action.payload.logoUrl
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

    *uploadLogo({ payload, onSuccess, onError }, { call, put, take }) {
      const { logo } = payload;

      try {
        const channel = yield call(createUploadLogoChannel, logo);
        while (true) {
          const {
            progress = 0,
            error,
            success,
            logoUrl
          } = yield take(channel);
          if (error) {
            onError(error.message)
            return;
          }
          if (success) {
            onSuccess('upload success : )')
            return;
          }
          yield put({ type: 'updateUploadLogoProgress', payload: { progress, logoUrl } })
        }
      } catch (error) {
        onError(error.message)
      }
    },

    *editMedia({ payload, onSuccess, onError }, { call, put, select }) {
      try {
        const key = yield select(state => state.media.selectedMedia.key)
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
      const medias = yield select(state => state.media.list)
      const media = medias.find(m => m.key === key)
      yield put({ type: 'saveSelectedMedia', media })
    },

    *convert({ payload }, { put }) {
      const list = []
      payload.mediaObj.forEach((snapshort) => {
        list.push({ key: snapshort.key, ...snapshort.val() })
      })
      yield put({ type: 'saveMedias', list })
    }
  },

  subscriptions: {
    onMediaChange({ history, dispatch }) {
      let mediaRef
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/media').exec(pathname)
        if (match && !mediaRef) {
          mediaRef = firebaseApp.database().ref('media')
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
