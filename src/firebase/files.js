import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

// Function to fetch files from Firestore
export const fetchFiles = async (boardId, courseId, taskId) => {
    const querySnapshot = await getDocs(collection(db, 'TaskManagement', boardId, 'Courses', courseId, 'AssignedTasks', taskId, 'files'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to upload a file to Firebase Storage and save metadata to Firestore
export const uploadFile = async (file, boardId, courseId, taskId) => {
    const response = await fetch(file.uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `uploads/${file.name}`);
    const snapshot = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const docRef = await addDoc(collection(db, 'TaskManagement', boardId, 'Courses', courseId, 'AssignedTasks', taskId, 'files'), {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date()
    });

    return { id: docRef.id, name: file.name, url: downloadURL, uploadedAt: new Date() };
};
