import { db } from './firebaseConfig';
import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';

// Listen for changes in user's tasks
export const onUserTasksChange = (userId, callback) => {
    const userDoc = doc(db, 'users', userId);
    const ownedTasksCollection = collection(userDoc, 'OwnedTasks');
    const assignedTasksCollection = collection(userDoc, 'AssignedTasks');

    const unsubscribeOwned = onSnapshot(ownedTasksCollection, (snapshot) => {
        const ownedTasks = snapshot.docs.map(doc => ({ taskPath: doc.data().filePath, taskId: doc.id }));
        callback(ownedTasks);
    });

    const unsubscribeAssigned = onSnapshot(assignedTasksCollection, (snapshot) => {
        const assignedTasks = snapshot.docs.map(doc => ({ taskPath: doc.data().filePath, taskId: doc.id }));
        callback(assignedTasks);
    });

    return () => {
        unsubscribeOwned();
        unsubscribeAssigned();
    };
};

// Listen for changes in task state
export const onTaskStateChange = (taskPath, callback) => {
    const taskDoc = doc(db, taskPath);

    const unsubscribe = onSnapshot(taskDoc, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            if (data.State) {
                callback(data.State);
            }
        }
    });

    return unsubscribe;
};

// Listen for new chat messages
export const onChatMessagesChange = (taskPath, callback) => {
    const chatCollection = collection(db, `${taskPath}/chat`);

    const unsubscribe = onSnapshot(chatCollection, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                const message = change.doc.data();
                callback(message);
            }
        });
    });

    return unsubscribe;
};
