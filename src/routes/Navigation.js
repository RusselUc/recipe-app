import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SingIn from "../screens/SingIn"
import { NavigationContainer } from "@react-navigation/native"
import SingUp from "../screens/SingUp"
import Recipes from "../screens/Recipes"
import SingleRecipe from "../screens/SingleRecipe"
import { Suspense, lazy } from "react"
import SkeletonDetails from "../components/SkeletonDetails"
import RecipeForm from "../components/RecipeForm"
import CameraComponent from "../components/CameraComponent"

const mainStack = createNativeStackNavigator()

const RecipeScreen = lazy(() => import('../screens/SingleRecipe'));


const LazyDetails = () => {
    return (
        <Suspense fallback={<SkeletonDetails />}>
            <RecipeScreen />
        </Suspense>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <mainStack.Navigator initialRouteName="signin">
                <mainStack.Screen name="signin" component={SingIn} options={{ headerShown: false }} />
                <mainStack.Screen name="signup" component={SingUp} options={{ headerShown: false }} />
                <mainStack.Screen name="recipes" component={Recipes} options={{ headerShown: false }} />
                <mainStack.Screen name="details" component={LazyDetails} options={{ headerShown: false }} />
                <mainStack.Screen name="recipe-form" component={RecipeForm} options={{ headerShown: false }} />
            </mainStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation