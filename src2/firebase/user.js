// src/firebase/user.js
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

const getUserData = async (uid) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            throw new Error('User does not exist');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

const updateUserData = async (uid, updatedData) => {
    try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, updatedData);
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
};

export { getUserData, updateUserData };
