import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkLocationPermission = async () => {
    const permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    return new Promise((resolve, reject) => {
        if (permissionStatus === RESULTS.GRANTED || permissionStatus === RESULTS.LIMITED) {
            resolve(true)
        } else if (permissionStatus === RESULTS.BLOCKED || permissionStatus === RESULTS.UNAVAILABLE) {
            resolve(false)
        } else if (permissionStatus === RESULTS.DENIED) {

            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
                result => {
                    if (result === RESULTS.GRANTED) {
                        resolve(true)
                    } else if (result === RESULTS.BLOCKED) {
                        resolve(false)
                        // go without location
                    } else reject('unexpected request result')
                },
                error => {
                    reject(error)
                },
            )
        } else reject('unexpected check result')
    })
}