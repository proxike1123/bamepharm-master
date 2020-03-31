'use strict';

import React, {
    Component
} from 'react';

import {
    AppRegistry, Image, Slider,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Video from 'react-native-video';
import { sizeWidth } from "app/src/helpers/size.helper";
import styleBase from "app/src/styles/base";
import ButtonWrapper from "app/src/components/common/button-wrapper";

class VideoPlayer extends Component {

    state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'contain',
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
    };

    video: Video;

    onLoad = (data) => {
        this.setState({ duration: data.duration });
    };

    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
        this.setState({ paused: true });
        this.video.seek(0)
    };

    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({ paused: !event.hasAudioFocus })
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    render() {

        let icon = !!this.state.paused ? require('app/res/icon/play.png') : require('app/res/icon/pause.png');

        return (
            <View style={[styles.container, styleBase.fullParent]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.fullScreen]}
                    onPress={() => this.setState({ paused: !this.state.paused })}>
                    <Video
                        ref={(ref: Video) => { this.video = ref }}
                        source={{uri: this.props.video}}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                </TouchableOpacity>

                <ButtonWrapper onPress={this.props.closeModal}
                               style={[styles.close]}>
                    <Image source={require('app/res/icon/ic_close.png')}
                           style={[styles.ic_close]}/>
                </ButtonWrapper>

                <View style={styles.controls}>
                    <Slider
                        style={[styleBase.container]}
                        maximumTrackTintColor={'white'}
                        minimumTrackTintColor={'white'}
                        thumbTintColor={'white'}
                        step={1}
                        value={this.state.currentTime}
                        maximumValue={this.state.duration}
                        onValueChange={value => this.video && this.video.seek(value)}
                    />
                </View>
                {
                    !!this.state.paused &&
                    <ButtonWrapper onPress={() => this.setState({ paused: !this.state.paused })}>
                        <Image
                            source={icon}
                            style={styles.icon}
                        />
                    </ButtonWrapper>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 20
    },
    ic_close: {
        width: sizeWidth(20),
        height: sizeWidth(20),
        tintColor: 'white'
    },
    icon: {
        tintColor: 'white',
        width: sizeWidth(24),
        height: sizeWidth(24)
    }
});

export default VideoPlayer;
