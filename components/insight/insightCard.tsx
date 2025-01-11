import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalTheme } from '../../constant/theme'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Insight } from '../../constant/types';

const InsightCard = ({ name, value, percent, icon, color, bad }: Insight) => {
    return (
        <View style={styles.box}>
            <View style={styles.topTitle}>
                <View style={[styles.iconBox, { backgroundColor: color }]}>
                    {icon}
                </View>
                <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.value}>{value}</Text>
                <View style={styles.bottomContentBox}>
                    <View style={{ flexDirection: 'row' }}>
                        {
                            bad ? (
                                <Ionicons name="trending-down-outline" size={24} color={globalTheme.colors.danger} />
                            ) : (
                                <Ionicons name="trending-up-outline" size={24} color={globalTheme.colors.primary} />
                            )
                        }
                        <Text style={[styles.percent, { color: bad ? globalTheme.colors.danger : globalTheme.colors.primary }]}> {percent}</Text>
                    </View>
                    <Text style={{ fontSize: 12 }}>Vs Last month</Text>
                </View>
            </View>
        </View>
    )
}

export default InsightCard

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 150,
        padding: 10,
        marginTop: 20,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: globalTheme.colors.border,
        borderRadius: 10,
    },
    topTitle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    iconBox: {
        width: 60,
        height: 60,
        backgroundColor: globalTheme.colors.miniprimary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: globalTheme.colors.text,
        fontWeight: 'bold'
    },
    bottomContent: {
        width: '100%',
        flexDirection: 'column',
        gap: 10,
        marginTop: 10
    },
    value: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottomContentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    percent: {
        fontSize: 18,
    }
})