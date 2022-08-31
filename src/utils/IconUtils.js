export class IconUtils {
    static iconPath = (icon) => {
        switch (icon){
            case "clear-day":
                return require('../assets/sunny.png');
            case "clear-night":
                return require('../assets/moon.png');
            case "partly-cloudy-day":
                return require('../assets/sunny-cloudy.png');
            case "partly-cloudy-night":
                return require('../assets/partly-cloudy-night.png');
            case "cloudy":
                return require('../assets/cloudy.png');
            case "rain":
                return require('../assets/rainy.png');
            case 'sleet':
                return require('../assets/snowy.png');
            case 'snow':
                return require('../assets/snowy.png');
            case 'wind':
                return require('../assets/windy.png');
            case 'fog':
                return require('../assets/windy.png');
            default:
                return require('../assets/sunny-cloudy.png');
        }
    }
}
