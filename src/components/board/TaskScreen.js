import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, TouchableHighlight, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { fetchTasks, createTask, applyForTask } from '../../firebase/bountyboard';
import { fetchBalance } from '../../firebase/balance';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for the back arrow

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
        <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>{selectedTask.Title}</Text>
            <ScrollView style={styles.detailsContent}>
                <Text>{selectedTask.Description}</Text>
                <Text style={styles.bountyText}>Bounty: {selectedTask.Bounty}</Text>
                <Text style={styles.createdAtText}>Created At: {new Date(selectedTask.CreatedAt).toLocaleDateString()}</Text>
            </ScrollView>
            <View style={styles.detailsButtonContainer}>
                <TouchableHighlight
                    style={[styles.detailsButton, styles.taskBackButton]}
                    onPress={() => setSelectedTask(null)}
                >
                    <Text style={styles.detailsButtonText}>Back to Tasks</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.detailsButton, styles.applyButton]}
                    onPress={handleApplyForTask}
                >
                    <Text style={styles.detailsButtonText}>Apply for Task</Text>
                </TouchableHighlight>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>{course.title}</Text>
            </View>
            {selectedTask ? (
                <TaskDetails />
            ) : (
                isBountyHunter ? <TaskList /> :
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
            )}
            {!selectedTask && (
                <View style={styles.footerContainer}>
                    <TouchableHighlight
                        style={[styles.footerButton, isBountyHunter && styles.selectedButton]}
                        onPress={() => setIsBountyHunter(true)}
                    >
                        <Text style={styles.footerButtonText}>Bounty Hunter</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={[styles.footerButton, !isBountyHunter && styles.selectedButton]}
                        onPress={() => setIsBountyHunter(false)}
                    >
                        <Text style={styles.footerButtonText}>Bounty Poster</Text>
                    </TouchableHighlight>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    title: {
        fontSize: 18,
    },
    backButton: {
        padding: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    footerButton: {
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#35aadc',
    },
    footerButtonText: {
        fontSize: 16,
    },
    detailsContainer: {
        flex: 1,
        padding: 20,
    },
    detailsTitle: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    detailsContent: {
        flex: 1,
    },
    bountyText: {
        fontSize: 16,
        marginVertical: 10,
    },
    createdAtText: {
        fontSize: 14,
        marginVertical: 10,
    },
    detailsButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    detailsButton: {
        flex: 1,
        padding: 15,
        borderRadius: 30,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    taskBackButton: {
        backgroundColor: 'red',
    },
    applyButton: {
        backgroundColor: 'green',
    },
    detailsButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default TaskScreen;
