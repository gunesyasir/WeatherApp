import React, {useEffect, useState} from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {checkLocationPermission} from './src/fetchAPI/UserPermission.android.js';
import {getUserLocation} from "./src/fetchAPI/GetLocation";
import {fetchFromWeatherApi} from "./src/fetchAPI/Forecast";
import HourlyList from "./src/View/HourlyView";
import DailyList from "./src/View/DailyView";

const App = () => {
    const [hourlyData, setHourlyData] = useState(null)
    const [timezone, setTimezone] = useState(null)
    const [dailyData, setDailyData] = useState(null)
    const [currentlyData, setCurrentlyData] = useState(null)

    useEffect(() => {
        checkLocationPermission().then(
            isPermissionGiven => {
                if (isPermissionGiven) {
                    getUserLocation().then(
                        locationResult => {
                            fetchFromWeatherApi(locationResult[0], locationResult[1]).then(
                                weatherData => {
                                    setHourlyData(weatherData.hourly.data)
                                    setTimezone(weatherData.timezone)
                                    setDailyData(weatherData.daily.data)
                                    setCurrentlyData(weatherData.currently.temperature)
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
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView contentContainerStyle={{flex:1}}>
                <ImageBackground source={require('./src/assets/background2.jpg')}
                                 resizeMode="cover"
                                 style={styles.image}>
                    <Text style={styles.test}> {currentlyData}</Text>
                    <StatusBar backgroundColor={Colors.translucent}/>
                    <DailyList data={dailyData}/>
                    <HourlyList data={hourlyData} timezone={timezone}/>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
);
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },

    image: {
        flex: 1,
        justifyContent: "center"
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },

    test: {
        flex: 3,
        fontSize:40,
        /*textAlign:'',
        justifyContent:'',
        alignItems:'',
        alignContent:'',*/
    },
});

export default App;
