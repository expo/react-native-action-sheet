import * as React from 'react';

import ActionSheet from './ActionSheet';
import { Provider } from './context';
import { ActionSheetOptions, ActionSheetProps } from './types';

interface Props {
  children: React.ReactNode;
  useNativeDriver?: boolean;
}

export default class ActionSheetProvider extends React.Component<Props> {
  _actionSheetRef: React.RefObject<ActionSheet>;
  _context: ActionSheetProps;

  constructor(props: Props) {
    super(props);
    this._actionSheetRef = React.createRef();
    this._context = {
      showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {
        if (this._actionSheetRef.current != null) {
          this._actionSheetRef.current.showActionSheetWithOptions(options, callback);
        }
      },
    };
  }

  getContext(): ActionSheetProps {
    return this._context;
  }

  render() {
    return (
      <Provider value={this._context}>
        <ActionSheet ref={this._actionSheetRef} useNativeDriver={this.props.useNativeDriver}>
          {React.Children.only(this.props.children)}
        </ActionSheet>
      </Provider>
    );
  }
}
