import { getDatabase, ref, set, get, child, onValue, remove } from "firebase/database";

export default class FireBaseService {

    async postData(url, data, error) {
        try {
            const db = getDatabase();
          
            await set(ref(db, url), data);
        } catch (err) {
            error();
        }
    }

    async removeData(url, error) {
        try {
            const db = getDatabase();
            const deleteRef = ref(db, url);
    
            remove(deleteRef);
        } catch (err) {
            error();
        }
    }

    listenChangingData(url, func, error) {
        try {
            const db = getDatabase();
            const currentRef = ref(db, url);
    
            onValue(currentRef, (snapshot) => {
                const data = Object.values(snapshot.val());
                func(data);
            });
        } catch (err) {
            error();
        }
    }

    async getData(url) {
        const dbRef = ref(getDatabase());

        return await get(child(dbRef, url))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return Object.values(snapshot.val());
                } else {
                    console.error(`Невозможно получить данные из: ${url}`);
                }
            }).catch((error) => {
                console.error(`Ошибка при получении данных из: ${url}. ${error}`);
            });
    }
}