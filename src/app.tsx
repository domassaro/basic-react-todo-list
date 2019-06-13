import React from "react";
import ReactDOM from "react-dom";
import ListView, { INITIAL_LIST } from "./list-view";
import manageJss, { ComponentStyles } from "@microsoft/fast-jss-manager-react";

/*------------
  JSS STYLES
-------------*/

interface IClassNameContract {
  container: string;
}

const styles: ComponentStyles<IClassNameContract, any> = {
  container: {
    margin: "12rem auto 1rem",
    padding: "8px",
    maxWidth: "38rem"
  },
}

/*----------------
  PROPS & STATES
-----------------*/

interface IStyleProps {
  managedClasses: IClassNameContract;
}

class App extends React.Component<IStyleProps> {

  /*-------------
    CONSTRUCTOR
  --------------*/
  constructor(props: IStyleProps) {
    super(props);
  }
  public render(): JSX.Element {
    const { managedClasses }: Partial<IStyleProps> = this.props;
    return (
      <div className={this.props.managedClasses.container}>
        <h1>Add a Task</h1>
        <ListView
          initialTasks={INITIAL_LIST} />
      </div>
    );
  }
}

export default manageJss(styles)(App);