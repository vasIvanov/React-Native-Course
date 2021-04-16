import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState('');
  const verifyPermissions = async () => {
    const res = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (res.status !== 'granted') {
      Alert.alert(
        'Permission not granted for camera!',
        'You need to give persmission',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;
    const resImage = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(resImage.uri);
    props.onImageTaken(resImage.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
        <Button
          title='Take image'
          color={Colors.primary}
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImageSelector;
