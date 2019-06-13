import * as React from "react";
import { TodoItem } from "./list-view";
import manageJss, { ComponentStyles } from "@microsoft/fast-jss-manager-react";


/*------------
  JSS STYLES
-------------*/
interface IClassNameContract {
  inlineForm: string;
  inlineInput: string,
  button: string,
}

const styles: ComponentStyles<IClassNameContract, any> = {
  inlineForm: {
    display: "flex",
    width: "100%"
  },
  inlineInput: {
    flex: "1",
    display: "inline-block",
    padding: "4px",
    height: "100%",
    border: "1px solid rgba(114, 220, 159, 0.31)",
    resize: "none",
    font: "inherit"
  },
  button: {
    letterSpacing: "1px",
    textTransform: "uppercase",
    background: "#01b74f",
    color: "white",
    border: "0",
    padding: "0.25rem .5rem",
    appearance: "none",
    fontWeight: "900",
    transition: "background-color 375ms ease-in-out",
    display: "block",
    marginLeft: "auto",
    "&:hover": {
      background: "#e29c00",
    }
  },
}

/*----------------
  PROPS & STATES
-----------------*/
interface IEditProps {
  item: TodoItem;
  onUpdate: (t: TodoItem) => void;
  onDone: () => void;
  managedClasses: IClassNameContract;
}

interface IEditState {
  value: string;
}

class EditItem extends React.Component<IEditProps, IEditState> {
  /*-------------
    CONSTRUCTOR
  --------------*/
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      value: this.props.item.task,
    };
  }
  public render(): JSX.Element {
    let value = this.state.value;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({
        value: event.target.value,
      });
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      this.props.onUpdate({
        ...this.props.item, task: value
      });
      this.props.onDone();
    };

    return (
      <form className={this.props.managedClasses.inlineForm} onSubmit={handleSubmit}>
        <input className={this.props.managedClasses.inlineInput} value={value} onChange={handleChange} />
        <button type="submit" className={this.props.managedClasses.button}>Submit</button>
      </form>
    );
  }
}

export default manageJss(styles)(EditItem);