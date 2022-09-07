import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconUtils} from '../utils/IconUtils';
import {TemperatureUnitConversion} from '../utils/TemperatureUnitConversion';
import {TimeFormatter} from '../utils/TimeFormatter';

const HourlyList = (props) => {
    //creating an empty array for default values
    const defaultList = [ {}, {}, {}, {}, {}, {}];

    const defaultItems = () => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.item}>{"--"}</Text>
                <Image source={require('../assets/sunny-cloudy.png')}/>
                <Text style={styles.item}>
                    {'--'}
                </Text>
            </View>
        );
    }

    const itemToRender = ({item}) => {
        const convertedTemperature = TemperatureUnitConversion.fahrenheitToCelsius(
            item.temperature,
        );
        const iconSource = IconUtils.iconPath(item.icon);
        const formattedTime = TimeFormatter.formattedTime(item.time);
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.item}>{formattedTime}</Text>
                <Image source={iconSource}/>
                <Text style={styles.item}>
                    {convertedTemperature}
                    {'\u00b0'}
                </Text>
            </View>
        );
    };
    if (props.data !== null) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={props.data}
                    renderItem={itemToRender}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={defaultList}
                    renderItem={defaultItems}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                </FlatList>
            </View>
        );
    }
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

    emptyContainer: {
        flex: 1,
        borderRadius: 40,
        marginHorizontal: 10,
        justifyContent: "space-evenly"
    },

    emptyItem: {

    },

});
export default HourlyList;
