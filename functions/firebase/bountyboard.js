import {collection, doc, getDocs, setDoc, where, query, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../src/config/firebaseConfig';

export const createTask = async (boardID, courseID, UserID, title, description) => {
    try {
        await setDoc(doc(db, 'TaskManagement', boardID, 'Courses', courseID),  {
            CourseID: courseID,
            Title: title,
            Description: description,
            Assignee: ""
        });
    } catch (error) {
        console.error("Error posting task: ", error);
        throw new Error(error);
    }
};

export const fetchTasks = async (boardID, courseID) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'BountyBoards', boardID, 'Courses', courseID));
        const tasksArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return tasksArray;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw new Error(error);
    }
};
