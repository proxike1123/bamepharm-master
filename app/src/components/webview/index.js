import React from 'react';
import {
  View,
  Text
} from 'react-native';
import WebView from 'react-native-webview';
import { connect } from "react-redux";
import styleBase from "app/src/styles/base";
import { navigateBack } from "app/src/actions/nav.action";
import Toolbar from "app/src/components/common/toolbar";
import BackIcon from "app/src/components/common/back-icon";
import LoadingIndicator from "app/src/components/common/loading-indicator";

class WebViewPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: false
    };

    this.canGoBack = false;
  }

  handleNavigationStateChange = (navState) => {
    this.canGoBack = navState.canGoBack;
  };

  handleBackPress = () => {
    if (!!this.canGoBack && !!this.webView) {
      this.webView.goBack();
    } else {
      this.props.navigateBack();
    }
  };

  onLoadEnd = () => {
    this.setState({ loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  renderCenter = () => {
    let { title } = !!this.props.navigation && this.props.navigation.state.params || {};
    return (
      <Text style={[styleBase.text18, styleBase.textBold, styleBase.textWhite]}>
        {title}
      </Text>
    )
  };

  render() {
    let { source } = !!this.props.navigation && this.props.navigation.state.params || {};
    let { error, loading } = this.state;

    return (
      <View style={[styleBase.container]}>
        <Toolbar center={this.renderCenter()}
                 left={<BackIcon goBack={this.handleBackPress}/>}/>
        <WebView source={{ uri: source }}
                 ref={ref => this.webView = ref}
                 onLoadEnd={this.onLoadEnd}
                 onLoadStart={this.onLoadStart}
                 javaScriptEnabled={true}
                 style={[styleBase.container]}
                 onError={this.onError}
                 onNavigationStateChange={this.handleNavigationStateChange}
                 showsVerticalScrollIndicator={false}/>
        {
          loading && <LoadingIndicator style={[styleBase.fullParent, styleBase.fillParent]}/>
        }
      </View>
    )
  }
}

export default connect(null, { navigateBack })(WebViewPreview);
