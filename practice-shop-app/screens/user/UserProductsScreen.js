import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';

const UserProductsScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            itemData={itemData}
            navigation={props.navigation}
            overview={false}
          />
        )}
        numColumns={2}
      />
    </View>
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your products',
    headerLeft: () => {
      return (
        <Ionicons
          name='ios-menu'
          size={25}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      );
    },
    headerRight: () => {
      return (
        <Ionicons
          name='add'
          size={25}
          onPress={() => {
            navData.navigation.navigate({
              routeName: 'EditScreen',
            });
          }}
        />
      );
    },
  };
};

const styles = StyleSheet.create({});
export default UserProductsScreen;
