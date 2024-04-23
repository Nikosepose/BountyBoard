// Import necessary components
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

const MainLeaderBoardScreen = () => {
    // Dummy data for the leaderboard
    const data = [
        { id: 1, name: 'Alice', score: 5000 },
        { id: 2, name: 'Bob', score: 4000 },
        { id: 3, name: 'Charlie', score: 3000 },
        // Add more entries as needed
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Leaderboard</Text>
            <ScrollView style={styles.listContainer}>
                {data.map((user, index) => (
                    <View key={user.id} style={styles.listItem}>
                        <Text style={styles.rank}>{index + 1}</Text>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.score}>{user.score}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContainer: {
        marginBottom: 20,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    }
});

export default MainLeaderBoardScreen;
