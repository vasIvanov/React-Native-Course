import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground,
  Image,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import HeaderButton from '../../components/HeaderButton';
// import HeaderButton from '../components/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import ProductItem from '../../components/ProductItem';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  console.log(products);
  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            itemData={itemData}
            navigation={props.navigation}
            overview={true}
          />
        )}
      />
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <TouchableNativeFeedback>
        <Ionicons
          name='ios-cart'
          size={35}
          onPress={() => {
            navData.navigation.navigate({
              routeName: 'CartScreen',
              params: {
                // mealId: itemData.item.id,
                // mealTitle: itemData.item.title,
                // isFav,
              },
            });
          }}
        />
      </TouchableNativeFeedback>
    ),
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
  };
};

const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
