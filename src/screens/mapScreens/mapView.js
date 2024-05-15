import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function MapView() {

  const [isExpanded, setIsExpanded] = useState(false);
    const navigation = useNavigation();

    const htmlContent = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width" />
            <meta charset="utf-8" />
        
        
            <link rel="stylesheet" href="https://api.mazemap.com/js/v2.0.114/mazemap.min.css">
            <script type='text/javascript' src='https://api.mazemap.com/js/v2.0.114/mazemap.min.js'></script>
        
            <style>
                body { margin:0px; padding:0px; width: 100%; height:100%; }
            </style>
            
        <script>
        document.body.onclick = function() {
          window.ReactNativeWebView.postMessage('toggleExpand');
        }
        </script>
        </head>
        <body>
            <div id="map" class="mazemap"></div>
        
            <script>
            // Making the map itself:
                var map = new Mazemap.Map({
                    // container id specified in the HTML
                    container: 'map',
        
                    campuses: 225,
        
                    // initial position in lngLat format
                    center: {lng: 8.577798, lat: 58.334712},
        
                    // initial zoom
                    zoom: 18,
        
                    zLevel: 1
                });
                
                
                var lngLat = map.getCenter();
                
                // Making a marker on the map. Just a dummy marker at the center coordinates.
                var marker = new Mazemap.MazeMarker({
                    zLevel: 1 // The floor zLevel coordinate is given
                })
                .setLngLat( lngLat ) // Set the LngLat coordinates
                .addTo(map); // Add to the map
                
                // On map load, put the bluedot GPS marker.
                map.on('load', function () {
                    window.blueDot = new Mazemap.BlueDot({
                    map: map,
                    })
                    // Setting the different variables for it.
                    .setZLevel(1)
                    .setAccuracy(10)
                    .setLngLat(map.getCenter())
                    .setBearingAccuracy(90)
                    .setBearing(0)
                    .showBearingHint()
                    .show();
                    
                    map.on('click', onMapClick);
                    
                    /*
                    //lng: 8.577504329069455 lat: 58.334270126257564
                    //lng: 8.577812217872605 lat: 58.334289614842874
                    //lng: 8.57763562725691 lat: 58.33408541638022
                    //lng: 8.577312848081306 lat: 58.3343450577965
                     */
                    
                    map.highlighter = new Mazemap.Highlighter( map, {
                        showOutline: true, // optional
                        showFill: true, // optional
                        outlineColor: Mazemap.Util.Colors.MazeColors.MazeBlue, // optional
                        fillColor: Mazemap.Util.Colors.MazeColors.MazeBlue  // optional
                    } );
                    
                    // Predefined Points of Interest:
                    onMapClick({lngLat: {lng: 8.577504329069455, lat: 58.334270126257564}});
                    onMapClick({lngLat: {lng: 8.577812217872605, lat: 58.334289614842874}});
                    //onMapClick({lngLat: {lng: 8.57763562725691, lat: 58.33408541638022}});
                    //onMapClick({lngLat: {lng: 8.577312848081306, lat: 58.3343450577965}});
                    
                    map.layerEventHandler.on('click', 'custom-polygon-layer', (e, features) => {
                        console.log('@@@ clicked custom-polygon-layer features: ', features);
                        var topFeature = features[0];
                        window.ReactNativeWebView.postMessage('navigateToListView');
                });
                    
                map.on('zlevel', redrawPolygons);
                redrawPolygons();
                   
                });
                
                function redrawPolygons() {
                    var zLevel = map.getZLevel();
        
                    var filteredFeatures = CUSTOM_FEATURES.filter( feature => feature.properties.zLevel === zLevel );
        
                    map.getSource("custom-polygon-layer").setData({type: "FeatureCollection", features: filteredFeatures});
                }
                
                function findCoords(e)
                {
                    var lngLat = e.lngLat;
                    var zLevel = map.zLevel;
                    
                    alert("lng: " + lngLat.lng + ",  lat: " + lngLat.lat)
                }
                
                function addMarker(zLevel, lngLat, imgURL="")
                {
                    new Mazemap.MazeMarker({
                        zLevel: 1,
                        size: 100,
                        imgUrl: imgURL,
                        imgScale: 1,
                        innerCircleScale: 0.4
                        
                    })
                    .setLngLat(lngLat)
                    .addTo(map);
                }
                
                function onMapClick(e)
                {
                    // un-highlight any already highlighted rooms
                    //map.highlighter.clear();
        
                    var lngLat = e.lngLat;
                    var zLevel = map.zLevel;
        
                    // Fetching via Data API
                    // NB: Adding optional campusId parameter, makes lookup much faster, but can be omitted
                    Mazemap.Data.getPoiAt(lngLat, zLevel).then( poi => {
                        // Run custom highlight function
                        highlightRoom(poi);
                        console.log(poi);
        
                    }).catch( function(){ return false; } );
                }
                
                
                
                
                function highlightRoom(poi)
                {
                    var lngLat = Mazemap.Util.getPoiLngLat(poi);
        
                    // If the POI has a polygon, use the default 'highlight' function to draw a marked outline around the POI.
                    if(poi.geometry.type === "Polygon"){
                        map.highlighter.highlight(poi);
                    }
                    // map.flyTo({center: lngLat, speed: 0.5});
                }
        
                function setBlueDotZLevel(zLevel) {
                    blueDot.setZLevel(zLevel);
                }
        
                function throttle(fn, threshold) {
                    threshold = threshold || 250;
                    var last, deferTimer;
        
                    return function () {
                        var now = +new Date, args = arguments;
                        if (last && now < last + threshold) {
                            clearTimeout(deferTimer);
                            deferTimer = setTimeout(function () {
                                last = now;
                                fn.apply(this, args);
                            }, threshold);
                        } else {
                            last = now;
                            fn.apply(this, args);
                        }
                    }
                }
        
                const throttledAnimateLngLat = throttle((lngLat) => {
                    blueDot.setLngLat(lngLat, {animate: true});
                }, 400);
                
                /*Mazemap.Data.getPoiAt(lngLat, zLevel).then( poi => {
                // Run custom highlight function
                highlightRoom(poi);*/
                
                addMarker(1, {lng: 8.578798, lat: 58.334712}, "https://i1.sndcdn.com/avatars-xTn7g3zaC84sIgRY-E68SrA-t240x240.jpg");
        
        
                // Add zoom and rotation controls to the map.
                map.addControl(new Mazemap.mapboxgl.NavigationControl());
                
            </script>
        </body>
    </html>
    `;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded); // Toggle the expansion state
    };

  return (
      <View style={styles.container}>
          <View >
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={isExpanded ? styles.expandedWebview : styles.webview}
                javaScriptEnabled={true}
                allowContentAccess={true}
                allowFileAccessFromFileURLs={true}
                allowUniversalAccessFromFileURLs={true}
                allowsProtectedMedia={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                mixedContentMode="always"
                onMessage={(event) => {
                    if (event.nativeEvent.data === 'toggleExpand') {
                        toggleExpansion();
                    } else if (event.nativeEvent.data === 'navigateToListView') {
                        navigation.navigate('ListView', {screen: 'listView'});
                    }
                }}
                onError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.error('WebView error: ', nativeEvent);
                }}
                onHttpError={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.error('HTTP error: ', nativeEvent.statusCode);
                }}

            />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    webview: {
        flex: 1,
    },
    expandedWebview: {
        flex: 1,
    }
});