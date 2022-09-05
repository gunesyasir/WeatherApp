import React from 'react';
import {Alert, Linking, Platform} from "react-native";
import {platforms} from "react-native/react-native.config";

export const LocationAlert = () => {
    Alert.alert(
        "Location Permission",
        "Location permission has not been granted. Please go to settings to be able to use application properly.",
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