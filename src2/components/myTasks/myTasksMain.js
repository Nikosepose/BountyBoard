import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchOwnedUserTasks, fetchAssignedUserTasks, fetchPendingTasks, deleteTask } from "../../firebase/tasks";

const MyTasksMain = () => {
    const [selectedButton, setSelectedButton] = useState('Owned');
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchTasks = async () => {
        setLoading(true);
        try {
            let tasks;
            if (selectedButton === 'Owned') {
                tasks = await fetchOwnedUserTasks();
            } else if (selectedButton === 'Assigned') {
                tasks = await fetchAssignedUserTasks();
            } else if (selectedButton === 'Pending') {
                tasks = await fetchPendingTasks();
            }
            setTasks(tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [selectedButton]);

    const handleTaskPress = (task) => {
        if (selectedButton === 'Pending') {
            Alert.alert(
                "Delete Task",
                "Do you want to delete this task?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        onPress: () => handleDeleteTask(task)
                    }
                ]
            );
        } else {
            navigation.navigate('TaskSelect', { task });
        }
    };

    const handleDeleteTask = async (task) => {
        try {
            await deleteTask(task.BoardID, task.CourseID, task.id);
            fetchTasks(); // Refresh the tasks list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const renderTaskItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleTaskPress(item)}>
            <View style={styles.taskItem}>
                <Text style={styles.taskTitle}>{item.Title}</Text>
                <Text style={styles.taskDescription}>{item.Description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'Pending' && styles.selectedButton
                    ]}
                    onPress={() => setSelectedButton('Pending')}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedButton === 'Pending' && styles.selectedButtonText
                    ]}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'Owned' && styles.selectedButton
                    ]}
                    onPress={() => setSelectedButton('Owned')}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedButton === 'Owned' && styles.selectedButtonText
                    ]}>
                        Owned
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedButton === 'Assigned' && styles.selectedButton
                    ]}
                    onPress={() => setSelectedButton('Assigned')}
                >
                    <Text style={[
                        styles.buttonText,
                        selectedButton === 'Assigned' && styles.selectedButtonText
                    ]}>
                        Assigned
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
