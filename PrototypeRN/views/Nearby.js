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

const server = 'http://5.132.191.83/';

class Nearby extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            parks: [],
        };
    }

    reloadList(that): void {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                fetch(`${server}:8000/getparks`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(position),
                })
                    .then(r => r.json())
                    .then(r => {
                        that.setState({parks: r});
                    })
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
                        <Text style={styles.sectionTitle}>Reload</Text>
                        <Button
                            onPress={() => this.reloadList(this)}
                            title="Reload"
                        />
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Parks</Text>
                        <Text style={styles.sectionDescription}>
                            {this.state.parks.map(p => (
                                <Text>{p.properties.ANL_NAME + '\n'}</Text>
                            ))}
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
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Gps permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
}

export default Nearby;
