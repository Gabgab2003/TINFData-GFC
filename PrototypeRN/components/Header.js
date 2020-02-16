import React from 'react';

import {ImageBackground, Text, StyleSheet} from 'react-native';

import Logo from '../icon.png';

const Header = (): Node => (
    <ImageBackground
        accessibilityRole={'image'}
        source={Logo}
        style={localStyle.background}
        imageStyle={localStyle.logo}>
        <Text style={localStyle.text}>Welcome to "Park"our runner</Text>
    </ImageBackground>
);

const localStyle = StyleSheet.create({
    background: {
        paddingBottom: 75,
        paddingTop: 96,
        paddingHorizontal: 32,
        backgroundColor: '#F3F3F3',
    },
    logao: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        marginLeft: -128,
        marginBottom: -192,
    },
    text: {
        fontSize: 35,
        fontWeight: '600',
        textAlign: 'center',
        color: '#fff',
    },
});

export default Header;
