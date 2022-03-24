import firebase from "firebase";

export default class TaskTypesService {
    static async addType(type, company_guid) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('stages')
                .add({...type, company_guid: company_guid})
                .then(res => {
                    TaskTypesService.updateFields(res.id, {uid: res.id})
                        .then(resolve)
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    static async getTypes(company_guid) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('stages')
                .where('company_guid', '==', company_guid)
                .get()
                .then(response => {
                    const stages = response.docs.map(r => r.data())
                    resolve(stages)
                })
                .catch(reject)
        })
    }

    static async updateFields(uid, fields) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('stages')
                .doc(uid)
                .update(fields)
                .then(resolve)
                .catch(reject)
        })

    }

    static async getTaskTypesCascade(company_guid) {
        return new Promise((resolve, reject) => {
            TaskTypesService.getTypes(company_guid)
                .then(response => {
                    const options = response.map(t => {
                        return {
                            label: t.name,
                            value: t.uid,
                            children: t.stages.map(s => {
                                return {
                                    label: s.name,
                                    value: s.index,
                                }
                            })
                        }
                    })
                    resolve(options)
                })
                .catch(reject)
        })
    }
}