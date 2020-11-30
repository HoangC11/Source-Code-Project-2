
import { openDatabase, } from 'react-native-sqlite-storage'

var db = openDatabase({ name: 'QuanLySoSach.db', createFromLocation: '~QuanLySoSach.db' }, () => { console.log('succesDB ....') }, (error) => { console.log('error DB .....:' + error) });

async function callDB(sql) {
    try {
        return new Promise((resolve, reject) => {
            db.transaction((txn) => {
                txn.executeSql(
                    sql,
                    [],
                    (tx, res) => {
                        // console.log('sqlExecuteResRow: ', res.rows)
                        if (res.rows.length > 0) {
                            let arr = []
                            for (let i = 0; i < res.rows.length; i++) {
                                arr.push(res.rows.item(i))
                            }
                            resolve(arr)
                        } else {
                            resolve(undefined)
                        }
                    }
                );
            });
        })
    } catch (error) {
        console.log('errorSQL: ', error)
        return undefined
    }
}


export { callDB }