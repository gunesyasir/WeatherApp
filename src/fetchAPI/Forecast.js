import {WeatherResponse} from "../Model/Models";

export const fetchFromWeatherApi = (latitude, longitude) : Promise<WeatherResponse> => {

  const url = `https://api.darksky.net/forecast/2bb07c3bece89caf533ac9a5d23d8417/${latitude},${longitude}`

    return new Promise((resolve, reject) => {
        fetch(url).then(
            response => {
                resolve(response.json())
            },
            error => {
                reject(error)
            },
        )
    })
}






