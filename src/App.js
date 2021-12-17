import logo from "./logo.svg";
import "./App.css";
import fetchedTasks from "./tasks.json";
import { useEffect, useRef, useState } from "react";
import Gantt from "frappe-gantt";
import moment from "moment";

function App() {
  const [tasks, setTasks] = useState([]);
  const target = useRef(null);
  const svg = useRef(null);

  useEffect(() => {
    // run a fetch here to get tasks as json from a url
    console.log("tasks", fetchedTasks);

    const newTasks = fetchedTasks.map((task) => ({
      id: task.milestoneId,
      name: task.milestoneName,
      start: task.startDate,
      end: task.endDate,
      assignee: task.assignee.name.replace(/[<>]/g, ''),
      progress: 100,
    }));

    setTasks(newTasks);
  }, []);

  useEffect(() => {
    if (svg.current) {
        new Gantt(svg.current, tasks, {
          custom_popup_html: (task) => {
            const startDate = moment(task._start).format("MMM D")
            const endDate = moment(task._end).format("MMM D")
            return `
              <div class="title">${task.name}</div>
              <div class="subtitle">${startDate} - ${endDate}</div>
              <div class="subtitle">${task.assignee}</div>
            `;
          },
        })
    }
  }, [svg, tasks]);

  return (
    <>
      {tasks.length && (
        <div style={{ overflow: "scroll" }} ref={target.current}>
          <svg
            ref={svg}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          />
        </div>
      )}
    </>
  );
}

export default App;
