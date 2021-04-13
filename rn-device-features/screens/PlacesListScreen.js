import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
          image={null}
          address={null}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <Ionicons
        name='md-add'
        size={23}
        color='white'
        onPress={() => {
          navData.navigation.navigate('NewPlace');
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({});
export default PlacesListScreen;
