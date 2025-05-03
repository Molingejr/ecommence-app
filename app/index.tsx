import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from './screens/cart';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';

const { Navigator, Screen } = createBottomTabNavigator();

export default function App() {
  return (
    <Navigator>
      <Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Screen 
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={24} color={color} />,
        }}
      />
      <Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Navigator>
  );
}