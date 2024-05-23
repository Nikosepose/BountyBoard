import { collection, addDoc, orderBy, query, onSnapshot, where } from "@firebase/firestore";
import { auth, db } from "./firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const sendMessage = async (text, assignee, createdBy, boardId, courseId, taskId) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to create a task.");
    }
    const UserID = user.uid;

    // Determine the recipient based on the logged-in user's role
    const receivedUserId = UserID === assignee ? createdBy : assignee;

    const newMessage = {
        type: 'sent',
        text: text,
        createdAt: new Date(),
        user: {
            _id: UserID,
            name: user.displayName || "Anonymous",
        },
        receivedUser: {
            _id: receivedUserId,
        }
    };

    try {
        await addDoc(collection(db, 'TaskManagement', boardId, 'Courses', courseId, 'AssignedTasks', taskId, 'chat'), {
            ...newMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        return newMessage;
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error;
    }
};

export const subscribeToMessages = (assignee, createdBy, callback, boardId, courseId, taskId) => {
    const user = auth.currentUser;
    if (!user) {
        console.log("User not authenticated");
        return;
    }

    const UserID = user.uid;

    // Determine the recipient based on the logged-in user's role
    const selectedUserId = UserID === assignee ? createdBy : assignee;

    const collectionRef = collection(db, 'TaskManagement', boardId, 'Courses', courseId, 'AssignedTasks', taskId, 'chat');
    const q = query(
        collectionRef,
        where('user._id', 'in', [UserID, selectedUserId]),
        where('receivedUser._id', 'in', [selectedUserId, UserID]),
        orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
        const loadedMessages = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            type: doc.data().user._id === UserID ? 'sent' : 'received',
        }));
        callback(loadedMessages);
    }, error => {
        console.error("Failed to fetch chat: ", error);
    });

    return unsubscribe;
};