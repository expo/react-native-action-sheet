import {
  ActionSheetProps,
  ActionSheetProvider,
  connectActionSheet
} from "./index";
import * as React from "react";

interface ChildOwnProps {
  name: string;
}

type ChildProps = ChildOwnProps & ActionSheetProps;

class Child extends React.Component<ChildProps> {
  showMore = () => {
    this.props.showActionSheetWithOptions(
      { options: ["Delete"] },
      buttonIndex => {
        console.log(buttonIndex);
      }
    );
  };

  render() {
    return this.props.name;
  }
}

const EnhancedChild = connectActionSheet(Child);

class App extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <EnhancedChild name="lool" />
      </ActionSheetProvider>
    );
  }
}
