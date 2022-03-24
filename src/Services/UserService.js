import firebase from "firebase";

export default class UserService {
    static async getUser(uid) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then(response => {
                    const userData = response.data()

                    delete userData.password
                    resolve(userData)
                })
                .catch(reject)
        })
    }

    static async updateFields(uid, fields) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .update(fields)
                .then(resolve)
                .catch(reject)
        })
    }


    static async setTaskToUser(user_uid, task) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('users')
                .doc(user_uid)
                .collection('task')
                .doc(task.id)
                .set(task)
                .then(resolve)
                .catch(reject)
        })
    }

    static async getTasksInWork(user_uid) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('users')
                .doc(user_uid)
                .collection('task')
                .get()
                .then((response) => {
                    const tasks = response.docs.map(r => r.data())
                    resolve(tasks)
                })
                .catch(reject)
        })

    }

}