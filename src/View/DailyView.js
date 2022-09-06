import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {IconUtils} from '../utils/IconUtils';
import CurrentlyView from './CurrentlyView';
import {TemperatureUnitConversion} from '../utils/TemperatureUnitConversion';
import {DateFormatter} from '../utils/DateFormatter';

const DailyList = props => {
  //creating an empty array for default values
  const defaultList = [ {}, {}, {}, {}, {}, {}];

  const defaultItems = () => {
    return (
        <View style={styles.itemContainer}>
          <Image
              source={require('../assets/sunny-cloudy.png')}
              style={{marginVertical: -25, marginStart: 15}}
          />
          <Text style={styles.date}>{'--'}</Text>
          <Text style={styles.temperature}>
            {'--'}
          </Text>
        </View>
    );
  }

  const itemToRender = ({item}) => {

    const iconSource = IconUtils.iconPath(item.icon);
    const formattedDate = DateFormatter.formattedDate(item.time);
    const minDegree = TemperatureUnitConversion.fahrenheitToCelsius(
      item.temperatureLow,
    );
    const maxDegree = TemperatureUnitConversion.fahrenheitToCelsius(
      item.temperatureHigh,
    );

    return (
      <View style={styles.itemContainer}>
        <Image
          source={iconSource}
          style={{marginVertical: -25, marginStart: 15}}
        />
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.temperature}>
          {maxDegree + '\u00b0' + '/' + minDegree + '\u00b0'}
        </Text>
      </View>
    );
  };

  if (props.dailyData !== null){
    return (
        <View style={styles.container}>
          <FlatList
              data={props.dailyData}
              renderItem={itemToRender}
              keyExtractor={(item, index) => index}
              ListHeaderComponent={
                <CurrentlyView
                    currentlyTemperature={props.currentlyTemperature}
                    currentlyIcon={props.currentlyIcon}
                />
              }
              ListHeaderComponentStyle={{height: verticalFlatListHeight / 2}}
              showsVerticalScrollIndicator={false}
          />
        </View>
    );
  } else {
    return(
    <View style={styles.container}>
      <FlatList
          data={defaultList}
          renderItem={defaultItems}
          keyExtractor={(item, index) => index}
          ListHeaderComponent={
            <CurrentlyView
                currentlyTemperature={props.currentlyTemperature}
                currentlyIcon={props.currentlyIcon}
            />
          }
          ListHeaderComponentStyle={{height: verticalFlatListHeight / 2}}
          showsVerticalScrollIndicator={false}
      />
    </View>
    )
  }

};
const verticalFlatListHeight = (Dimensions.get('window').height * 3) / 4;
const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingBottom: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    height: verticalFlatListHeight / 8,
    justifyContent: 'space-between',
  },

  date: {
    fontSize: 20,
    height: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingStart: 10,
  },

  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingEnd: 30,
    alignContent: 'flex-end',
  },
});
export default DailyList;
