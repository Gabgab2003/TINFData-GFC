/**
 * @format
 * @flow
 */

import React from 'react';

import {Button, PermissionsAndroid, ScrollView, Text, View} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import styles from '../styles';

class Nearby extends React.Component {
    location() {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    }
    constructor(props, context): void {
        super(props, context);
    }

    render() {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                {global.HermesInternal == null ? null : (
                    <View style={styles.engine}>
                        <Text style={styles.footer}>Engine: Hermes</Text>
                    </View>
                )}
                <View style={styles.body}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Custom stuff</Text>
                        <Button onPress={this.location} title={'Yes'}>
                            t
                        </Button>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Learn More</Text>
                        <Text style={styles.sectionDescription}>
                            Yes, the app here is made out of app.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
    componentDidMount() {
        this.requestGPSPermission();
    }

    async requestGPSPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Please give GPS',
                    message: 'We need location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use gps');
            } else {
                console.log('Gps permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
}

export default Nearby;
