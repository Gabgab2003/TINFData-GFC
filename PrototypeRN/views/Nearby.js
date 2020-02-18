/**
 * @format
 * @flow
 */

import React from 'react';

import {
    Button,
    PermissionsAndroid,
    ScrollView,
    Text,
    View,
    ToastAndroid,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import styles from '../styles';

const server = '127.0.0.1';

class Nearby extends React.Component {
    reloadList(): void {
        Geolocation.getCurrentPosition(
            position => {
                fetch(`${server}/getparks`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(position),
                })
                    .then(r => JSON.parse(r))
                    .then(r => this.setState({parks: r.parks}))
                    .catch(e =>
                        ToastAndroid.show(e.message, ToastAndroid.SHORT),
                    );
            },
            error => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            parks: [],
        };
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
                        <Button onPress={this.reloadList} title="Yes" />
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
