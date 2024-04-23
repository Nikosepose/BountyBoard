import {collection, doc, getDocs, setDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../src/config/firebaseConfig';

export const fetchBountyBoards = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "BountyBoards"));
        const BountyBoardArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return BountyBoardArray;
    } catch (error) {
        console.error("Error fetching BountyBoards: ", error);
        throw new Error(error);
    }
};

export const addBounty = async (courseID, courseName) => {
    try {
        await setDoc(doc(db, 'Courses', courseID), {
            CourseID: courseID,
            CourseName: courseName
        });
        return { success: true };
    } catch (error) {
        console.error("Error adding course: ", error);
        throw error;
    }
};