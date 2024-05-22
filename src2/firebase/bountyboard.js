import {collection, doc, getDocs, setDoc, where, query, deleteDoc, updateDoc, Timestamp, addDoc} from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

export const createTask = async (boardID, courseID, taskTitle, taskDescription, bounty) => {
    // Check if there is a logged-in user
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to create a task.");
    }
    const UserID = user.uid; // Retrieve the user ID of the logged-in user

    try {
        const taskData = {
            BoardID: boardID,
            CourseID: courseID,
            Title: taskTitle,
            Description: taskDescription,
            Bounty: bounty,
            CreatedBy: UserID,
            Assignee: '',
            Status: 'Open',
            createdAt: Timestamp.now(),
            Solution: ''
        };

        const docRef = await addDoc(collection(db, 'TaskManagement', boardID, 'Courses', courseID, 'OpenTasks'), taskData);
        console.log("Task successfully created with ID:", docRef.id, "and User ID:", UserID);
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
        throw new Error("You must be logged in to apply for a task.");
    }
    const UserID = user.uid; // Retrieve the user ID of the logged-in user
    console.log("Applying with:", boardID, courseID, taskID);

    try {
        const taskRef = doc(db, 'TaskManagement', boardID, 'Courses', courseID, 'OpenTasks', taskID);

        // Update only the Assignee and Status fields
        await updateDoc(taskRef, {
            Assignee: UserID,
            Status: 'Assigned'
        });

        console.log("Task successfully updated with User ID:", UserID);
    } catch (error) {
        console.error("Error updating task: ", error);
        throw new Error('Failed to update task');
    }
};