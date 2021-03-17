import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const renderItem = (itemData) => {
    return <Text>{itemData.item.title}</Text>;
  };

  return <FlatList data={products} renderItem={renderItem} numColumns={2} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
