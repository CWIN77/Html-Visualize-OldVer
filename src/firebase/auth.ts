import { IUser } from '../types';
import firebase from './config'

export const loginGoogle = (): void => {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider);
    }).catch((error) => {
      alert('로그인 실패\n' + error.message)
    }).then(({ user }: any) => {
      const { displayName, photoURL, uid } = user;
      if (displayName && photoURL) {
        const joinId = displayName + uid.substr(0, 8);
        const userData: IUser = { img: photoURL, name: displayName, uid, joinId };
        localStorage.setItem("user", JSON.stringify(userData));
        alert('로그인 완료');
      }
      window.location.reload();
    }).catch((error) => {
      alert('로그인 실패\n' + error.message);
    });
}

export const logOut = (): void => {
  if (window.confirm('로그아웃 하겠습니까?')) {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('user');
      alert('로그아웃 완료');
      window.location.reload();
    }).catch(() => {
      alert('로그아웃 실패');
    });
  }
}

export const getCurrentUser = (): IUser | null => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const { displayName, photoURL, uid } = currentUser;
    if (displayName && photoURL) {
      const joinId = displayName + uid.substr(0, 8);
      const userData: IUser = { img: photoURL, name: displayName, uid, joinId };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    }
    return null;
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { displayName, photoURL, uid } = user;
      if (displayName && photoURL) {
        const joinId = displayName + uid.substr(0, 8);
        const userData: IUser = { img: photoURL, name: displayName, uid, joinId };
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    }
  });
  return JSON.parse(localStorage.getItem("user") || JSON.stringify(null));
}