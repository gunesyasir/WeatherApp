export class TimeFormatter {
    static formattedTime = (time) => {
        return new Date(time * 1000)
            .toLocaleTimeString([], )
            .replace(/(:\d{2}| [AP]M)$/, "")
    }
}