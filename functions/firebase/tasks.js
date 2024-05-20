import {collection, doc, getDocs, getDoc, setDoc, where, query, deleteDoc, updateDoc, Timestamp} from 'firebase/firestore';
import { db, auth } from '../../src/config/firebaseConfig';

export const fetchOwnedUserTasks = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to fetch tasks.");
    }
    const userID = user.uid;

    try {
        // Fetch task references from the user's tasks subcollection
        const userTasksRef = collection(db, 'users', userID, 'OwnedTasks');
        const userTasksSnapshot = await getDocs(userTasksRef);

        // Fetch task documents based on the references
        const tasksPromises = userTasksSnapshot.docs.map(async (docSnapshot) => {
            const taskPath = docSnapshot.data().taskPath;
            const taskDocRef = doc(db, taskPath);
            const taskDoc = await getDoc(taskDocRef);
            return { id: taskDoc.id, ...taskDoc.data() };
        });

        const tasks = await Promise.all(tasksPromises);

        console.log('Fetched user tasks: ', tasks);
        return tasks;
    } catch (error) {
        console.error("Error fetching user tasks: ", error);
        throw new Error('Failed to fetch user tasks');
    }
};

export const fetchAssignedUserTasks = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to fetch tasks.");
    }
    const userID = user.uid;

    try {
        // Fetch task references from the user's tasks subcollection
        const userTasksRef = collection(db, 'users', userID, 'AssignedTasks');
        const userTasksSnapshot = await getDocs(userTasksRef);

        // Fetch task documents based on the references
        const tasksPromises = userTasksSnapshot.docs.map(async (docSnapshot) => {
            const taskPath = docSnapshot.data().taskPath;
            const taskDocRef = doc(db, taskPath);
            const taskDoc = await getDoc(taskDocRef);
            return { id: taskDoc.id, ...taskDoc.data() };
        });

        const tasks = await Promise.all(tasksPromises);

        console.log('Fetched user tasks: ', tasks);
        return tasks;
    } catch (error) {
        console.error("Error fetching user tasks: ", error);
        throw new Error('Failed to fetch user tasks');
    }
};