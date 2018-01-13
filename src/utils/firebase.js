import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// const config = {
//   projectId: 'dva-admin',
//   apiKey: 'AIzaSyCJU9v5f1ygHyvrUGOxueN9OV18VIEuFWA',
//   authDomain: 'dva-admin.firebaseapp.com',
//   databaseURL: 'https://dva-admin.firebaseio.com',
//   storageBucket: 'dva-admin.appspot.com'
// }

const config = {
  projectId: "dva-admin-33134",
  apiKey: "AIzaSyAC08P6I-wI4h0u1qFVQ2aW1tt1kSAukkw",
  authDomain: "dva-admin-33134.firebaseapp.com",
  databaseURL: "https://dva-admin-33134.firebaseio.com",
  storageBucket: "dva-admin-33134.appspot.com"
}

const firebaseApp = firebase.initializeApp(config)

export default firebaseApp
