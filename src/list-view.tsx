import * as React from "react";
import uuid from "uuid";
import { Toggle } from "./toggle";
import { EditItem } from "./edit-item";
import { add, update, remove } from "./utils";

// creates a skeleton that indicicates using a mandatory completed, id (imported method to assign id), and task 
export interface TodoItem {
  completed: boolean;
  id: string;
  task: string;
}

// creates two initial tasks that are already on the list, one to get lunch and one to check flight 
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

interface ListViewProps {
  initialTasks: TodoItem[];
}

interface IListState {
  tasks: TodoItem[];
  value: string;
  // why can't I make this value?:
}

export class ListView extends React.Component<ListViewProps, IListState> {
  constructor(props: ListViewProps) {
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


  render() {
    let tasks = this.state.tasks;
    return (
      <>
        <form className="Form" onSubmit={this.handleSubmit}>
          <input className="Input"
            value={this.state.value}
            onChange={this.handleChange} />
          <div className="Tray">
            <button className="Button" type="submit">
              Submit
            </button>
          </div>
        </form>
        <ul className="List">
          {tasks.length > 0 &&
            tasks.map(t => (
              <li key={t.id} className="ListItem">
                <Toggle>
                  {({ open, onToggle }) => (
                    <div className="Todo">
                      <button
                        className="ActionButton"
                        disabled={t.completed}
                        onClick={onToggle}
                      >
                        Edit
                      </button>

                      <div className="InlineContent">
                        {open ? (
                          <EditItem
                            item={t}
                            onUpdate={this.handleUpdate}
                            onDone={onToggle}
                          />
                        ) : t.completed ? (
                          <span>
                            <b>Completed!</b>{" "}
                            <span className="strike">{t.task}</span>
                          </span>
                        ) : (
                              <span>{t.task}</span>
                            )}
                      </div>

                      <div className="InlineActions">
                        <button
                          className="ActionButton"
                          onClick={() => this.handleRemove(t)}
                        >
                          Delete
                        </button>
                        <button
                          className="ActionButton"
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