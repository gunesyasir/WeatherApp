import React, {useEffect, useState} from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {checkLocationPermission} from './src/fetchAPI/UserPermission.android.js';
import {getUserLocation} from "./src/fetchAPI/GetLocation";
import {fetchFromWeatherApi} from "./src/fetchAPI/Forecast";
import HourlyList from "./src/View/HourlyView";
import DailyList from "./src/View/DailyView";
import {TemperatureUnitConversion} from "./src/utils/TemperatureUnitConversion";
import {IconUtils} from "./src/utils/IconUtils";

const App = () => {
    const [hourlyData, setHourlyData] = useState(null)
    const [timezone, setTimezone] = useState(null)
    const [dailyData, setDailyData] = useState(null)
    const [currentlyTemperature, setCurrentlyTemperature] = useState(null)
    const [currentlyIcon, setCurrentlyIcon] = useState(null)

    useEffect(() => {
        checkLocationPermission().then(
            isPermissionGiven => {
                if (isPermissionGiven) {
                    getUserLocation().then(
                        locationResult => {
                            fetchFromWeatherApi(locationResult[0], locationResult[1]).then(
                                weatherData => {
                                    setCurrentlyTemperature(weatherData.currently.temperature)
                                    setCurrentlyIcon(weatherData.currently.icon)
                                    setHourlyData(weatherData.hourly.data)
                                    setTimezone(weatherData.timezone)
                                    setDailyData(weatherData.daily.data)
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
            <ImageBackground source={require('./src/assets/background2.jpg')}
                             resizeMode="cover"
                             style={styles.image}>

                <StatusBar backgroundColor={Colors.translucent}/>

                <DailyList
                    dailyData = {dailyData}
                    currentlyIcon = {currentlyIcon}
                    currentlyTemperature = {currentlyTemperature} />

                <HourlyList data = {hourlyData} timezone = {timezone}/>

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },

    image: {
        flex:1,
        justifyContent: "center"
    },
});

export default App;
