import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const renderItem = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onViewDetail={() => {
          props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            },
          });
        }}
        onAddToCart={() => {
          dispatch(addToCart(itemData.item));
        }}
      />
    );
  };

  return <FlatList data={products} renderItem={renderItem} />;
};
{
}
ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      // <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //   <Item
      //     title='Cart'
      //     iconName='ios-cart'
      //     onPress={() => {
      //       console.log('test');
      //     }}
      //   />
      // </HeaderButtons>
      <TouchableOpacity>
        <Ionicons
          name='ios-cart'
          size={25}
          color='white'
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({});
export default ProductsOverviewScreen;
