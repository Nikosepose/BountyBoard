import { db } from './firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

export const getAllUsers = async () => {
    try {
        const qs = await getDocs(collection(db, 'users'));
        return qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Firebase error: ", error);
        throw error;
    }
};
