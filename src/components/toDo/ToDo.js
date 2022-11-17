import React, { Component } from "react";
import styles from "./style.module.css";
class ToDo extends Component {
  state = {
    inputValue: "",
    tasks: [],
  };

  getValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  addTask = () => {
    const { inputValue, tasks } = this.state;
    

    if (inputValue === "") {
      return;
    }
    this.setState({
      tasks: [...tasks, inputValue],
      inputValue: "",
    });
  };
  render() {
    const { tasks, inputValue } = this.state;
    const taskComponents = tasks.map((task, index) => {
      // return (
      //   <li key={index} className={index === 2 ? styles.selected : null}>
      //     {task}
      //   </li>
      // );
      // return (
      //   <li
      //     key={index}
      //     className={`${index === 2 ? styles.selected : ""} ${styles.task}`}
      //   >
      //     {task}
      //   </li>
      // );
      const classes = [styles.task];
      if (index === 2) {
        classes.push(styles.selected);
      }
      return (
        <li key={index} className={classes.join(" ")}>
          {task}
        </li>
      );
    });
    return (
      <div>
        <h2 className={styles.toDoText}>ToDo List</h2>
        <input
          type="text"
          placeholder="enter a task"
          onChange={this.getValue}
          value={inputValue}
        ></input>
        <button onClick={this.addTask}>Add Task</button>

        <ol>{taskComponents}</ol>
      </div>
    );
  }
}

export default ToDo;
