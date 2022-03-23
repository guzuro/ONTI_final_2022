import firebase from "firebase";
import UserService from "./UserService";

export default class AuthService {

    static async signUp(registrationData) {

        const user = {...registrationData}

        if (!user.role) {
            user.role = "Администратор"
        }

        return new Promise((resolve, reject) => {
            AuthService.createUser(user)
                .then(uid => {
                    UserService.updateFields(uid, {uid: uid})
                        .then(() => {
                            UserService.getUser(uid)
                                .then(resolve)
                                .catch(reject)
                        })
                        .catch(reject)
                })
        })
    }

    static async createUser(registrationData) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('users')
                .add(registrationData)
                .then(res => resolve(res.id))
                .catch(reject)
        })
    }

    static async signIn(loginData) {
        const email = loginData.email
        const password = loginData.password

        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('users')
                .where("email", "==", email)
                .where('password', '==', password)
                .get()
                .then((res) => {
                    if (res.docs[0]) {
                        const data = res.docs[0].data()
                        sessionStorage.setItem("uid", data.uid)
                        resolve(data)
                    } else {
                        reject('ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН')
                    }
                })
                .catch(reject)
        })
    }

    static async logout() {
        return new Promise((resolve) => {
            sessionStorage.removeItem("uid")
            resolve()
        })
    }

    static async checkLogin() {
        return new Promise((resolve, reject) => {
            if (sessionStorage.getItem("uid")) {
                UserService.getUser(sessionStorage.getItem("uid"))
                    .then(resolve)
                    .catch(reject)
            } else {
                reject()
            }
        })
    }
}