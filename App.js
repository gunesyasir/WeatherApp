import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    AppState,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet, View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {checkLocationPermission} from './src/fetchAPI/UserPermission';
import {getUserLocation} from './src/fetchAPI/GetLocation';
import {fetchFromWeatherApi} from './src/fetchAPI/Forecast';
import HourlyList from './src/View/HourlyView';
import DailyList from './src/View/DailyView';
import {LocationAlert} from "./src/View/AlertView";
import {check, PERMISSIONS, RESULTS} from "react-native-permissions";

const App = () => {

    const appState = useRef(AppState.currentState);
    const [hourlyData, setHourlyData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    const [currentlyTemperature, setCurrentlyTemperature] = useState(null);
    const [currentlyIcon, setCurrentlyIcon] = useState("partly-cloudy-day");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        permissionCheck()

        const appStateListener = AppState.addEventListener("change", async nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === "active"
            ) {
                const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                if(permissionStatus === RESULTS.GRANTED || permissionStatus === RESULTS.LIMITED){
                    fetchData()
                }
            }
            appState.current = nextAppState;
        });

      return () => {
          appStateListener.remove();
      };
  }, []);

    const permissionCheck = () => {
        checkLocationPermission().then(
            isPermissionGiven => {
                if (isPermissionGiven) {
                    setIsLoading(true)
                    fetchData()
                } else {
                    LocationAlert()
                }
            },
            error => {
                console.log(error);
            },
        );
    }
    const fetchData = () => {
        getUserLocation().then(locationResult => {
            fetchFromWeatherApi(locationResult[0], locationResult[1]).then(
                weatherData => {
                    setCurrentlyTemperature(weatherData.currently.temperature);
                    setCurrentlyIcon(weatherData.currently.icon);
                    setHourlyData(weatherData.hourly.data);
                    setDailyData(weatherData.daily.data);
                    setIsLoading(false)
                },
            );
        });
    }

    return (
        <ImageBackground
            source={require('./src/assets/background2.jpg')}
            resizeMode="cover"
            style={styles.image}>
            {
                isLoading ?
                    <View style={styles.spinnerContainer}>
                        <ActivityIndicator
                            size={"large"}
                            color={"white"}/>
                    </View> : null
            }
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar backgroundColor={Colors.translucent}/>
                <DailyList
                    dailyData={dailyData}
                    currentlyIcon={currentlyIcon}
                    currentlyTemperature={currentlyTemperature} />
                <HourlyList data={hourlyData}/>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },

    image: {
        flex: 1,
        justifyContent: 'center',
    },
    spinnerContainer: {
        position: 'absolute',
        elevation: 10,
        zIndex: 10,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
