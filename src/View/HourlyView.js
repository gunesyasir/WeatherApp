import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from 'react';
import {IconUtils} from "../utils/IconUtils";
import {TemperatureUnitConversion} from "../utils/TemperatureUnitConversion";
import {TimeFormatter} from "../utils/TimeFormatter";

const HourlyList = (props) => {

    const itemToRender = ({item}) => {
       const convertedTemperature = TemperatureUnitConversion.fahrenheitToCelsius(item.temperature)
       const iconSource =  IconUtils.iconPath(item.icon)
       return (
            <View>
                <View style={styles.flatList}>
                    <Text style={styles.item}>
                        {TimeFormatter.formattedTime(item.time)}
                    </Text>
                </View>
                <View style={styles.flatList}>
                    <Image source={iconSource}/>
                </View>
                <View style={styles.flatList}>
                    <Text style={styles.item}>
                        {convertedTemperature}{'\u00b0'}
                    </Text>
                </View>

            </View>
        )
    }

    return(
        <View style={styles.container}>
            <FlatList data={props.data}
                      renderItem={itemToRender}
                      keyExtractor={( item, index) => index}
                      horizontal={true}
                      />
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex:1,
        borderTopEndRadius:40,
        borderTopStartRadius:40,
        backgroundColor: 'rgba(200, 200, 200, 0.2)'
    },

    item: {
        fontSize:26,
        color:'white',
    },

    flatList: {
        flexDirection: 'column',
        height: '35%',
        width: 130,
        alignItems: 'center',
        justifyContent: "space-around",
        paddingBottom:20,
    },
})
export default HourlyList

