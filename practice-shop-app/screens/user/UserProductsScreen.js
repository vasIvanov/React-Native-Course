import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'You products',
    headerLeft: () => (
      <Ionicons
        name='ios-menu'
        size={25}
        color='white'
        onPress={() => {
          navData.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => (
      <Ionicons
        name='md-add'
        size={25}
        color='white'
        onPress={() => {
          navData.navigation.navigate('EditProduct');
        }}
      />
    ),
  };
};

const styles = StyleSheet.create({});
export default UserProductsScreen;
