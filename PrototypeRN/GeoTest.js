import React from 'react';

import {Button, PermissionsAndroid} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

class GeoTest extends React.Component {
    location() {
        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
    }
    render() {
        return (
            <Button onPress={this.location} title={'Yes'}>
                t
            </Button>
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

export default GeoTest;
