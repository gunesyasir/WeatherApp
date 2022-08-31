import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

    export const checkLocationPermission = async () => {

        const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        return new Promise((resolve, reject) => {
            if (permissionStatus === RESULTS.GRANTED || permissionStatus === RESULTS.LIMITED) {
                resolve(true)
            } else if (permissionStatus === RESULTS.BLOCKED || permissionStatus === RESULTS.UNAVAILABLE) {
                resolve(false)
            } else if (permissionStatus === RESULTS.DENIED) {

                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
                    result => {
                        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
                            resolve(true)
                        } else if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
                            resolve(false)
                        } else reject('unexpected request result')
                    },
                    error => {
                        reject(error)
                    },
                )
            } else reject('unexpected check result')
        })
    }
