import React from 'react';
import {Alert, Linking, Platform} from "react-native";

export const LocationAlert = () => {
    Alert.alert(
        "Location Permission",
        "Location permission has not been granted . Please go to settings to be able to display actual data .",
        [
            {
               text: "OK",
               onPress: () => {
                   if (Platform.OS === 'ios'){
                       Linking.openURL('app-settings:')
                   } else {
                       Linking.openSettings();
                   }
               }
            },
            {
                text: "Close",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
        ]
    )
}