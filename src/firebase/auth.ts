import { IUser } from '../types';
import firebase from './config'

export const loginGoogle = () => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider);
    }).catch((error) => {
      alert('로그인 실패\n' + error.message)
    }).then(({ user }: any) => {
      const { displayName, photoURL, uid } = user;
      // const id = displayName + uid.substr(0, 8);
      const userData = { photoURL, displayName, uid };
      localStorage.setItem("user", JSON.stringify(userData));
    }).catch((error) => {
      alert('로그인 실패\n' + error.message);
    });
}

export const logOut = () => {
  if (window.confirm('로그아웃 하겠습니까?')) {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('user')
      alert('로그아웃완료');
      window.location.reload();
    }).catch(() => {
      alert('로그아웃 실패');
    });
  }
}

export const getCurrentUser = () => {
  const user: IUser | null = firebase.auth().currentUser || JSON.parse(localStorage.getItem("user") || JSON.stringify(null));
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      const userData = { photoURL, displayName, uid };
      if (displayName && photoURL && uid) {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    }
  });
  return user;
}