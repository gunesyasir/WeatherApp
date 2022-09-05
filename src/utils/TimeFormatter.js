export class TimeFormatter {
  static formattedTime = time => {
    return new Date((time * 1000)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }).slice(0,5);
  };
}
