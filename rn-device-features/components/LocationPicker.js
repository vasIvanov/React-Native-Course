import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
  const [pickedLoc, setPickedLoc] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = props.navigation.getParam('pickerLocation');

  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLoc(mapPickedLocation);
      props.onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const res = await Permissions.askAsync(Permissions.LOCATION);
    if (res.status !== 'granted') {
      Alert.alert(
        'Permission not granted for location!',
        'You need to give persmission',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };
  const getLocationHandler = async () => {
    const persmission = await verifyPermissions();

    if (!persmission) return;

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLoc({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Cant fetch location', 'Please try again', [
        { text: 'Okay' },
      ]);
    }
    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLoc}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get user location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick on Map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
export default LocationPicker;
