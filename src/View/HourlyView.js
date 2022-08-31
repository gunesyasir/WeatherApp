import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from 'react';
import {IconUtils} from "../utils/IconUtils";
import {TemperatureUnitConversion} from "../utils/TemperatureUnitConversion";

const HourlyList = (props) => {
    const a = 'B'

    const formattedTime = (time) => {
        return new Date(time * 1000)
            .toLocaleTimeString([], {timeZone: props.timezone, hour12: false, })
            .replace(/(:\d{2}| [AP]M)$/, "")
    }

    const itemToRender = ({item}) => (
        <View>
            <View style={styles.flatList}>
                <Text style={styles.item}> {formattedTime(item.time)}</Text>
            </View>
            <View style={styles.flatList}>
                <Image source={IconUtils.iconPath(item.icon)}/>
            </View>
            <View style={styles.flatList}>
                <Text style={styles.item}>
                    {TemperatureUnitConversion.fahrenheitToCelsius(item.temperature)}{'\u00b0'}
                </Text>
            </View>

        </View>
    )

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
        flex:3,
        borderRadius:10,
        padding:5,
    },

    item: {
        fontSize:26,
    },

    flatList: {
        flexDirection: 'column',
        height: '33%',
        width: 150,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor:'#C3C0C0',
        opacity:0.5
    },
})
export default HourlyList

