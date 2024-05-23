import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db, auth } from '../../firebase/firebaseConfig';

const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surName, setSurName] = useState('');
    const [lineOfStudy, setLineOfStudy] = useState('');
    const [isSignUp, setIsSignUp] = useState(true); // Toggle between SignUp and Login

    const authHandler = () => {
        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // User signed in
                    console.log(userCredential);
                    // Create a user profile in Firestore
                    const userRef = doc(db, "users", userCredential.user.uid);
                    setDoc(userRef, {
                        email: email,
                        firstName: firstName,
                        surName: surName,
                        lineOfStudy: lineOfStudy,
                        createdAt: new Date()
                    }).then(() => {
                        console.log("User profile created in Firestore");
                    }).catch(error => {
                        console.error("Error writing document: ", error);
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    // User signed in
                    console.log(userCredential);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            {isSignUp && (
                <>
                    <TextInput
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Surname"
                        value={surName}
                        onChangeText={setSurName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Line of Study"
                        value={lineOfStudy}
                        onChangeText={setLineOfStudy}
                        style={styles.input}
                    />
                </>
            )}
            <Button title={isSignUp ? "Sign Up" : "Login"} onPress={authHandler} />
            <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                onPress={() => setIsSignUp(!isSignUp)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default AuthScreen;
