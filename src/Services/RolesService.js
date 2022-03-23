import firebase from "firebase";

export default class RolesService {

    static async getRoles(company_guid) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('roles')
                .where('company_guid', "==", company_guid)
                .get()
                .then(response => {
                    if (response.size > 0) {
                        const roles = response.docs.map(d => d.data())
                        resolve(roles)
                    } else {
                        resolve([])
                    }
                })
                .catch(reject)
        })
    }

    static async createRole(role, companyGuid) {
        return new Promise((resolve, reject) => {
            firebase.firestore()
                .collection('roles')
                .add({...role, company_guid: companyGuid})
                .then(res => {
                    console.log(res)
                    RolesService.updateFields(res.id, {uid: res.id})
                        .then(resolve)
                        .catch(reject)
                })
                .catch(reject)
        })
    }

    static async updateFields(uid, fields) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('roles')
                .doc(uid)
                .update(fields)
                .then(resolve)
                .catch(reject)
        })

    }

    static async getRolesOptions(company_guid) {
        return new Promise(resolve => {
            RolesService.getRoles(company_guid)
                .then(response => {
                    const rolesOptions = response.map(r => {
                        return {
                            label: r.name,
                            value: r.uid
                        }
                    })
                    resolve(rolesOptions)
                })
        })

    }

}