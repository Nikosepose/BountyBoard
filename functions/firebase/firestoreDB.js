import {collection, doc, getDocs, setDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../src/config/firebaseConfig';

export const fetchBountyBoards = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "BountyBoards"));
        const bountyBoardArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return bountyBoardArray;
    } catch (error) {
        console.error("Error fetching BountyBoards: ", error);
        throw new Error(error);
    }
};

export const fetchCourses = async (boardId) => {
    try {
        const querySnapshot = await getDocs(collection(db, "BountyBoards", boardId, "Courses"));
        const coursesArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return coursesArray;
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