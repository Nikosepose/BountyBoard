import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CourseSelectionScreen = ({ route, navigation }) => {
    const { board } = route.params;

    const selectCourse = (course) => {
        navigation.navigate('TaskScreen', { board, course });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{board.name}</Text>
            <FlatList
                data={board.courses}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => selectCourse(item)}>
                        <Text style={styles.title}>{item.title}</Text>
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
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
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

export default CourseSelectionScreen;
