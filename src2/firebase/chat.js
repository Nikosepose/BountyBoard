import { collection, addDoc, orderBy, query, onSnapshot, where } from "@firebase/firestore";
import { auth, db } from "./firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const sendMessage = async (text, selectedUserId, boardId, courseId, taskId) => {
    const newMessage = {
        type: 'sent',
        text: text,
        createdAt: new Date(),
        user: {
            _id: auth?.currentUser?.uid,
            name: auth?.currentUser?.displayName || "Anonymous",
        },
        receivedUser: {
            _id: selectedUserId
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

export const subscribeToMessages = (selectedUserId, callback, boardId, courseId, taskId) => {
    if (!auth.currentUser) {
        console.log("User not authenticated");
        return;
    }

    const collectionRef = collection(db, 'TaskManagement', boardId, 'Courses', courseId, 'AssignedTasks', taskId, 'chat');
    const q = query(
        collectionRef,
        where('user._id', 'in', [auth.currentUser.uid, selectedUserId]),
        where('receivedUser._id', 'in', [selectedUserId, auth.currentUser.uid]),
        orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
        const loadedMessages = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            type: doc.data().user._id === auth.currentUser?.uid ? 'sent' : 'received',
        }));
        callback(loadedMessages);
    }, error => {
        console.error("Failed to fetch chat: ", error);
    });

    return unsubscribe;
};
