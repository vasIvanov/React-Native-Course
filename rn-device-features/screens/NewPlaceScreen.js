import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ImageSelector from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';
import { addPlace } from '../store/places-actions';

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState('');
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, image, selectedLocation));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setImage(imagePath);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImageSelector onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
export default NewPlaceScreen;
