import React from 'react';
import { View, StyleSheet } from 'react-native';

const PlaceDetailScreen = (props) => {
  return <View></View>;
};

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle'),
  };
};

const styles = StyleSheet.create({});
export default PlaceDetailScreen;
