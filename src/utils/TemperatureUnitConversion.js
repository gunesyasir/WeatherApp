export class TemperatureUnitConversion {
    static fahrenheitToCelsius = (degree) => {
        return Math.round((degree-32) * 5 / 9)
    }
}