import firebaseApp from '../utils/firebase'

export const getMedias = () => {
  const mediaListRef = firebaseApp.database().ref('mass-medias')
  return mediaListRef.once('value')
}

export const delMedia = (key) => {
  const mediaRef = firebaseApp.database().ref('mass-medias').child(key)
  return mediaRef.remove()
}

export const addMedia = (media) => {
  const mediaRef = firebaseApp.database().ref('mass-medias').push()
  return mediaRef.set(media)
}

export const updateMedia = (media) => {
  const { key, ...withOutKeyMedia } = media
  const mediaRef = firebaseApp.database().ref('mass-medias').child(key)
  if (mediaRef) {
    mediaRef.update(withOutKeyMedia)
  }
}
