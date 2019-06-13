import React from "react";
import ListView, { INITIAL_LIST } from "./list-view";
import manageJss, { ComponentStyles } from "@microsoft/fast-jss-manager-react";

/*------------
  JSS STYLES
-------------*/

interface IClassNameContract {
  "@global": string;
  container: string;
}

const styles: ComponentStyles<IClassNameContract, any> = {
  "@global": {
    html: {
      boxSizing: "border-box",
      background: "#092e41",
      font: "400 100%/1.6 var(--ss)",
      color: "#b3dbee",
      "-webkit-font-smoothing": "antialiased",
    },
    body: {
      margin: "0",
      padding: "0",
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      "-webkit-font-smoothing": "antialiased",
    },
    "*": {
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
    },
    ":root": {
      "--w": "60rem",
      "--ss": "system-ui, Avenir Next, Segoe UI, PT Sans, sans-serif",
      "--yellow": "#ffba00",
    },
    h1: {
      fontWeight: "900",
      fontSize: "300%",
      marginBottom: "32px",
    }
  },
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
  public render(): JSX.Element {
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