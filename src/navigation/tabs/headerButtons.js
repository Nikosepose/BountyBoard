import React, { useState } from 'react';
import { Button, View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsStack from "../stacks/settingsStack";

const HeaderButtons = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
                name="notifications-outline"
                size={25}
                onPress={() => setModalVisible(true)}
            />
            <Ionicons
                name="settings-outline"
                size={25}
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate('Settings')}
            />

            {/* Modal for Notifications */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Notification 1</Text>
                        <Text style={styles.modalText}>Notification 2</Text>
                        <Text style={styles.modalText}>Notification 3</Text>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
});

export default HeaderButtons;
