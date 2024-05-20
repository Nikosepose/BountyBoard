import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import boardsData from '../../data/data.json';
import { createTask, fetchTasks, applyForTask } from "../../../functions/firebase/bountyboard";

const ListView = () => {
    const [activeBoards, setActiveBoards] = useState(boardsData.boards);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isBountyHunter, setIsBountyHunter] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleBountyHunterMode = () => setIsBountyHunter(!isBountyHunter);

    const selectBoard = board => {
        setSelectedBoard(board);
        setSelectedCourse(null);
    };

    const selectCourse = course => {
        setSelectedCourse(course);
        fetchCourseTasks(course.id);
    };

    const fetchCourseTasks = async (courseID) => {
        if (!selectedBoard) return;
        setIsLoading(true);
        try {
            const fetchedTasks = await fetchTasks(selectedBoard.id, courseID);
            setTasks(fetchedTasks);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostTask = async () => {
        if (!taskTitle || !taskDescription) {
            Alert.alert("Error", "Please enter both a task title and description.");
            return;
        }
        try {
            await createTask(selectedBoard.id, selectedCourse.id, taskTitle, taskDescription);
            fetchCourseTasks(selectedCourse.id); // Refresh tasks after posting
            setTaskTitle('');
            setTaskDescription('');
            Alert.alert("Task Posted", taskDescription);
        } catch (error) {
            Alert.alert("Error posting task", error.message);
        }
    };

    const handleApplyForTask = async () => {
        try {
            await applyForTask(selectedBoard.id, selectedCourse.id, selectedTask.id); // Assumes applyForTask method is defined
            Alert.alert("Success", "You have successfully applied for the task.");
            setSelectedTask(null);
        } catch (error) {
            Alert.alert("Error", "Failed to apply for the task.");
        }
    };

    const TaskForm = () => (
        <View style={styles.form}>
            <TextInput style={styles.input} onChangeText={setTaskTitle} value={taskTitle} placeholder="Enter task title" />
            <TextInput style={styles.input} onChangeText={setTaskDescription} value={taskDescription} placeholder="Enter task description" />
            <Button title="Post Task" onPress={handlePostTask} />
        </View>
    );

    const TaskList = () => isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
    ) : (
        <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => setSelectedTask(item)}>
                    <Text style={styles.title}>{item.Title}</Text>
                </TouchableOpacity>
            )}
        />
    );

    const TaskDetails = () => (
        <View style={styles.form}>
            <Text style={styles.header}>{selectedTask.Title}</Text>
            <Text>{selectedTask.Description}</Text>
            <Button title="Apply for Task" color="green" onPress={handleApplyForTask} />
            <Button title="Go Back to Tasks" color="red" onPress={() => setSelectedTask(null)} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {!selectedBoard ? (
                <FlatList
                    data={activeBoards}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => selectBoard(item)}>
                            <Text style={styles.title}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : !selectedCourse ? (
                <FlatList
                    data={selectedBoard.courses}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => selectCourse(item)}>
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : selectedTask ? (
                <TaskDetails />
            ) : (
                <View>
                    <Text style={styles.header}>{selectedCourse.title}</Text>
                    {isBountyHunter ? <TaskList /> : <TaskForm />}
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button title={isBountyHunter ? "Switch to Bounty Poster" : "Switch to Bounty Hunter"} onPress={toggleBountyHunterMode} />
                {selectedCourse && (
                    <Button title="Back to Courses" onPress={() => setSelectedCourse(null)} />
                )}
                {selectedBoard && !selectedCourse && (
                    <Button title="Back to Boards" onPress={() => setSelectedBoard(null)} />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    header: {
        fontSize: 24,
        padding: 20,
        textAlign: 'center',
    },
    form: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
});

export default ListView;
