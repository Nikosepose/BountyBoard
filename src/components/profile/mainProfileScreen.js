import React, { useEffect, useState, useCallback  } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { getUserData, updateUserData } from '../../firebase/user';
import { auth } from '../../firebase/firebaseConfig';

const MainProfileScreen = ({ onLogout }) => {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedLineOfStudy, setUpdatedLineOfStudy] = useState('');
    const [bio, setBio] = useState('');

    useFocusEffect(
        useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const uid = auth.currentUser?.uid;
                    if (uid) {
                        const data = await getUserData(uid);
                        setUserData(data);
                        setUpdatedEmail(data.email);
                        setUpdatedLineOfStudy(data.lineOfStudy);
                        setBio(data.bio || '');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }, [])
    );

    const handleLogout = async () => {
        try {
            await onLogout();
            Alert.alert("Logged Out", "You have been logged out successfully.");
        } catch (error) {
            Alert.alert("Logout Failed", error.message);
        }
    };

    const handleSave = async () => {
        try {
            const uid = auth.currentUser?.uid;
            if (uid) {
                await updateUserData(uid, { email: updatedEmail, lineOfStudy: updatedLineOfStudy, bio });
                setUserData({ ...userData, email: updatedEmail, lineOfStudy: updatedLineOfStudy, bio });
                setIsEditing(false);
                Alert.alert("Profile Updated", "Your profile has been updated successfully.");
            }
        } catch (error) {
            Alert.alert("Update Failed", error.message);
        }
    };

    if (isEditing) {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.profileHeader}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={updatedEmail}
                        onChangeText={setUpdatedEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Line of Study"
                        value={updatedLineOfStudy}
                        onChangeText={setUpdatedLineOfStudy}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Bio"
                        value={bio}
                        onChangeText={setBio}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Text style={styles.name}>{userData.firstName} {userData.surName}</Text>
                <Text style={styles.email}>{userData.email}</Text>
                <Text style={styles.field}>Line of Study: {userData.lineOfStudy}</Text>
                <Text style={styles.field}>Balance: {userData.Balance}</Text>
                <Text style={styles.field}>Bio: {userData.bio}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        alignItems: 'center',
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 18,
        color: '#666',
        marginTop: 4,
    },
    field: {
        fontSize: 18,
        color: '#666',
        marginTop: 4,
    },
    actions: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});

export default MainProfileScreen;
