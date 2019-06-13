import * as React from "react";
import { TodoItem } from "./list-view";
import manageJss, { ComponentStyles } from "@microsoft/fast-jss-manager-react";


/*------------
  JSS STYLES
-------------*/
interface IClassNameContract {
  inlineForm: string;
  inlineInput: string,
}

const styles: ComponentStyles<IClassNameContract, any> = {
  inlineForm: {
    display: "flex",
    width: "100%"
  },
  inlineInput: {
    flex: "1",
    display: "block",
    padding: "2px"
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
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default manageJss(styles)(EditItem);