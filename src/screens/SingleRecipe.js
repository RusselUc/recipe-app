import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from '@tanstack/react-query'
import { getRecipe } from '../api/service';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const SingleRecipe = () => {
    const route = useRoute();
    const { id } = route.params;
    const { token } = useContext(AuthContext);


    const { data } = useQuery({ queryKey: ['recipes', token, id], queryFn: getRecipe })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <Image style={styles.image} source={{ uri: data.image }} />

            </View>
            <ScrollView style={styles.card}>
                <View style={styles.cardBody}>
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{data.title}</Text>
                        <Ionicons name="heart-circle" size={40} color="#ff3077" />
                    </View>
                    <View style={styles.cardContent}>
                        <View style={styles.cardContent}>
                            <Ionicons name="md-timer-outline" size={24} color="#16232c" />
                            <Text style={styles.information}>
                                {data.time_minutes} min
                            </Text>
                        </View>

                        <View style={styles.cardContent}>
                            <Ionicons name="pricetag-outline" size={24} color="#16232c" />
                            <Text style={styles.information}>
                                $ {data.price}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.cardBodyDescription}>
                        <Text style={styles.description}>{data.description}</Text>
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flex: 1
    },
    content: {
        height: '50%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 2
    },
    cardBody: {
        padding: 10
    },
    cardBodyDescription: {
        backgroundColor: '#f3f3f3',
        padding: 20,
        borderRadius: 10
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontWeight: '400',
        fontSize: 25,
        letterSpacing: 1
    },
    information: {
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#16232c',
        marginHorizontal: 10
    },
    description: {
        fontSize: 16,
        letterSpacing: 0.5
    }
});

export default SingleRecipe;
