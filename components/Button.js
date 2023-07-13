import { Fragment } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <Text style={styles.text}>Entrar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    text: {
        fontSize: 14,
        color: 'gray',
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
})

export default Button