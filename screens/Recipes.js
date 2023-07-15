import { FlatList, Image, SafeAreaView, StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { useQuery } from 'react-query'
import { getRecipe, getRecipes } from '../api/service'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import CameraComponent from '../components/CameraComponent'
import { StatusBar } from 'expo-status-bar'
import Recipe from '../components/Recipe'
const Recipes = () => {
    const { token, setToken } = useContext(AuthContext)
    const { navigate } = useNavigation()
    const { data, status } = useQuery(['recipes', token], getRecipes)


    const logOut = () => {
        setToken('')
        navigate('signin')
    }

    return (
        <View style={styles.container}>
            {status === 'success' && (
                <SafeAreaView>
                    <FlatList
                        data={data}
                        keyExtractor={(product) => product.id}
                        renderItem={({ item }) => <Recipe {...item} />}
                        ListHeaderComponent={() => <Text style={styles.title}>Recetas</Text>}
                        contentContainerStyle={styles.contentContainerStyle} />
                </SafeAreaView>
            )
            }
            <StatusBar style="auto" />
        </View>
        // <CameraComponent />
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#f1f1f1',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },

    container: {
        flex: 1,
        backgroundColor: '#E9E9EF',
        justifyContent: 'center'
    },

    title: {
        fontSize: 30,
        color: '#34434D',
        fontWeight: 'bold',
        marginBottom: 10
    },

    text: {
        fontSize: 14,
        color: '#fff'
    },
    button: {
        marginTop: 20,
        width: '25%',
        height: 50,
        backgroundColor: '#5A75FA',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    contentContainerStyle: {
        padding: 15
    }
});

export default Recipes