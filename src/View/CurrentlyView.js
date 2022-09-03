import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TemperatureUnitConversion} from '../utils/TemperatureUnitConversion';
import {IconUtils} from '../utils/IconUtils';

const CurrentlyView = props => {
  return (
    <View style={styles.currentlyView}>
      <Image
        source={IconUtils.iconPath(props.currentlyIcon)}
        style={{width: 130, height: 130}}
      />
      <Text style={styles.currentlyData}>
        {TemperatureUnitConversion.fahrenheitToCelsius(
          props.currentlyTemperature,
        )}
        {'\u2103'}
      </Text>
    </View>
  );
};
export default CurrentlyView;

const verticalFlatListHeight = (Dimensions.get('window').height * 3) / 4;
const styles = StyleSheet.create({
  currentlyView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: (verticalFlatListHeight * 2) / 3,
    paddingBottom: 100,
  },
  currentlyData: {
    fontSize: 80,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
