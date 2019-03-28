import * as React from 'react';
import ActionSheet from './ActionSheet';
import { ActionSheetOptions } from './types';

export type Context = {
  showActionSheetWithOptions:
    | ((options: ActionSheetOptions, callback: (i: number) => void) => void)
    | null;
};

const { Provider, Consumer } = React.createContext<Context>({
  showActionSheetWithOptions: null,
});

export { Consumer };

type Props = {
  children: any;
};

export default class ActionSheetProvider extends React.Component<Props> {
  _actionSheetRef: any;

  getContext() {
    return {
      showActionSheetWithOptions: (...args) => {
        this._actionSheetRef.showActionSheetWithOptions(...args);
      },
    };
  }

  render() {
    return (
      <Provider value={this.getContext()}>
        <ActionSheet ref={component => (this._actionSheetRef = component)}>
          {React.Children.only(this.props.children)}
        </ActionSheet>
      </Provider>
    );
  }
}
