import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const Loading = ({ show = false }: { show: boolean }) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (show) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            animatedValue.stopAnimation();
        }
    }, [show, animatedValue]);

    if (!show) {
        return null; 
    }

    return (
        <View style={styles.container}>
            <Animated.Text
                style={[
                    styles.text,
                    {
                        opacity: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.4, 1], // Fade in and out
                        }),
                    },
                ]}
            >
                Loading...🥹
            </Animated.Text>
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
