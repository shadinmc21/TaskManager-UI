import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");


  const loadTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !description) return;
    await axios.post(API_URL, { title, description,dueDate });
    setTitle("");
    setDescription("");
    setDueDate("");
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API_URL}/${id}/status`, { status });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task Tracker</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="date"
          style={styles.input}
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />


        <button style={styles.addButton} onClick={addTask}>
          Add Task
        </button>
      </div>

      {tasks.map(task => (
        <div key={task.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <h4 style={styles.title}>{task.title}</h4>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </div>

          <p style={styles.description}>{task.description}</p>
          <span style={styles.status}>Status: {task.status}</span>
          <p style={styles.description}>
            Due Date: {task.dueDate}
          </p>


          <div style={styles.buttonGroup}>
            <select
              value={task.status}
              onChange={(e) => updateStatus(task.id, e.target.value)}
              style={styles.select}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

        </div>
      ))
  }
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    background: "#f3f4f6",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px"
  },
  textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px"
  },
  addButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "12px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "12px"
  },
  title: {
    margin: 0
  },
  description: {
    margin: "10px 0",
    color: "#374151"
  },
  status: {
    fontSize: "12px",
    color: "#6b7280"
  },
  buttonGroup: {
    marginTop: "10px",
    display: "flex",
    gap: "8px"
  },
  statusBtn: {
    flex: 1,
    padding: "6px",
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "12px"
  },
select: {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  cursor: "pointer"
}

};

export default App;
