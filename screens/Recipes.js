import { SafeAreaView, StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { useQuery } from 'react-query'
import { getRecipes } from '../api/service'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
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
        <View style={styles.container}>
            {status === 'success' &&
                data.map((product) => (<Text key={product.id} style={styles.title}>{product.title}</Text>))
            }

            <Button onPress={() => logOut()} text="Cerrar sesión" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        color: '#34434D',
        fontWeight: 'bold'
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
    }
});

export default Recipes