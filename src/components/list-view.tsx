import * as React from "react";
import uuid from "uuid";
import { Toggle } from "../toggle";
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
    border: "1px solid rgba(30, 184, 235, 0.35)",
    resize: "none",
    width: "100%",
    font: "inherit",
    color: "white",
    background: "#063651",
    transition: "border-color 375ms ease-in-out",
  },
  list: {
    listStyle: "none inside",
  },
  tray: {
    marginBottom: "16px",
  },
  // tray > button
  button: {
    display: "block",
    marginLeft: "auto",
  },
  actionButton: {
    padding: "4px",
    background: "none",
    fontWeight: "700",
    border: "0",
    color: "white",
  },
  inlineActions: {
    width: "18.75%",
    display: "flex",
  },
  listItem: {
    padding: "12px 0",
    "&:not(:last-of-type)": {
      borderBottom: "1px solid rgba(30, 184, 235, 0.35)"
    },
  },
  strike: {
    textDecoration: "line-through",
  },
  toDo: {
    display: "flex",
  },
  inlineContent: {
    width: "calc(100% - 18.75% - 20px)",
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
    const { managedClasses }: Partial<IListViewProps> = this.props;
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
                      <button
                        className={this.props.managedClasses.actionButton}
                        disabled={t.completed}
                        onClick={onToggle}
                      >
                        Edit
                      </button>

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