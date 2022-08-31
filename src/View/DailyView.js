import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {Days} from "../utils/Enums";
import {IconUtils} from "../utils/IconUtils";


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
            <Text style={styles.item}> {formattedDate(item.time)}</Text>
            <Image source={IconUtils.iconPath(item.icon)}/>
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
        padding:10,
    },

    item: {
        fontSize:15,
        height:18,
    },

    flatList: {
        flexDirection: 'column',
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
    },
})
export default DailyList