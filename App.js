import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text,} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Permission from './src/fetchAPI/UserPermission.android.js';
import {getUserLocation} from "./src/fetchAPI/GetLocation";
import {fetchFromWeatherApi} from "./src/fetchAPI/Forecast";

const App = () => {
    const [latitude, setLatitude] = useState(null)

    useEffect(() => {
        Permission.checkLocationPermission().then(
            isPermissionGiven => {
                if (isPermissionGiven) {
                    getUserLocation().then(
                        locationResult => {
                            fetchFromWeatherApi(locationResult[0], locationResult[1]).then(
                                weatherData => {
                                }
                            )
                        }
                    )
                } else {
                    //use old data
                    console.log('use old data')
                }
            },
            error => {
                console.log(error)
            },
        )
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={Colors.translucent}/>
            <Text style={styles.sectionTitle}></Text>
            <Text style={styles.sectionTitle}></Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
});

export default App;
