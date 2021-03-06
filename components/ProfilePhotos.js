import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { RkButton, RkCard, RkTheme, RkText, RkModalImg, } from 'react-native-ui-kitten';
import * as UserService from './services/userProfile';
import PhotographerName from './photographerName';

export default class ProfilePhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selfies: [],
            userSelfies: []
        };
    }

    async componentDidMount() {
        try {
            const userSelfies = await UserService.all(this.props.user.id);
            this.setState({
                userSelfies,
                loading: false
            });
        } catch (err) {
            console.log(err);
        }
    }

    async onConfirmDelete(imageId) {
        await UserService.destroy(imageId);

        this.componentDidMount();
    }

    deletePhoto(imageId) {
        Alert.alert(
            'Warning!',
            'Are you sure you want to delete this image?',
            [
                { text: 'OK', onPress: () => this.onConfirmDelete(imageId) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    render() {
        if (this.state.loading === true) {
            return <ActivityIndicator size="large" color="#808080" />
        } else {
            return (
                <View style={styles.photoContainer}>
                    {this.state.userSelfies.map((image, index) => {
                        return (
                            <View key={index}>
                                <RkModalImg source={{ uri: image.image }}
                                    style={styles.photoItems}
                                    modalImgStyle={styles.modalImg}
                                    modalStyle={styles.modal}
                                />
                                <TouchableOpacity onPress={() => this.deletePhoto(image.id)}
                                    style={styles.changeImage}
                                >
                                    <Image
                                        style={{ marginHorizontal: 65, width: 20, height: 20 }}
                                        source={require('../images/icons/delete.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                </View>



            )
        }

    }
}

const styles = StyleSheet.create({

    photoContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 122
    },

    photoItems: {
        height: 80,
        width: 87,
        marginTop: 1,
        marginBottom: 1,
    },
    modal: {
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalImg: {
        height: 300,
        width: 400,
        marginTop: 200,
    },
    name: {
        alignItems: 'flex-end',
        paddingBottom: 150,
    },
    changeImage: {
        position: 'absolute',
        top: 1,
        left: 3,
    },
})


