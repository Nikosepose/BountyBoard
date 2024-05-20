import {collection, doc, getDocs, setDoc, where, query, deleteDoc, Timestamp} from 'firebase/firestore';
import { db, auth } from '../../src/config/firebaseConfig';

export const createTask = async (boardID, courseID, taskTitle, taskDescription) => {
    // Check if there is a logged-in user
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to create a task.");
    }
    const UserID = user.uid; // Retrieve the user ID of the logged-in user

    try {
        await setDoc(doc(db, 'TaskManagement', boardID, 'Courses', courseID, 'OpenTasks', taskTitle), {
            CourseID: courseID,
            Title: taskTitle,
            Description: taskDescription,
            CreatedBy: UserID,
            Assignee: '',
            Status: 'Open',
            createdAt: Timestamp.now()
        });
        console.log("Task successfully created with User ID:", UserID);
    } catch (error) {
        console.error("Error posting task: ", error);
        throw new Error(error);
    }
};

export const fetchTasks = async (boardID, courseID) => {
    try {
        const tasksRef = collection(db, 'TaskManagement', boardID, 'Courses', courseID, 'OpenTasks');
        console.log("Tasks reference (tasksRef):", tasksRef);

        const querySnapshot = await getDocs(tasksRef);
        console.log("Query Snapshot:", querySnapshot);

        const tasksArray = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log("Tasks Array:", tasksArray);

        return tasksArray;
    } catch (error) {
        console.error("Error fetching tasks: ", error);
        throw new Error('Failed to fetch tasks');
    }
};

export const applyForTask = async (boardID, courseID, taskID) => {
    // Check if there is a logged-in user
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to create a task.");
    }
    const UserID = user.uid; // Retrieve the user ID of the logged-in user
    console.log("Applying with:", UserID, boardID, courseID, taskID);

};