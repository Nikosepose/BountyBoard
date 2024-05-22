import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import { fetchFiles, uploadFile } from '../../firebase/files'; // Adjust the path as necessary

const FilesContent = ({ task }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const getFiles = async () => {
            const filesList = await fetchFiles(task.BoardID, task.CourseID, task.id);
            setFiles(filesList);
        };

        getFiles();

        // Request permissions if necessary
        if (Platform.OS === 'android') {
            requestPermissions();
        }
    }, []);

    const requestPermissions = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need media library permissions to make this work!');
        }
    };

    const handleUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            console.log(result); // Log the result to see what properties it has

            if (result.canceled === false) {
                const newFile = await uploadFile(result, task.BoardID, task.CourseID, task.id);
                setFiles(prevFiles => [...prevFiles, newFile]);
            } else {
                console.error('Document picking was canceled or failed');
            }
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.fileItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => console.log('Download:', item.url)}>
                <Ionicons name="download" size={24} color="#6200ea" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={files}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
            <TouchableOpacity style={styles.fab} onPress={handleUpload}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    list: {
        paddingBottom: 80,
    },
    fileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6200ea',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FilesContent;