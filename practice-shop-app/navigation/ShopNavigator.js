import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createDrawerNavigator,
  DrawerItems,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

const ProductsNavitagor = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
    },
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavitagor,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'aways', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title='Logout'
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
                //props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNaviagor = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNaviagor,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
