import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import HomeToolbar from 'app/src/screens/home/home-toolbar';
import {TabBar, TabView} from 'react-native-tab-view';
import {getProfile} from 'app/src/helpers/storage.helper';
import {accountType, appColor, font} from 'app/src/constants/app.constant';
import Api from 'app/src/api/api';
import {sizeWidth} from 'app/src/helpers/size.helper';
import HomeTabProduct from 'app/src/screens/home-v2/product-tab';
import {PopupAgencySelection, ConfirmOrderPopup} from '../../components/popup';
import {
  saveSelectedAgency,
  getSelectedAgency,
} from '../../helpers/storage.helper';
import {sizeFont} from '../../helpers/size.helper';
import EventRegister from '../../helpers/event-register.helper';

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [],
      selectedType: null,
      agencySelectionDisplayed: false,
      isSelectedAgency: true,
    };
  }

  loadData = async () => {
    try {
      const profile = await getProfile();
      const selectedAgency = await getSelectedAgency();
      const agencies =
        profile.type === accountType.sale ? await Api.getAgencies() : [];
      const agencySelectionDisplayed =
        profile.type === accountType.sale &&
        !selectedAgency &&
        agencies.length > 0;
      this.setState({
        agencySelectionDisplayed,
        isSelectedAgency: !agencySelectionDisplayed,
      });
      if (agencySelectionDisplayed) return;
      let rootCategories = await Api.rootCategories(profile.type);
      rootCategories = rootCategories.map(it => ({
        ...it[0],
        key: `category_${it[0].category_id}`,
      }));
      this.setState({
        selectedType: rootCategories[0].category_id,
        routes: rootCategories,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });
    }
  };

  async componentDidMount() {
    this.agencySelectEvent = EventRegister.on(
      'selectAgency',
      this.onSelectAgency,
    );
    this.loadData();
  }

  handleIndexChange = index => {
    this.setState({index});
  };

  renderTabBar = (props: SceneRendererProps & {navigationState: State}) => (
    <TabBar
      {...props}
      activeColor={appColor.primary}
      inactiveColor={'#CCCCCC'}
      indicatorStyle={styles.indicator}
      renderLabel={({route, focused, color}) => (
        <Text style={{color, margin: 5, fontFamily: font.medium}}>
          {route.name}
        </Text>
      )}
      style={styles.tabbar}
    />
  );

  renderScene = ({route}) => {
    let {index, routes} = this.state;
    if (Math.abs(index - routes.indexOf(route)) > 3) {
      return <View />;
    }

    return <HomeTabProduct categoryId={route.category_id} />;
  };

  onPressConfirm = async selectedAgency => {
    await saveSelectedAgency(selectedAgency);
    EventRegister.emit('selectAgency');
    this.setState({agencySelectionDisplayed: false});
  };

  onPressOrder = () => {};

  onPressReset = () => {};

  onSelectAgency = async () => {
    this.loadData();
  };

  componentWillUnmount = async () => {
    EventRegister.off(this.agencySelectEvent);
  };

  render() {
    const {profile} = this.props;
    const {agencySelectionDisplayed, isSelectedAgency} = this.state;
    return (
      <View style={styles.container}>
        <HomeToolbar
          isSelectedAgency={isSelectedAgency}
          navigateToPage={this.props.navigateToPage}
        />
        {isSelectedAgency ? (
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            tabBarPosition="top"
            swipeEnabled={false}
            onIndexChange={this.handleIndexChange}
          />
        ) : (
          <View style={styles.body}>
            <Text style={styles.message}>
              Chưa chọn đại lý cho phiên làm việc
            </Text>
          </View>
        )}

        {agencySelectionDisplayed &&
        profile.profile.type === accountType.sale ? (
          <PopupAgencySelection
            onBackdropPress={() =>
              this.setState({agencySelectionDisplayed: false})
            }
            onPressConfirm={this.onPressConfirm}
            isVisible={agencySelectionDisplayed}
          />
        ) : null}
        {agencySelectionDisplayed && (
          <ConfirmOrderPopup
            onPressOrder={this.onPressOrder}
            onPressReset={this.onPressReset}
            isVisible={false}
            agencyName="Đại Lý A"
          />
        )}
      </View>
    );
  }
}

export default connect(
  state => ({
    profile: state.profile,
  }),
  null,
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  indicator: {
    backgroundColor: appColor.primary,
    height: sizeWidth(3),
  },
  message: {
    color: appColor.blur,
    fontSize: sizeFont(18),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
