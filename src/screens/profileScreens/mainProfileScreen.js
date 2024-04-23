import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const MainProfileScreen = () => {
    // Dummy data for user profile
    const userInfo = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        profileImage: 'https://via.placeholder.com/150'
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={{ uri: userInfo.profileImage }} style={styles.profilePic} />
                <Text style={styles.name}>{userInfo.name}</Text>
                <Text style={styles.email}>{userInfo.email}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75, // Makes it round
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
});

export default MainProfileScreen;
