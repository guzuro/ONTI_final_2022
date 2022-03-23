import firebase from "firebase";

export default class EmployeeService {

    static async getEmployees(userUid, companyGuid) {
        return new Promise((resolve, reject) => {
            firebase
                .firestore()
                .collection('users')
                .where('company_guid', '==', companyGuid)
                .where('uid', '!=', userUid)
                .get()
                .then((response) => {
                    if (response.size > 0) {
                        const users = response.docs.map(d => d.data())
                        resolve(users)
                    } else {
                        resolve([])
                    }
                })
                .catch(reject)
        })
    }

}