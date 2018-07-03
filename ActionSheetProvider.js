import React from 'react';
import PropTypes from 'prop-types';
import ActionSheet from './ActionSheet';

import { Provider } from './Context';

export default class ActionSheetProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this._actionSheetRef = React.createRef();
  }

  render() {
    return (
      <Provider value={this._actionSheetRef}>
        <ActionSheet ref={this._actionSheetRef}>
          {React.Children.only(this.props.children)}
        </ActionSheet>
      </Provider>
    );
  }
}
