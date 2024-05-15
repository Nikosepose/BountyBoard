// Import necessary components
import { db } from '../../config/firebaseConfig'
import React, {useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import MaskedView from "@react-native-masked-view/masked-view";
import { GradientHeader } from "react-native-gradient-header";

import {
    Image,
    Dimensions,
    Animated,
} from 'react-native';
import {collection, getDocs} from "firebase/firestore";

const GradientText = (props) => {
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={["rgba(103,198,200,0.81)", "rgba(56,81,126,0.88)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};


export const getAllUsers = async () => {
    try {
        // Had to add "getDocs" and use this here syntax (getDocs(collection(db, 'users')) instead of
        // db.collection('users').get()
        const qs = await getDocs(collection(db, 'users'))
        return qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }   catch (daino) {
        console.error("Daino error: ", daino);
        throw daino;
    }
}

const colors = ["gold", "silver", "#CD7F32"]

const MainLeaderBoardScreen = () => {
    const [users, setUsers] = React.useState([]);


    useEffect(() => {
        const loadUsers = async() => {
            try {
                const usersData = await getAllUsers();
                setUsers(usersData);
            } catch (daino) {
                console.error("Daino Error effect:", daino);
            }
        };

        loadUsers();
    }, []);


    // Dummy data for the leaderboards
    /*const data = [
        { id: 1, icon: 'medal', name: 'Alice', score: 5000 },
        { id: 2, icon: 'medal', name: 'Bob', score: 4000 },
        { id: 3, icon: 'medal', name: 'Charlie', score: 3000 },
        { id: 4, icon: 'medal', name: 'Banana', score: 2000 },
        { id: 5, icon: 'medal', name: 'Apple', score: 1000 },
        { id: 6, icon: 'medal', name: 'Blueberry', score: 500 },
        { id: 7, icon: 'medal', name: 'Grapes', score: 400 },
        { id: 8, icon: 'medal', name: 'Applesin', score: 300 },
        { id: 9, icon: 'medal', name: 'Applesin', score: 200 },
        // Add more entries as needed
    ];*/

    return (
        <View style={styles.container}>
            <ScrollView style={styles.listContainer}>
                <LinearGradient colors={['rgba(103,198,198,0.81)', 'rgba(107,181,173,0.76)', 'rgba(56,81,126,0.88)']} style={styles.linearGradient}>
                    <Text style={styles.header}>
                        <GradientText style={styles.headerText}>Leaderboard</GradientText>
                        <MaterialCommunityIcons name="podium-gold" size={150} color="rgb(240, 192, 62)" />
                    </Text>
                    <Svg
                        height="115.9%"
                        width="100%"
                        viewBox="0 0 1440 320"
                        style={{ position: 'absolute', top: 164.55 }}
                    >
                        <Path
                            fill="rgba(56,81,126,0.88)"
                            d="M0,64L34.3,58.7C68.6,53,137,43,206,64C274.3,85,343,139,411,154.7C480,171,549,149,617,160C685.7,171,754,213,823,245.3C891.4,277,960,299,1029,266.7C1097.1,235,1166,149,1234,133.3C1302.9,117,1371,171,1406,197.3L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
                        />
                    </Svg>
                </LinearGradient>

                {users.map((user, index) => (
                    <View key={user.id} style={styles.listItem}>
                        <Text style={styles.rank}>{index + 1}</Text>
                        {index < 3 && (
                            <Ionicons style={{ ...styles.icon, color: colors[index % colors.length] }} name="medal-outline" />
                        )}

                        <Text style={styles.name}>{user.email}</Text>
                        <Text style={styles.score}>{(100 - 10*index)}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,254)',
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: 0,
    },

    headerText: {
        alignSelf: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'white',
    },

    header: {
        flex: 1,
        alignSelf: 'center',
        padding: 0,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        paddingTop: 40,
        paddingBottom: 20,
        paddingLeft: 90,
        paddingRight: 100,
        marginLeft: 14,
        marginRight: 14,
        marginHorizontal: 10,
        borderRadius: 0,
        color: 'white',
    },
    listContainer: {
        flex: 1,
        bottom: 0,
        //paddingTop: 70,
        //marginBottom: 30,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 20,
        paddingRight: 20,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 0,
        marginBottom: 15,
        borderRadius: 18,
        backgroundColor: 'rgba(210,244,241,0.62)',
        shadowColor: "rgba(0,0,0,0.83)",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 35,
        position: 'absolute',
        left: 40,
    },
    name: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    }
});

export default MainLeaderBoardScreen;
