import {Dimensions, FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Days} from "../utils/Enums";
import {IconUtils} from "../utils/IconUtils";
import CurrentlyView from "./CurrentlyView";
import {TemperatureUnitConversion} from "../utils/TemperatureUnitConversion";


const DailyList = (props) => {

    const formattedDate = (time)  => {
        let day = new Date(time * 1000).getDay()
        switch (day){
            case Days.SUNDAY:
                return "SUNDAY"
            case Days.MONDAY:
                return "MONDAY"
            case Days.TUESDAY:
                return "TUESDAY"
            case Days.WEDNESDAY:
                return "WEDNESDAY"
            case Days.THURSDAY:
                return "THURSDAY"
            case Days.FRIDAY:
                return "FRIDAY"
            case Days.SATURDAY:
                return "SATURDAY"
            default:
                return "default"
        }
    }

    const itemToRender = ({item}) => (
        <View style={styles.flatList}>
            <Image source={IconUtils.iconPath(item.icon)} style={{marginVertical:-25, marginStart:15}}/>
            <Text style={styles.date}>{formattedDate(item.time)}{/*{'\u2022'}*/}</Text>
            <Text style={styles.temperature}>
                {TemperatureUnitConversion.fahrenheitToCelsius(item.temperatureHigh) + "\u00b0"
                    + "/" + TemperatureUnitConversion.fahrenheitToCelsius(item.temperatureLow) + "\u00b0" }
            </Text>
        </View>
    )

    return(
        <View style={styles.container}>
            <FlatList data={props.dailyData}
                      renderItem={itemToRender}
                      keyExtractor = {( item, index) => index}
                      ListHeaderComponent = {
                <CurrentlyView
                    currentlyTemperature = {props.currentlyTemperature}
                    currentlyIcon = {props.currentlyIcon} />}
                      ListHeaderComponentStyle={{height:verticalFlatListHeight/2} }
            />
        </View>
    )
}
const verticalFlatListHeight = (Dimensions.get('window').height)*3/4
const styles = StyleSheet.create({
    container: {
        flex:3,
        paddingBottom:10,
        paddingTop:50,
    },

    flatList: {
        flexDirection: 'row',
        alignContent:'flex-start',
        height: verticalFlatListHeight/8,
        justifyContent:'space-between',
    },

    date: {
        fontSize:20,
        height:20,
        fontWeight:"bold",
        color:'white',
        paddingStart:20,
    },

    temperature: {
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        paddingEnd:20,
        alignContent:'flex-end',
    },

})
export default DailyList