import * as React from 'react';
import ActionSheet from './ActionSheet';
import { ActionSheetOptions } from './types';

export type Context = {
  showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => void;
};

const { Provider, Consumer } = React.createContext<Context>({
  showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {},
});

export { Consumer };

type Props = {
  children: React.ReactNode;
};

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
