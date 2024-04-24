import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const MapView = () => {
    const navigation = useNavigation();

    const mapHtmlContent = `
      <head>
    <meta name="viewport" id="vp" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
    <meta charset="utf-8" />


    <link rel="stylesheet" href="https://api.mazemap.com/js/v2.0.114/mazemap.min.css">
    <script type='text/javascript' src='https://api.mazemap.com/js/v2.0.114/mazemap.min.js'></script>

    <style>
        body { margin:0px; padding:0px; width: 100%; height:100%; }
    </style>
</head>
<body>
<div id="map" class="mazemap"></div>

<script>
    var map = new Mazemap.Map({
        // container id specified in the HTML
        container: 'map',

        campuses: 121,

        // initial position in lngLat format
        center: {lng: 13.270286316716465, lat: 52.502217640505705},

        // initial zoom
        zoom: 18,

        zLevel: 3
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new Mazemap.mapboxgl.NavigationControl());
</script>
</body>
    `;

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{ html: mapHtmlContent }}
                style={{ flex: 1 }}
            />
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('ListView')}
            >
                <Text style={styles.title}>List View</Text>
            </TouchableOpacity>
        </View>
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
    title: {
        fontSize: 18,
    }
});

export default MapView;