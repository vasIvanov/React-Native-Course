import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import CartScreen from '../screens/shop/CartScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const ShopNavitagor = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  // CategoryMeals: {
  //   screen: CategoryMealsScreen,
  // },
  // MealDetail: MealDetailsScreen,
  CartScreen: CartScreen,
  DetailScreen: ProductDetailScreen,
});

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!',
    // },
    // defaultNavigationOptions: defaultStackNavOptions,
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditScreen: EditProductScreen,
  },
  {
    // navigationOptions: {
    //   drawerLabel: 'Filters!!',
    // },
    // defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Shop: {
      screen: ShopNavitagor,
      navigationOptions: {
        drawerLabel: 'Shop',
      },
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        drawerLabel: 'Orders',
      },
    },
    ManageProducts: {
      screen: UserProductsNavigator,
      drawerLabel: 'Manage Products',
    },
  },
  {
    // contentOptions: {
    //   activeTintColor: Colors.accentColors,
    //   labelStyle: {
    //     fontFamily: 'open-sans-bold',
    //   },
    // },
  }
);

export default createAppContainer(MainNavigator);
