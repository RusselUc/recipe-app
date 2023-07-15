import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import { StatusBar } from 'expo-status-bar'
import { signin } from '../api/service'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'
import { AuthContext } from '../context/AuthProvider'

const SingIn = () => {
    const [form, setForm] = useState({ email: 'russel@example.com', password: 'string' })
    const { navigate } = useNavigation()
    const { setToken } = useContext(AuthContext)

    const { mutate, data, error, isLoading } = useMutation(signin, {
        onSuccess: async (data) => {
            setToken(data?.token)
            data && navigate("recipes")
        }
    })

    const disabled = () => {
        return form.email !== '' && form.password !== ''
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipe App</Text>
            <Text style={styles.subTitle}>Sign In to your account</Text>
            <TextInput style={styles.textInput}
                placeholder='usuario@email.com'
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })} />
            <TextInput style={styles.textInput}
                placeholder='contraseña' secureTextEntry={true}
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })} />
            <Button onPress={() => mutate(form)} disabled={!disabled()} text="Entrar" />

            <TouchableOpacity style={styles.buttonSignup} onPress={() => navigate("signup")}>
                <Text style={styles.text}> Crear cuenta</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
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
        fontSize: 50,
        color: '#34434D',
        fontWeight: 'bold'
    },

    subTitle: {
        fontSize: 20,
        color: 'gray'
    },

    text: {
        fontSize: 14,
        color: '#fff'
    },

    buttonSignup: {
        marginTop: 20,
        width: '60%',
        height: 50,
        backgroundColor: '#00afff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        padding: 10,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: '#fff'
    }
});


export default SingIn