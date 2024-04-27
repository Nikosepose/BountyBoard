import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MapView() {
  const htmlContent = `
        <!DOCTYPE html>
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
            
            // Making the map itself:
                var map = new Mazemap.Map({
                    // container id specified in the HTML
                    container: 'map',
        
                    campuses: 225,
        
                    // initial position in lngLat format
                    center: {lng: 8.577798, lat: 58.334712},
        
                    // initial zoom
                    zoom: 15.4,
        
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
                });
                
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
                
                
                addMarker(1, {lng: 8.578798, lat: 58.334712}, "https://i1.sndcdn.com/avatars-xTn7g3zaC84sIgRY-E68SrA-t240x240.jpg");
        
        
                // Add zoom and rotation controls to the map.
                map.addControl(new Mazemap.mapboxgl.NavigationControl());
                
            </script>
        </body>
    `;

  return (
      <View style={styles.container}>
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            mixedContentMode="always"
            onMessage={(event) => {
              alert(event.nativeEvent.data);
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  }
});