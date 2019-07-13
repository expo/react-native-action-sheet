import * as React from 'react';
import ActionSheet from './ActionSheet';
import { Provider } from './context';
import { ActionSheetOptions } from './types';

interface Props {
  children: React.ReactNode;
}

export default class ActionSheetProvider extends React.Component<Props> {
  _actionSheetRef: React.RefObject<ActionSheet>;

  constructor(props: Props) {
    super(props);
    this._actionSheetRef = React.createRef();
  }

  getContext = () => {
    return {
      showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {
        this._actionSheetRef.current !== null &&
          this._actionSheetRef.current.showActionSheetWithOptions(options, callback);
      },
    };
  };

  render() {
    return (
      <Provider value={this.getContext()}>
        <ActionSheet ref={this._actionSheetRef}>
          {React.Children.only(this.props.children)}
        </ActionSheet>
      </Provider>
    );
  }
}
