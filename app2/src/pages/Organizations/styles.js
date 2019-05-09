import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: colors.lighter,
  },

  loading: {
    marginTop: metrics.baseMargin * 2,
  },

  columnWrapperStyle: {
    marginHorizontal: metrics.baseMargin * 2,
    justifyContent: 'space-between',
  },
});

export default styles;
