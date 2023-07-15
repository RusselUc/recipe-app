import { useContext } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from 'react-query';
import { getRecipe } from '../api/service';
import { useRoute } from '@react-navigation/native';

const SingleRecipe = () => {
    const route = useRoute();
    const { id } = route.params;
    const { token } = useContext(AuthContext);
    const { data, status } = useQuery(['recipes', token, id], getRecipe);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {status === 'success' && (
                    <Image style={{ height: 200, width: 200 }} source={{ uri: data.image }} />
                )}
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SingleRecipe;
