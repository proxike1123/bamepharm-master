import {StyleSheet, Platform} from 'react-native';
import {appColor, font} from 'app/src/constants/app.constant';
import {sizeFont, sizeWidth} from 'app/src/helpers/size.helper';

const styleBase = StyleSheet.create({
  base: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  selfCenter: {
    alignSelf: 'center',
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  selfEnd: {
    alignSelf: 'flex-end',
  },
  textCenter: {
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  divider: {
    height: 1,
    borderColor: '#e5e5e5',
    borderWidth: 1,
  },
  column: {
    flexDirection: 'column',
  },
  nav: {
    height: 60,
    backgroundColor: '#fff',
  },
  fillParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  fullParent: {
    height: '100%',
    width: '100%',
  },
  w60: {
    width: '60%',
  },
  w70: {
    width: '70%',
  },
  h75: {
    height: '75%',
  },
  w75: {
    width: '75%',
  },
  w80: {
    width: '80%',
  },
  h25: {
    height: '25%',
  },
  w25: {
    width: '25%',
  },
  w100: {
    width: '100%',
  },
  h100: {
    height: '100%',
  },
  h50: {height: '50%'},
  w50: {width: '50%'},
  w40: {width: '40%'},
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  textInput: {
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  fontRubik: {
    fontFamily: 'Rubik',
    color: '#444',
  },
  grow: {
    flexGrow: 1,
  },
  borderButton: {
    borderRadius: 4,
  },
  roundCornerButton: {
    borderRadius: 30,
  },
  textPrimary: {
    color: appColor.primary,
  },
  textWhite: {
    color: '#fff',
  },
  text79: {
    color: 'rgb(79,79,79)',
  },
  text167: {
    color: 'rgb(167,167,167)',
  },
  textBlack: {
    color: '#4A4643',
  },
  textGrey: {
    color: '#a2a8b1',
  },
  text4: {
    color: '#444',
  },
  text6: {
    color: '#666',
  },
  textPrim: {
    color: '#D0CFD0',
  },
  textE5: {
    color: '#e5e5e5',
  },
  textWhiteSmoke: {
    color: '#F6F6F6',
  },
  textDanger: {
    color: '#ff4444',
  },
  textBlue: {
    color: '#3092FF',
  },
  textYellow: {
    color: '#F8E71C',
  },
  fontBold: {
    fontWeight: '600',
  },
  textWrap: {
    width: 0,
    flexGrow: 1,
  },
  text9: {
    fontSize: sizeFont(9),
  },
  text10: {
    fontSize: sizeFont(10),
  },
  text11: {
    fontSize: sizeFont(11),
  },
  text12: {
    fontSize: sizeFont(12),
  },
  text13: {
    fontSize: sizeFont(13),
  },
  text14: {
    fontSize: sizeFont(14),
  },
  text15: {
    fontSize: sizeFont(15),
  },
  text16: {
    fontSize: sizeFont(16),
  },
  text17: {
    fontSize: sizeFont(17),
  },
  text18: {
    fontSize: sizeFont(18),
  },
  text19: {
    fontSize: sizeFont(19),
  },
  text20: {
    fontSize: sizeFont(20),
  },
  textBold: {
    fontFamily: font.bold,
  },
  textMedium: {
    fontFamily: font.medium,
  },
  textRegular: {
    fontFamily: font.regular,
  },
  textLight: {
    fontFamily: font.light,
  },
  textSemiBold: {
    fontFamily: font.semiBold,
  },
  textGray29: {
    color: '#4A4A4A',
  },
  textAppColor: {
    color: appColor.primary,
  },
  shadowBox: {
    elevation: 2,
    shadowColor: '#999',
    shadowOffset: {
      width: 0.5,
      height: 1.5,
    },
    backgroundColor: '#fff',
    shadowOpacity: 0.9,
    shadowRadius: 1.5,
    borderBottomWidth: 0,
    borderRadius: 5,
  },
  shadow: {
    elevation: 2,
    shadowColor: '#999',
    shadowOffset: {
      width: 0.5,
      height: 1.5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.5,
    borderBottomWidth: 0,
  },
  colorInput: {
    color: '#55db55',
  },
  panelHeader: {
    height: 40,
    borderWidth: 0,
  },
  roundButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  borderTop: {
    borderTopWidth: 1,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  borderLeft: {
    borderLeftWidth: 1,
  },
  borderRight: {
    borderRightWidth: 1,
  },
  bordered: {
    borderWidth: 1,
  },
  borderNone: {
    borderWidth: 0,
  },
  borderE5: {
    borderColor: '#e5e5e5',
  },
  borderWhite: {
    borderColor: '#fff',
  },
  borderRadiusNone: {
    borderRadius: 0,
  },
  borderBlue: {
    borderColor: '#3092FF',
  },
  bgGreen: {
    backgroundColor: '#55db55',
  },
  bgE5: {
    backgroundColor: '#e5e5e5',
  },
  bgGrey: {
    backgroundColor: '#a2a8b1',
  },
  bgLightGrey: {
    backgroundColor: '#ebecf0',
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  bgDefault: {
    backgroundColor: '#eef3f7',
  },
  bgWhiteTransparent: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  bgWhiteTransparentBrighter: {
    backgroundColor: 'rgba(229,229,229,0.5)',
  },
  bgBlue: {
    backgroundColor: '#3092FF',
  },
  colorBlue: {
    color: '#3092ff',
  },
  bgFacebook: {
    backgroundColor: '#3b5998',
  },
  bgGoogle: {
    backgroundColor: '#dc4e41',
  },
  bgDanger: {
    backgroundColor: '#ff4444',
  },
  bgBlack: {
    backgroundColor: '#000',
  },
  bgYellow: {
    backgroundColor: '#F8E71C',
  },
  noBg: {
    backgroundColor: 'transparent',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  /* Gutters */
  p_sm_top: {
    paddingTop: 5,
  },
  p_sm_left: {
    paddingLeft: 5,
  },
  p_sm_right: {
    paddingRight: 5,
  },
  p_sm_bottom: {
    paddingBottom: 5,
  },
  p_sm_vertical: {
    paddingVertical: 5,
  },
  p_sm_horizontal: {
    paddingHorizontal: 5,
  },
  m_sm_top: {
    marginTop: 5,
  },
  m_sm_left: {
    marginLeft: 5,
  },
  m_sm_right: {
    marginRight: 5,
  },
  m_sm_bottom: {
    marginBottom: 5,
  },
  m_sm_vertical: {
    marginVertical: 5,
  },
  m_sm_horizontal: {
    marginHorizontal: 5,
  },
  // Padding 10.
  p_10_top: {
    paddingTop: sizeWidth(10),
  },
  p_10_left: {
    paddingLeft: sizeWidth(10),
  },
  p_10_right: {
    paddingRight: sizeWidth(10),
  },
  p_10_bottom: {
    paddingBottom: sizeWidth(10),
  },
  p_10_vertical: {
    paddingVertical: sizeWidth(10),
  },
  p_10_horizontal: {
    paddingHorizontal: sizeWidth(10),
  },
  m_10_top: {
    marginTop: sizeWidth(10),
  },
  m_10_left: {
    marginLeft: sizeWidth(10),
  },
  m_10_right: {
    marginRight: sizeWidth(10),
  },
  m_10_bottom: {
    marginBottom: sizeWidth(10),
  },
  m_10_vertical: {
    marginVertical: sizeWidth(10),
  },
  m_10_horizontal: {
    marginHorizontal: sizeWidth(10),
  },

  // padding 15.
  p_15_top: {
    paddingTop: sizeWidth(15),
  },
  p_15_left: {
    paddingLeft: sizeWidth(15),
  },
  p_15_right: {
    paddingRight: sizeWidth(15),
  },
  p_15_bottom: {
    paddingBottom: sizeWidth(15),
  },
  p_15_vertical: {
    paddingVertical: sizeWidth(15),
  },
  p_15_horizontal: {
    paddingHorizontal: sizeWidth(15),
  },
  m_15_top: {
    marginTop: sizeWidth(15),
  },
  m_15_left: {
    marginLeft: sizeWidth(15),
  },
  m_15_right: {
    marginRight: sizeWidth(15),
  },
  m_15_bottom: {
    marginBottom: sizeWidth(15),
  },
  m_15_vertical: {
    marginVertical: sizeWidth(15),
  },
  m_15_horizontal: {
    marginHorizontal: sizeWidth(15),
  },

  // padding 5.
  p_5_top: {
    paddingTop: sizeWidth(5),
  },
  p_5_left: {
    paddingLeft: sizeWidth(5),
  },
  p_5_right: {
    paddingRight: sizeWidth(5),
  },
  p_5_bottom: {
    paddingBottom: sizeWidth(5),
  },
  p_5_vertical: {
    paddingVertical: sizeWidth(5),
  },
  p_5_horizontal: {
    paddingHorizontal: sizeWidth(5),
  },
  m_5_top: {
    marginTop: sizeWidth(5),
  },
  m_5_left: {
    marginLeft: sizeWidth(5),
  },
  m_5_right: {
    marginRight: sizeWidth(5),
  },
  m_5_bottom: {
    marginBottom: sizeWidth(5),
  },
  m_5_vertical: {
    marginVertical: sizeWidth(5),
  },
  m_5_horizontal: {
    marginHorizontal: sizeWidth(5),
  },

  // Padding 20.
  p_20_top: {
    paddingTop: sizeWidth(20),
  },
  p_20_left: {
    paddingLeft: sizeWidth(20),
  },
  p_20_right: {
    paddingRight: sizeWidth(20),
  },
  p_20_bottom: {
    paddingBottom: sizeWidth(20),
  },
  p_20_vertical: {
    paddingVertical: sizeWidth(20),
  },
  p_20_horizontal: {
    paddingHorizontal: sizeWidth(20),
  },
  m_20_top: {
    marginTop: sizeWidth(20),
  },
  m_20_left: {
    marginLeft: sizeWidth(20),
  },
  m_20_right: {
    marginRight: sizeWidth(20),
  },
  m_20_bottom: {
    marginBottom: sizeWidth(20),
  },
  m_20_vertical: {
    marginVertical: sizeWidth(20),
  },
  m_20_horizontal: {
    marginHorizontal: sizeWidth(20),
  },

  // Padding md
  p_md_top: {
    paddingTop: 15,
  },
  p_md_left: {
    paddingLeft: 15,
  },
  p_md_right: {
    paddingRight: 15,
  },
  p_md_bottom: {
    paddingBottom: 15,
  },
  p_md_vertical: {
    paddingVertical: 15,
  },
  p_md_horizontal: {
    paddingHorizontal: 15,
  },
  // Gutter md
  m_md_top: {
    marginTop: 15,
  },
  m_md_left: {
    marginLeft: 15,
  },
  m_md_right: {
    marginRight: 15,
  },
  m_md_bottom: {
    marginBottom: 15,
  },
  m_md_vertical: {
    marginVertical: 15,
  },
  m_md_horizontal: {
    marginHorizontal: 15,
  },

  // Gutter LG
  m_lg_top: {
    marginTop: 30,
  },
  p_lg_top: {
    paddingTop: 30,
  },
  m_lg_bottom: {
    marginBottom: 30,
  },
  p_lg_bottom: {
    paddingBottom: 30,
  },
  p_lg_right: {
    paddingRight: 30,
  },
  p_lg_left: {
    paddingLeft: 30,
  },
  m_lg_right: {
    marginRight: 30,
  },
  p_lg_vertical: {
    paddingVertical: 30,
  },
  m_lg_vertical: {
    marginVertical: 30,
  },
  p_lg_horizontal: {
    paddingHorizontal: 30,
  },
  m_lg_horizontal: {
    marginHorizontal: 30,
  },

  //Gutter XL
  m_xl_top: {
    marginTop: 45,
  },
  m_xl_bottom: {
    marginBottom: 45,
  },
  m_xl_right: {
    marginRight: 45,
  },
  m_xl_horizontal: {
    marginHorizontal: 45,
  },
  m_xl_vertical: {
    marginVertical: 45,
  },
  p_xl_top: {
    paddingTop: 45,
  },
  p_xl_bottom: {
    paddingBottom: 45,
  },
  p_xl_right: {
    paddingRight: 45,
  },
  p_xl_left: {
    paddingLeft: 45,
  },
  p_xl_horizontal: {
    paddingHorizontal: 45,
  },
  p_xl_vertical: {
    paddingVertical: 45,
  },
  /**
   * Text
   */
  extraText: {
    fontSize: sizeFont(6.8),
  },
  bigText: {
    fontSize: sizeFont(17),
  },
  normalText: {
    fontSize: sizeFont(15),
  },
  smallText: {
    fontSize: sizeFont(3.8),
  },
  smallerText: {
    fontSize: sizeFont(3),
  },
  extraIcon: {
    fontSize: sizeFont(7),
  },
  bigIcon: {
    fontSize: sizeFont(5.7),
  },
  icon: {
    fontSize: sizeFont(4.4),
  },
  smallIcon: {
    fontSize: sizeFont(4),
  },

  /**
   * Image Size
   * */
  image120: {
    width: sizeWidth(32),
    height: sizeWidth(32),
    borderRadius: sizeWidth(32) / 2,
  },
  image60: {
    width: sizeWidth(16),
    height: sizeWidth(16),
    borderRadius: sizeWidth(16) / 2,
  },
  image45: {
    width: sizeWidth(12),
    height: sizeWidth(12),
    borderRadius: sizeWidth(12) / 2,
  },
  image10: {
    width: sizeWidth(10),
    height: sizeWidth(10),
    borderRadius: sizeWidth(10) / 2,
  },
  minHeight100: {
    minHeight: sizeWidth(26.6),
  },
  height250: {
    height: sizeWidth(66.6),
  },
  height60: {
    height: sizeWidth(60),
  },
  dimension100: {
    width: sizeWidth(100),
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  email: {
    textDecorationLine: 'underline',
  },
});

export default styleBase;
