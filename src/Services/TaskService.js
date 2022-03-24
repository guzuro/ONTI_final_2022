import firebase from "firebase";

export default class TaskService {

    static async getTasks(company_id) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('tasks')
                .where('company_guid', '==', company_id)
                .get()
                .then(res => {
                    console.log(res)
                    const tasks = res.docs.map(t => t.data())
                    resolve(tasks)
                })
                .catch(reject)
        })
    }

    static async createTask(task, companyGuid) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('tasks')
                .doc(task.id)
                .set({...task, company_guid: companyGuid})
                .then(resolve)
                .catch(reject)
        })
    }
}


