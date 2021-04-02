import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Platform,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/products';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(undefined);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

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

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An Error occured!</Text>
        <Button
          title='Try again'
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Available Products</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={renderItem}
    />
  );
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductsOverviewScreen;
