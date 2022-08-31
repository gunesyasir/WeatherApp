import {CurrentlyWeather} from "./CurrentlyModel";
import {HourlyWeatherGeneral} from "./HourlyGeneralModel";
import {DailyGeneralWeather} from "./DailyGeneralModel";
import {HourlyWeather} from "./HourlyModel";

export class WeatherResponse {
    latitude: number
    longitude: number
    timezone: string
    currently: CurrentlyWeather
    hourly: HourlyWeatherGeneral
    daily: DailyGeneralWeather
}