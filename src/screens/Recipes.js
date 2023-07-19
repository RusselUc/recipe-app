import { FlatList, StatusBar, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
import CameraComponent from '../components/CameraComponent'
// import { StatusBar } from 'expo-status-bar'
import Recipe from '../components/Recipe'
import { getRecipes } from '../api/service'
import Button from '../components/Button'
const Recipes = () => {
    const { token, setToken } = useContext(AuthContext)
    const { navigate } = useNavigation()
    const { data, status } = useQuery(['recipes', token], getRecipes)


    const logOut = () => {
        setToken('')
        navigate('signin')
    }

    return (
        <SafeAreaView style={styles.container}>
            {status === 'success' && (
                <View style={styles.content}>
                    <FlatList
                        data={data}
                        keyExtractor={(product) => product.id}
                        renderItem={({ item }) => <Recipe {...item} />}
                        ListHeaderComponent={() => <Text style={styles.title}>Recetas</Text>}
                        contentContainerStyle={styles.contentContainerStyle} />
                </View>
            )
            }

            <Button style={styles.button} text='Nueva receta' onPress={() => navigate('recipe-form')} />

        </SafeAreaView>
        // <CameraComponent />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 20
    },

    content: {
        flex: 1,
        height: '60%'
    },

    title: {
        fontSize: 30,
        color: '#43927d',
        fontWeight: '600',
        marginBottom: 10
    },

    text: {
        fontSize: 14,
        color: '#fff'
    },
    button: {
        marginTop: 20,
        width: '80%',
        height: 50,
        backgroundColor: '#43927d',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    contentContainerStyle: {
        padding: 15
    }
});

export default Recipes