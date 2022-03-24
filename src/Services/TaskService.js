import firebase from "firebase";
import {ANALITIC, ARCHITECTOR, CONSULTANT, DEV, JUNCONSULTANT, JUNDEV} from "../mixins/CONSTANTS";

export default class TaskService {

    static async getTasks(company_id) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('tasks')
                .where('company_guid', '==', company_id)
                .get()
                .then(res => {
                    const tasks = res.docs.map(t => t.data())
                    resolve(tasks)
                })
                .catch(reject)
        })
    }

    static async getTasksByRole(company_guid, roleId) {

        let searchQuery = []

        if (roleId === ANALITIC[0]) {
            searchQuery = ANALITIC
        }
        if (roleId === ARCHITECTOR[0]) {
            searchQuery = ARCHITECTOR
        }
        if (roleId === JUNCONSULTANT[0]) {
            searchQuery = JUNCONSULTANT
        }
        if (roleId === CONSULTANT[0]) {
            searchQuery = CONSULTANT
        }
        if (roleId === DEV[0]) {
            searchQuery = DEV
        }
        if (roleId === JUNDEV[0]) {
            searchQuery = JUNDEV
        }

        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('tasks')
                .where('company_guid', '==', company_guid)
                .where('taskType', 'array-contains-any', searchQuery)
                .where('executor', "==", null)
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



    static async setExecutorToTask(user_uid, task) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('tasks')
                .doc(task.id)
                .update({executor: user_uid})
                .then(resolve)
                .catch(reject)
        })

    }
}


