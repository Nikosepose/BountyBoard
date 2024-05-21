import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailsContent = ({ task }) => {
    const createdAt = task.createdAt.toDate();  // Convert Firestore timestamp to JavaScript Date

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.Title}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.description}>{task.Description}</Text>

            <Text style={styles.label}>Payment:</Text>
            <Text style={styles.info}>${task.Payment}</Text>

            <Text style={styles.label}>Task Created On:</Text>
            <Text style={styles.info}>{createdAt.toLocaleDateString()} {createdAt.toLocaleTimeString()}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginTop: 15,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
});

export default DetailsContent;
