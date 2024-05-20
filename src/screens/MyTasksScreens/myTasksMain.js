import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { fetchOwnedUserTasks, fetchAssignedUserTasks } from "../../../functions/firebase/tasks";

const MyTasksMain = () => {
    const [selectedButton, setSelectedButton] = useState('Helped');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        if (selectedButton === 'Helped') {
            setLoading(true);
            try {
                const tasks = await fetchOwnedUserTasks();
                setTasks(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        }
        else if (selectedButton === 'Helper') {
            setLoading(true);
            try {
                const tasks = await fetchAssignedUserTasks();
                setTasks(tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [selectedButton]);

    const renderTaskItem = ({ item }) => (
        <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.Title}</Text>
            <Text style={styles.taskDescription}>{item.Description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'Helped' && styles.selectedButton
                    ]}
                    onPress={() => setSelectedButton('Helped')}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedButton === 'Helped' && styles.selectedButtonText
                    ]}>
                        Helped
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'Helper' && styles.selectedButton
                    ]}
                    onPress={() => setSelectedButton('Helper')}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedButton === 'Helper' && styles.selectedButtonText
                    ]}>
                        Helper
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                {loading ? (
                    <Text>Loading tasks...</Text>
                ) : (
                    <FlatList
                        data={tasks}
                        renderItem={renderTaskItem}
                        keyExtractor={item => item.id}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    },
    listContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 20,
    },
    taskItem: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

export default MyTasksMain;
