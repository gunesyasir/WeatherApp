import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconUtils} from '../utils/IconUtils';
import {TemperatureUnitConversion} from '../utils/TemperatureUnitConversion';
import {TimeFormatter} from '../utils/TimeFormatter';

const HourlyList = props => {
  const itemToRender = ({item}) => {
    const convertedTemperature = TemperatureUnitConversion.fahrenheitToCelsius(
      item.temperature,
    );
    const iconSource = IconUtils.iconPath(item.icon);
    const formattedTime = TimeFormatter.formattedTime(item.time);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{formattedTime}</Text>
        <Image source={iconSource} />
        <Text style={styles.item}>
          {convertedTemperature}
          {'\u00b0'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={itemToRender}
        keyExtractor={(item, index) => index}
        horizontal={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    marginHorizontal: 10,
  },

  item: {
    fontSize: 20,
    color: 'white',
  },

  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
});
export default HourlyList;
