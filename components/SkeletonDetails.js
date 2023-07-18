import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';
import { StatusBar } from 'expo-status-bar';


const SkeletonDetails = () => {
    return (
        <>
            <View style={styles.content}>
                <View style={styles.imageLoading}>
                    <Skeleton width={'80%'} height={'90%'} colorMode={'light'} />
                </View>

            </View>
            <View style={styles.card}>
                <View style={styles.cardBody}>
                    <View style={styles.cardContent}>
                        <Skeleton width={'60%'} height={20} colorMode={'light'} />
                        <Ionicons name="heart-circle" size={40} color="#ff3077" />
                    </View>
                    <View style={styles.cardContent}>
                        <View style={styles.cardContent}>
                            <Ionicons name="md-timer-outline" size={24} color="#16232c" />
                            <Skeleton width={'50%'} height={10} colorMode={'light'} />
                        </View>

                        <View style={styles.cardContent}>
                            <Ionicons name="pricetag-outline" size={24} color="#16232c" />
                            <Skeleton width={'50%'} height={10} colorMode={'light'} />
                        </View>
                    </View>

                    <View style={styles.cardBodyDescription}>
                        <Skeleton width={'100%'} height={60} colorMode={'light'} />
                    </View>
                </View>
            </View>
        </>
    )
}

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

    imageLoading: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginTop: -30,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
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

export default SkeletonDetails