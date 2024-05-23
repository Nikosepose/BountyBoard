import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import boardsData from '../../data/data.json';

const BoardSelectionScreen = ({ navigation }) => {
    const selectBoard = (board) => {
        navigation.navigate('CourseSelection', { board });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={boardsData.boards}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => selectBoard(item)}>
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 18,
    },
});

export default BoardSelectionScreen;
