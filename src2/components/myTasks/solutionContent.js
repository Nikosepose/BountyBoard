import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getLoggedInUser, updateSolution } from '../../firebase/solution'; // Adjust the path as necessary

const SolutionContent = ({ task, onSolutionUpdate }) => {
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
            setIsEditing(false);
            onSolutionUpdate && onSolutionUpdate(solution);
        } catch (error) {
            console.error('Error saving solution:', error);
        }
    };

    const handleAcceptSolution = () => {
        // Handle the acceptance logic
        console.log('Solution accepted');
    };

    const handleRejectSolution = () => {
        // Handle the rejection logic
        console.log('Solution rejected');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Solution</Text>
            {currentUser === task.Assignee ? (
                <View style={styles.solutionContainer}>
                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={solution}
                                onChangeText={handleSolutionChange}
                                multiline
                            />
                            <TouchableOpacity style={styles.button} onPress={handleSaveSolution}>
                                <Text style={styles.buttonText}>Save Solution</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.solutionText}>{solution}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                                <Text style={styles.buttonText}>Edit Solution</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            ) : currentUser === task.CreatedBy ? (
                <View style={styles.solutionContainer}>
                    <Text style={styles.solutionText}>{solution}</Text>
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
                <Text style={styles.solutionText}>{solution}</Text>
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
});

export default SolutionContent;
