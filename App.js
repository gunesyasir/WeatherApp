import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {checkLocationPermission} from './src/fetchAPI/UserPermission';
import {getUserLocation} from './src/fetchAPI/GetLocation';
import {fetchFromWeatherApi} from './src/fetchAPI/Forecast';
import HourlyList from './src/View/HourlyView';
import DailyList from './src/View/DailyView';
import {LocationAlert} from "./src/View/AlertView";

const App = () => {
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [currentlyTemperature, setCurrentlyTemperature] = useState(null);
  const [currentlyIcon, setCurrentlyIcon] = useState(null);

  useEffect(() => {
    checkLocationPermission().then(
      isPermissionGiven => {
        if (isPermissionGiven) {
          getUserLocation().then(locationResult => {
            fetchFromWeatherApi(locationResult[0], locationResult[1]).then(
              weatherData => {
                setCurrentlyTemperature(weatherData.currently.temperature);
                setCurrentlyIcon(weatherData.currently.icon);
                setHourlyData(weatherData.hourly.data);
                setDailyData(weatherData.daily.data);
              },
            );
          });
        } else {
            LocationAlert()
          console.log('no permission given, alert');
        }
      },
      error => {
        console.log(error);
      },
    );
  }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ImageBackground
                source={require('./src/assets/background2.jpg')}
                resizeMode="cover"
                style={styles.image}>
                <StatusBar backgroundColor={Colors.translucent} />

                <DailyList
                    dailyData={dailyData}
                    currentlyIcon={currentlyIcon}
                    currentlyTemperature={currentlyTemperature}
                />

                <HourlyList data={hourlyData} />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#3a93cf',
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
