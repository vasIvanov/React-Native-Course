import React from 'react';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen';
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, {
  screenOptions as authScreenOptions,
} from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/auth';

import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// const ProductsNavitagor = createStackNavigator(
//   {
//     ProductsOverview: {
//       screen: ProductsOverviewScreen,
//     },
//     ProductDetail: ProductDetailScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons name='md-cart' size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
//       },
//       headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
//     },
//   }
// );

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons name='md-list' size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
//       },
//       headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
//     },
//   }
// );

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons name='md-create' size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
//       },
//       headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
//     },
//   }
// );

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'aways', horizontal: 'never' }}>
              <DrawerItemList {...props} />
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
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name='md-cart' size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name='md-list' size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name='md-create' size={23} color={props.color} />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsNavitagor,
//     Orders: OrdersNavigator,
//     Admin: AdminNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: 'aways', horizontal: 'never' }}>
//             <DrawerNavigatorItems {...props} />
//             <Button
//               title='Logout'
//               color={Colors.primary}
//               onPress={() => {
//                 dispatch(logout());
//                 //props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNaviagor = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
//       },
//       headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
//     },
//   }
// );

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNaviagor,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
