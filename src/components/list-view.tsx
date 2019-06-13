import * as React from "react";
import uuid from "uuid";
import { Toggle } from "./toggle";
import EditItem from "./edit-item";
import { add, update, remove } from "../utils";
import manageJss, { ComponentStyles } from "@microsoft/fast-jss-manager-react";

/*------------
  JSS STYLES
-------------*/

interface IClassNameContract {
  form: string;
  input: string;
  list: string;
  tray: string;
  button: string;
  actionButton: string;
  inlineActions: string;
  listItem: string;
  strike: string;
  toDo: string;
  inlineContent: string;
}

const styles: ComponentStyles<IClassNameContract, any> = {
  form: {
    width: "100%",
  },
  input: {
    padding: "8px",
    marginBottom: "1rem",
    display: "block",
    borderRadius: "0.25rem",
    border: "1px solid rgba(114, 220, 159, 0.31)",
    resize: "none",
    width: "100%",
    font: "inherit",
    color: "black",
    background: "white",
    transition: "border-color 375ms ease-in-out",
  },
  list: {
    listStyle: "none inside",
  },
  tray: {
    marginBottom: "16px",
  },
  button: {
    letterSpacing: "1px",
    textTransform: "uppercase",
    background: "#01b74f",
    color: "white",
    border: "0",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    lineHeight: "1rem",
    appearance: "none",
    fontWeight: "900",
    transition: "background-color 375ms ease-in-out",
    display: "block",
    marginLeft: "auto",
    "&:hover": {
      background: "#e29c00",
    }
  },
  actionButton: {
    padding: "5px",
    letterSpacing: "1px",
    background: "none",
    fontWeight: "bold",
    border: "0",
    fontStyle: "italic",
    height: "100%",
    position: "relative",
    color: "white",
    textDecoration: "none",
    "&:hover": {
      "-webkit-transition": "all 0.3s ease-in-out 0s",
      transition: "all 0.3s ease-in-out 0s",
      borderBottom: "1px #01b74f solid",
    },

  },
  inlineActions: {
    height: "100%",
    display: "flex"
  },
  listItem: {
    padding: "12px 0",
    minHeight: "50px",
    "&:not(:last-of-type)": {
      borderBottom: "1px solid #00b74f40;"
    },
  },
  strike: {
    textDecoration: "line-through",
  },
  toDo: {
    alignItems: "center",
    display: "flex",
    minHeight: "25px",
  },
  inlineContent: {
    margin: "0px 15px ",
    width: "calc(100% - 20px)"
  }
};

// Creates a skeleton that indicicates using a mandatory completed, id (imported method to assign id), and task 
export interface TodoItem {
  completed: boolean;
  id: string;
  task: string;
}

// Creates two initial tasks that are already on the list, one to get lunch and one to check flight 
export const INITIAL_LIST: TodoItem[] = [
  {
    id: uuid(),
    completed: false,
    task: "Get Lunch"
  },
  {
    id: uuid(),
    completed: false,
    task: "Check Flight"
  }
];

/*----------------
  PROPS & STATES
-----------------*/

interface IListViewProps {
  initialTasks: TodoItem[];
  managedClasses: IClassNameContract;
}

interface IListState {
  tasks: TodoItem[];
  value: string;
  // why can't I make this value?:
}

class ListView extends React.Component<IListViewProps, IListState> {
  constructor(props: IListViewProps) {
    super(props);
    this.state = {
      tasks: props.initialTasks || [],
      value: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let updatedTasks: TodoItem[] = add({
      task: this.state.value,
      id: uuid(),
      completed: false
    }, this.state.tasks);

    // setValue("");
    this.setState({
      tasks: updatedTasks,
      value: "",
    });
  };

  handleRemove = (task: TodoItem) => {
    // setTasks(remove(task, tasks));
    let removeTasks: TodoItem[] = remove(task, this.state.tasks);

    this.setState({
      tasks: removeTasks,
      value: "",
    });
  };

  handleUpdate = (task: TodoItem) => {
    // setTasks(update(task, tasks));
    let updatedTasks: TodoItem[] = update(task, this.state.tasks);

    this.setState({
      tasks: updatedTasks,
      value: "",
    });
  };

  markAsComplete = (task: TodoItem) => {
    // setTasks(update({ ...task, completed: !task.completed }, tasks));
    let completeTasks = update({ ...task, completed: !task.completed }, this.state.tasks)

    this.setState({
      tasks: completeTasks,
      value: "",
    });
  };

  /*--------------
    REACT RENDER
  ---------------*/

  public render(): JSX.Element {
    let tasks = this.state.tasks;
    return (
      <>
        <form className={this.props.managedClasses.form} onSubmit={this.handleSubmit}>
          <input className={this.props.managedClasses.input}
            value={this.state.value}
            onChange={this.handleChange} />
          <div className={this.props.managedClasses.tray}>
            <button className={this.props.managedClasses.button} type="submit">
              Submit
            </button>
          </div>
        </form>
        <ul className={this.props.managedClasses.list}>
          {tasks.length > 0 &&
            tasks.map(t => (
              <li key={t.id} className={this.props.managedClasses.listItem}>
                <Toggle>
                  {({ open, onToggle }) => (
                    <div className={this.props.managedClasses.toDo}>
                      {!t.completed && <button
                        className={this.props.managedClasses.actionButton}
                        disabled={t.completed}
                        onClick={onToggle}
                      >
                        Edit
                      </button>}

                      <div className={this.props.managedClasses.inlineContent}>
                        {open ? (
                          <EditItem
                            item={t}
                            onUpdate={this.handleUpdate}
                            onDone={onToggle}
                          />
                        ) : t.completed ? (
                          <span>
                            <b>Completed!</b>{" "}
                            <span className={this.props.managedClasses.strike}>{t.task}</span>
                          </span>
                        ) : (
                              <span>{t.task}</span>
                            )}
                      </div>

                      <div className={this.props.managedClasses.inlineActions}>
                        <button
                          className={this.props.managedClasses.actionButton}
                          onClick={() => this.handleRemove(t)}
                        >
                          Delete
                        </button>
                        <button
                          className={this.props.managedClasses.actionButton}
                          onClick={() => this.markAsComplete(t)}
                        >
                          {t.completed ? "Undo" : "Complete"}
                        </button>
                      </div>
                    </div>
                  )}
                </Toggle>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default manageJss(styles)(ListView);