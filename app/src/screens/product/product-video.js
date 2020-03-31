import React from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {videoFullpath} from 'app/src/helpers/url.helper';
import styleBase from 'app/src/styles/base';
import {sizeWidth} from 'app/src/helpers/size.helper';
import VideoPlayer from 'app/src/screens/product/video';

class ProductVideo extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {video, visible = true, closeModal} = this.props;
    return (
      <Modal
        isVisible={visible}
        style={[styleBase.bgWhite, {marginHorizontal: 0, marginVertical: 0}]}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}>
        <VideoPlayer
          video={videoFullpath(video, true)}
          closeModal={closeModal}
        />
      </Modal>
    );
  }
}

ProductVideo.propTypes = {};

ProductVideo.defaultProps = {};

export default ProductVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    // backgroundColor: '#000000'
  },
  video: {
    width: sizeWidth(414),
    height: sizeWidth(300),
  },
});
