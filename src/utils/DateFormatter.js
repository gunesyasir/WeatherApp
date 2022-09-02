import {Days} from "./Enums";

export class DateFormatter {
    static formattedDate = (time)  => {
        let day = new Date(time * 1000).getDay()
        switch (day){
            case Days.SUNDAY:
                return "SUNDAY"
            case Days.MONDAY:
                return "MONDAY"
            case Days.TUESDAY:
                return "TUESDAY"
            case Days.WEDNESDAY:
                return "WEDNESDAY"
            case Days.THURSDAY:
                return "THURSDAY"
            case Days.FRIDAY:
                return "FRIDAY"
            case Days.SATURDAY:
                return "SATURDAY"
            default:
                return "default"
        }
    }
}