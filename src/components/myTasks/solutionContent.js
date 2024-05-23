import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getLoggedInUser, updateSolution, updateTaskStatus } from '../../firebase/solution'; // Adjust the path as necessary

const SolutionContent = ({ task, onSolutionUpdate, handleSwitchTask}) => {
    const [solution, setSolution] = useState(task.Solution || '');
    const [isEditing, setIsEditing] = useState(false);
    const currentUser = getLoggedInUser();

    useEffect(() => {
        setSolution(task.Solution || '');
    }, [task.Solution]);

    const handleSolutionChange = (text) => {
        setSolution(text);
    };

    const handleSaveSolution = async () => {
        try {
            await updateSolution(task.BoardID, task.CourseID, task.id, solution);
            await updateTaskStatus(task.BoardID, task.CourseID, task.id, 'Pending');
            setIsEditing(false);
            onSolutionUpdate && onSolutionUpdate(solution);
            handleSwitchTask();
        } catch (error) {
            console.error('Error saving solution:', error);
        }
    };

    const handleCancelTask = async () => {
        try {
            await updateTaskStatus(task.BoardID, task.CourseID, task.id, 'Canceled');
            console.log('Task canceled');
            handleSwitchTask();
        } catch (error) {
            console.error('Error canceling task:', error);
        }
    };

    const handleAcceptSolution = async () => {
        try {
            await updateTaskStatus(task.BoardID, task.CourseID, task.id, 'Completed');
            console.log('Solution accepted');
            handleSwitchTask();
        } catch (error) {
            console.error('Error accepting solution:', error);
        }
    };

    const handleRejectSolution = () => {
        Alert.alert(
            "Reject Solution",
            "Do you want to allow the assignee to retry?",
            [
                {
                    text: "Yes",
                    onPress: () => console.log('Solution rejected, retry allowed')
                },
                {
                    text: "No, keep open",
                    onPress: async () => {
                        try {
                            await updateTaskStatus(task.BoardID, task.CourseID, task.id, 'Open');
                            console.log('Solution rejected, task kept open');
                        } catch (error) {
                            console.error('Error updating status to open:', error);
                        }
                    }
                },
                {
                    text: "No, cancel task",
                    onPress: async () => {
                        try {
                            await updateTaskStatus(task.BoardID, task.CourseID, task.id, 'Canceled');
                            console.log('Solution rejected, task canceled');
                            handleSwitchTask();
                        } catch (error) {
                            console.error('Error updating status to canceled:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Solution</Text>
            {currentUser === task.Assignee ? (
                <View style={styles.solutionContainer}>
                    {isEditing ? (
                        <>
                            <ScrollView style={styles.scrollView}>
                                <TextInput
                                    style={styles.input}
                                    value={solution}
                                    onChangeText={handleSolutionChange}
                                    multiline
                                />
                            </ScrollView>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveSolution}>
                                    <Text style={styles.buttonText}>Post Solution</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setIsEditing(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <>
                            <ScrollView style={styles.scrollView}>
                                <Text style={styles.solutionText}>{solution}</Text>
                            </ScrollView>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={[styles.button, styles.cancelTaskButton]} onPress={handleCancelTask}>
                                    <Text style={styles.buttonText}>Cancel Task</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => setIsEditing(true)}>
                                    <Text style={styles.buttonText}>Edit Solution</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            ) : currentUser === task.CreatedBy ? (
                <View style={styles.solutionContainer}>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.solutionText}>{solution}</Text>
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAcceptSolution}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleRejectSolution}>
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.solutionText}>{solution}</Text>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    solutionContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 8,
        elevation: 2,
    },
    scrollView: {
        maxHeight: 300,
    },
    input: {
        height: 150,
        padding: 16,
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        textAlignVertical: 'top',
        marginBottom: 16,
    },
    solutionText: {
        fontSize: 16,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    acceptButton: {
        backgroundColor: '#28a745',
    },
    rejectButton: {
        backgroundColor: '#dc3545',
    },
    cancelTaskButton: {
        backgroundColor: '#dc3545',
    },
    editButton: {
        backgroundColor: '#007bff',
    },
    saveButton: {
        backgroundColor: '#28a745',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
});

export default SolutionContent;
