import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {switchToCelsium, switchToFahrenheit} from '../features/unitsSlice';
import {getSelectedLocation} from '../features/selectedLocationSlice';
import {Loader} from '../components';
import {RootStackParamList} from '../types';

import {
  useAppDispatch,
  useAppSelector,
  convertDate,
  getDayOfWeek,
} from '../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectedLocation'>;

const SelectedLocationScreen = ({route}: Props) => {
  const {selectedLocation, isLoading} = useAppSelector(
    store => store.selectedLocation,
  );

  const {units, sign} = useAppSelector(store => store.units);

  const dispatch = useAppDispatch();
  const coordinates = route.params?.coordinates;
  const locationName = route.params?.location_name;

  useEffect(() => {
    dispatch(getSelectedLocation({coordinates, units}));
  }, [coordinates, units]);

  if (isLoading) {
    return (
      <View style={styles.screenContainer}>
        <Loader />
      </View>
    );
  }

  if (!selectedLocation) {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.primarytText}>Error: Data not available</Text>
      </View>
    );
  }

  const time = convertDate(selectedLocation.timezone).time;
  const date = convertDate(selectedLocation.timezone).date;
  const currentTemp = selectedLocation.current.temp.toFixed(0);
  const weatherState = selectedLocation.current.weather[0].main;
  const icon = `https://openweathermap.org/img/wn/${selectedLocation.current.weather[0].icon}@2x.png`;
  const maxTemp = selectedLocation.daily[0].temp.max.toFixed(0);
  const minTemp = selectedLocation.daily[0].temp.min.toFixed(0);
  const feelsLike = selectedLocation.current.feels_like.toFixed(0);
  const humidity = selectedLocation.current.humidity;
  const windSpeed = selectedLocation.current.wind_speed;
  const weeklyForecast = selectedLocation?.daily.slice(0, 7);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {units === 'metric' ? (
        <Button
          title="Switch to °F"
          color={'#D32F2F'}
          onPress={() => dispatch(switchToFahrenheit())}
        />
      ) : (
        <Button
          title="Switch to °C"
          color={'#D32F2F'}
          onPress={() => dispatch(switchToCelsium())}
        />
      )}

      <View style={styles.screenContainer}>
        <View style={styles.blockContainer}>
          <Text style={styles.primarytText}>{locationName}</Text>

          <View style={styles.dateContainer}>
            <Text style={styles.primarytText}>{time}</Text>
            <Text style={styles.primarytText}>{date}</Text>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <Image
            style={styles.image}
            source={{
              uri: icon,
            }}
          />

          <Text style={styles.primarytText}>
            {`${currentTemp}${sign} | ${weatherState}`}
          </Text>

          <View style={styles.weatherDataContainer}>
            <View>
              <Text style={styles.secondarytText}>
                {`Max: ${maxTemp}${sign}`}
              </Text>

              <Text style={styles.secondarytText}>
                {`Min: ${minTemp}${sign}`}
              </Text>

              <Text style={styles.secondarytText}>
                {`Real feel: ${feelsLike}${sign}`}
              </Text>
            </View>

            <View>
              <Text style={styles.secondarytText}>
                {`Humidity: ${humidity}%`}
              </Text>

              <Text style={styles.secondarytText}>
                {units === 'metric'
                  ? `Wind: ${windSpeed} m/s`
                  : `Wind: ${windSpeed} mil/h`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.blockContainer}>
          <Text style={styles.primarytText}>Weekly forecast</Text>

          {weeklyForecast.map(forecast => (
            <View key={forecast.dt} style={styles.forecastContainer}>
              <Text style={styles.forecastText}>
                {getDayOfWeek(forecast.dt)}
              </Text>

              <Text style={styles.forecastText}>
                {`${forecast.temp.day.toFixed(0)}${sign}`}
              </Text>

              <Text style={styles.forecastText}>
                {forecast.weather[0].main}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#804FB3',
    rowGap: 12,
    padding: 12,
  },
  blockContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
    padding: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 32,
  },
  forecastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  primarytText: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  secondarytText: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    height: 100,
    width: 100,
  },
  weatherDataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 36,
  },
  forecastText: {
    color: 'white',
    fontSize: 18,
    width: 100,
    textAlign: 'center',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 20,
  },
});

export default SelectedLocationScreen;
