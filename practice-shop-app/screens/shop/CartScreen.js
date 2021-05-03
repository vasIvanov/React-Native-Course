import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Button } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].title,
        productPrice: state.cart.items[key].price,
        productQuantity: state.cart.items[key].quantity,
        productSum: state.cart.items[key].sum,
        productPushToken: state.cart.items[key].pushToken,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total :{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>

        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title='Order Now'
            onPress={async () => {
              setIsLoading(true);
              await dispatch(addOrder(cartItems, cartTotalAmount));
              setIsLoading(false);
            }}
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.productQuantity}
            title={itemData.item.productTitle}
            amount={itemData.item.productSum}
            deletable
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
export default CartScreen;
