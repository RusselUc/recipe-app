import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SingIn from "./screens/SingIn"
import { NavigationContainer } from "@react-navigation/native"
import SingUp from "./screens/SingUp"

const mainStack = createNativeStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <mainStack.Navigator initialRouteName="signin">
                <mainStack.Screen name="signin" component={SingIn} options={{ headerShown: false }} />
                <mainStack.Screen name="signup" component={SingUp} options={{ headerShown: false }} />
            </mainStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation