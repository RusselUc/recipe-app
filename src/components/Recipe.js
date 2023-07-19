import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const Recipe = ({ title, time_minutes, price, id }) => {
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigate('details', { id })}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.information}>
                    <Text>Tiempo: {time_minutes}</Text>
                    <Text>Precio: {price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderRadius: 21,
        marginBottom: 10
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        height: 80,
        marginBottom: 10,
        elevation: 2,
        marginLeft: 8,
        marginRight: 8
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15
    },

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },

    title: {
        fontWeight: '900',
        letterSpacing: 0.5,
        fontSize: 16,
        margin: 10
    },

    subtitle: {
        color: '#101318',
        fontSize: 14,
        fontWeight: 'bold'
    },

    description: {
        color: '#56636F',
        fontSize: 13,
        fontWeight: 'normal',
        width: '100%'
    },

    information: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    }
})

export default Recipe