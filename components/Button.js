import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = ({ disabled, text, style, onPress }) => {

    return (
        <TouchableOpacity
            style={[style, disabled && styles.disabledButton]}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={[styles.text, disabled && styles.disabledText]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '400'
    },
    disabledText: {
        // color: 'gray'
        color: '#43927d'
    },
    disabledButton: {
        backgroundColor: 'lightgray',
    }
})

export default Button