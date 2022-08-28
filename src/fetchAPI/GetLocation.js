import Geolocation from "react-native-geolocation-service";

export const getUserLocation = () => {

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position) => {

                let coordinates = [position.coords.latitude , position.coords.longitude]
                resolve(coordinates)
            },
            (error) => {
                reject(error)
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
        )
    })
}





