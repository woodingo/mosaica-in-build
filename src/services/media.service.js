import shortid from 'shortid';
import { get } from 'lodash';
import { eventChannel, END } from 'redux-saga';
import firebaseApp from '../utils/firebase';

export const getMedias = () => {
  const mediaListRef = firebaseApp.database().ref('media')
  return mediaListRef.once('value')
}

export const delMedia = (key) => {
  const mediaRef = firebaseApp.database().ref('media').child(key)
  return mediaRef.remove()
}

export const addMedia = (media) => {
  const mediaRef = firebaseApp.database().ref('media').push()
  return mediaRef.set(media)
}

export const createUploadLogoChannel = (logo) => {
  return eventChannel((emitter) => {
    const storageRef = firebaseApp.storage().ref();
    const logosRef = storageRef.child(`logos/${shortid()}`)
    const logoLoader = logosRef.put(logo);
    logoLoader.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        emitter({
          progress,
          logoUrl: get(snapshot, 'metadata.downloadURLs[0]')
        })
      },
      (error) => {
        emitter({ error });
        emitter(END);
      },
      () => {
        emitter({ success: true });
        emitter(END);
      }
    );
    return () => {};
  })
}

export const updateMedia = (media) => {
  const { key, ...withOutKeyMedia } = media
  const mediaRef = firebaseApp.database().ref('media').child(key)
  if (mediaRef) {
    mediaRef.update(withOutKeyMedia)
  }
}
