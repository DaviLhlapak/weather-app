export default interface CityClimate {
    WeatherText: string,
    IsDayTime: boolean,
    WeatherIcon: number,
    Temperature: {
        Metric: {
            Value: DoubleRange
        }
    }
}