import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity, } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import * as UserService from './services/user';

export default class HeaderBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };
    }

    async componentDidMount() {
        const isLoggedIn = await UserService.isLoggedIn();

        this.setState({ isLoggedIn });
    }

    logout() {
        UserService.logout()
        this.setState({
            isLoggedIn: false
        })
    }

    navigate() {
        this.props.navigation.navigate('LoginScreen');
    }

    static navigationOptions = { header: null };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Container>
                    <Header style={{ backgroundColor: '#81ecec' }}>
                        <Left>

                        </Left>
                        <Body
                            style={{ paddingTop: 5, alignItems: 'center', justifyContent: 'center', }}
                        >
                            <Image
                                style={{ marginLeft: 100, width: 250, height: 65, }}
                                source={require('../images/headerLogo.png')}
                            />
                        </Body>
                        <Right>

                            <TouchableOpacity onPress={() => this.logout()}>
                            <Text>Log Out</Text>
                            </TouchableOpacity>

                        </Right>
                    </Header>

                </Container>

            )
        } else {
            return (
                <Container>

                    <Header
                        style={{ backgroundColor: '#81ecec' }}
                    >
                        <Left>
                            <TouchableOpacity onPress={() => { this.props.navigate('SignupScreen') }} >
                                <Text>Sign Up</Text>
                            </TouchableOpacity>
                        </Left>
                        <Body
                            style={{ paddingTop: 5, alignItems: 'center', justifyContent: 'center', }}
                        >
                            <Image
                                style={{ marginLeft: 100, width: 250, height: 65, }}
                                source={require('../images/headerLogo.png')}
                            />
                        </Body>
                        <Right>

                            <TouchableOpacity onPress={() => { this.props.navigate('LoginScreen') }}>
                                <Text>Log In</Text>
                            </TouchableOpacity>

                        </Right>
                    </Header>

                </Container>
            )
        }
    }
}
const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 10,
        justifyContent: 'center',
    },
    logo: {
        height: 220,
        width: 320,
    }
})