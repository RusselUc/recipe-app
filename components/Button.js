import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = (props) => {
    const { disabled, text } = props;

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabledButton]}
            {...props}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: '#fff'
    },
    button: {
        marginTop: 20,
        width: '60%',
        height: 50,
        backgroundColor: '#5A75FA',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disabledText: {
        color: 'gray'
    },
    disabledButton: {
        backgroundColor: 'lightgray',
        // Aquí puedes agregar cualquier otro estilo que desees para un botón desactivado
    }
})

export default Button