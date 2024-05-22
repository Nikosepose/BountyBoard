import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

export const fetchBalance = async () => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user logged in");
        throw new Error("You must be logged in to check balance.");
    }
    const UserID = user.uid; // Retrieve the user ID of the logged-in user

    try {
        const userDocRef = doc(db, 'users', UserID);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.Balance; // Return only the balance
        } else {
            console.error("No such document!");
            throw new Error("No user data found.");
        }
    } catch (error) {
        console.error("Error fetching balance: ", error);
        throw new Error('Failed to fetch balance');
    }
};
