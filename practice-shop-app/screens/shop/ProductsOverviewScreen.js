import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetail',
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  const renderItem = (itemData) => {
    return (
      <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
      >
        <Button
          color={Colors.primary}
          title='View Details'
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          color={Colors.primary}
          title='To Cart'
          onPress={() => {
            dispatch(addToCart(itemData.item));
          }}
        />
      </ProductItem>
    );
  };

  return <FlatList data={products} renderItem={renderItem} />;
};
{
}
ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <TouchableOpacity>
        <Ionicons
          name='ios-menu'
          size={25}
          color='white'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </TouchableOpacity>
    ),
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
