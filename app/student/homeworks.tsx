import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { styles } from '../../styles/HomeWorks.styles'
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
    return (
        <ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={styles.h1}>Tareas Pendientes</Text>
                <View style={styles.container}>
                    <Pressable style={styles.homework}>
                        <View>
                            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={styles.homeworkTitle}>Titulo 1</Text>
                            <View style={styles.badgeWarning}>
                                <Text style={styles.badgeTxt}>Importante</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.homework}>
                        <View>
                            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={styles.homeworkTitle}>Titulo 2</Text>
                            <View style={styles.badgeNormal}>
                                <Text style={styles.badgeTxt}>No Importante</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <Text style={styles.h1}>Tareas Completadas</Text>
                <View style={styles.container}>
                    <Pressable style={styles.homework}>
                        <View>
                            <Ionicons name="checkmark-circle" size={24} color="black" />
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={styles.homeworkTitle}>Titulo 3</Text>
                            <View style={styles.badgeDanger}>
                                <Text style={styles.badgeTxtLight}>Urgente</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.homework}>
                        <View>
                            <Ionicons name="checkmark-circle" size={24} color="black" />
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={styles.homeworkTitle}>Titulo 3</Text>
                            <View style={styles.badgeNormal}>
                                <Text style={styles.badgeTxtLight}>No importante</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.homework}>
                        <View>
                            <Ionicons name="checkmark-circle" size={24} color="black" />
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={styles.homeworkTitle}>Titulo 4</Text>
                            <View style={styles.badgeDanger}>
                                <Text style={styles.badgeTxtLight}>Urgente</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={styles.container}>
                    <Pressable style={styles.homework}>
                        <View>
                            <Ionicons name="checkmark-circle" size={24} color="black" />
                        </View>
                        <View style={{ width: 150 }}>
                            <Text style={styles.homeworkTitle}>Titulo 5</Text>
                            <View style={styles.badgeNormal}>
                                <Text style={styles.badgeTxtLight}>No importante</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

export default Page