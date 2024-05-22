import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { fetchTasks, createTask, applyForTask } from '../../firebase/bountyboard';
import { fetchBalance } from '../../firebase/balance';

const TaskScreen = ({ route, navigation }) => {
    const { board, course } = route.params;
    const [balance, setBalance] = useState(0);
    const [isBountyHunter, setIsBountyHunter] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        const getBalance = async () => {
            try {
                const userBalance = await fetchBalance();
                setBalance(userBalance);
                setSliderValue(userBalance); // Set slider value to balance initially
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        getBalance();
        fetchCourseTasks(course.id);
    }, [course.id]);

    const fetchCourseTasks = async (courseID) => {
        setIsLoading(true);
        try {
            const fetchedTasks = await fetchTasks(board.id, courseID);
            setTasks(fetchedTasks);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostTask = async () => {
        if (!taskTitle || !taskDescription || sliderValue <= 0) {
            alert("Please enter a task title, description, and a valid bounty.");
            return;
        }
        try {
            await createTask(board.id, course.id, taskTitle, taskDescription, sliderValue);
            fetchCourseTasks(course.id);
            setTaskTitle('');
            setTaskDescription('');
            setSliderValue(0); // Reset slider value after posting the task
            alert("Task Posted");
            navigation.navigate('BoardSelection');
        } catch (error) {
            alert("Error posting task: " + error.message);
        }
    };

    const handleApplyForTask = async () => {
        try {
            await applyForTask(board.id, course.id, selectedTask.id);
            alert("You have successfully applied for the task.");
            setSelectedTask(null);
            navigation.navigate('BoardSelection');
        } catch (error) {
            alert("Failed to apply for the task: " + error.message);
        }
    };

    const toggleBountyHunterMode = () => setIsBountyHunter(!isBountyHunter);

    const TaskForm = () => (
        <View style={styles.form}>
            <TextInput style={styles.input} onChangeText={setTaskTitle} value={taskTitle} placeholder="Enter task title" />
            <TextInput style={styles.input} onChangeText={setTaskDescription} value={taskDescription} placeholder="Enter task description" />
            <View style={styles.sliderContainer}>
                <Text>Bounty: {sliderValue}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={balance}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    step={1}
                />
            </View>
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
            <Button title="Apply for Task" onPress={handleApplyForTask} />
            <Button title="Back to Tasks" onPress={() => setSelectedTask(null)} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>{course.title}</Text>
            {selectedTask ? (
                <TaskDetails />
            ) : (
                isBountyHunter ? <TaskList /> : <TaskForm />
            )}
            <View style={styles.buttonContainer}>
                <Button title={isBountyHunter ? "Switch to Bounty Poster" : "Switch to Bounty Hunter"} onPress={toggleBountyHunterMode} />
                <Button title="Back to Courses" onPress={() => navigation.goBack()} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    sliderContainer: {
        marginVertical: 20,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default TaskScreen;
