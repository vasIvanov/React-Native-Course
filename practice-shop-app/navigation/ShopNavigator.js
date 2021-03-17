import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ShopNavitagor = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  // CategoryMeals: {
  //   screen: CategoryMealsScreen,
  // },
  // MealDetail: MealDetailsScreen,
});

export default createAppContainer(ShopNavitagor);
