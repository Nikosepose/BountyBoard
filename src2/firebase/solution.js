import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig'; // Adjust the path as necessary


export const getLoggedInUser = () => {
    const user = auth.currentUser;
    return user ? user.uid : null;
};

// Function to update the solution in Firestore
export const updateSolution = async (boardId, courseId, taskId, solution) => {
    const taskRef =
        doc(db, 'TaskManagement', boardId,
            'Courses', courseId,
            'AssignedTasks', taskId);

    await updateDoc(taskRef, {
        Solution: solution,
    });
};