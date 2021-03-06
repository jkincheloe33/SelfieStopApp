import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RkButton, RkCard, RkTheme, RkText } from 'react-native-ui-kitten';
import * as locationsService from '../components/services/locations';

export default class ArtsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            locations: [],
        };
    }
    static navigationOptions = { header: null };

    componentDidMount() {
        this.getLocations();
    }

    async getLocations() {
        try {
            const locations = await locationsService.all(21);
            this.setState({
                locations,
                loading: false
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        console.log(this.props.navigation);

        if (this.state.loading === true) {
            return (
                <View style={{ marginTop: 100 }}>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{
                        flex: 1, justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
                    }}>
                        <ScrollView >
                            {this.state.locations.map((location, index) => {
                                return (
                                    <RkCard key={index} rkType='story' >
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LocationScreen', { location }) }} >
                                            <View rkCardImgOverlay>
                                                <Text style={styles.overlayText}>{location.name}</Text>

                                            </View>

                                            <Image rkCardImg source={{ uri: location.image }} />


                                        </TouchableOpacity>
                                    </RkCard>
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            )
        }
    }
}

RkTheme.setType('RkCard', 'story', {
    img: {
        height: 200,
    },
    content: {
        alignSelf: 'center',
    },
    imgOverlay: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
const styles = StyleSheet.create({
    overlayText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 30,
        fontSize: 30,
        fontFamily: 'Cochin',
    },
})

