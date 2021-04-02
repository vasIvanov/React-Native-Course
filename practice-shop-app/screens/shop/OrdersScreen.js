import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';
import Colors from '../../constants/Colors';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => {
      isLoading(false);
    });
  }, [dispatch]);

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
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
  };
};

export default OrdersScreen;
