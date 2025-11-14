import React, { useEffect, useState } from "react";
import { getTasksOfUser, updateTaskStatus } from "../apis/taskAPI";
import { toast } from "react-toastify";
import { FaTasks, FaCalendarAlt, FaFlag, FaClock } from "react-icons/fa";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // ✅ Fetch all data
  const fetchData = async () => {
    try {
      const response = await getTasksOfUser();
      if (response.data.success) {
        setTasks(response.data.usersTasks);
      } else {
        toast.error("Failed to load tasks");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatusChange = async (taskId, newStatus) => {
    try {
      const response = await updateTaskStatus(taskId, newStatus);
      if (response.data.success) {
        toast.success("Task status updated successfully!");
        fetchData(); // refresh tasks
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      toast.error(error.response?.data?.message || "Error updating status");
    }
  }

  // ✅ Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  // ✅ Priority styling
  const getPriorityBadge = (priority) => {
    const colors = {
      High: "danger",
      Medium: "warning",
      Low: "success",
    };
    return (
      <span className={`badge bg-${colors[priority] || "secondary"}`}>
        {priority || "N/A"}
      </span>
    );
  };

  // ✅ Status badge
  const getStatusBadge = (status) => {
    const colors = {
      Planned: "secondary",
      "In Progress": "primary",
      Completed: "success",
    };
    return (
      <span className={`badge bg-${colors[status] || "dark"}`}>
        {status || "N/A"}
      </span>
    );
  };

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary mb-0">
          <FaTasks className="me-2" /> My Task List
        </h3>
        <span className="text-muted">
          Total Tasks: <strong>{tasks.length}</strong>
        </span>
      </div>

      {/* Task Table */}
      <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle text-center mb-0">
            <thead className="table-primary">
              <tr>
                <th>Sr.No</th>
                <th>Task</th>
                <th>Description</th>
                <th>Project</th>
                <th>
                  <FaCalendarAlt className="me-1" /> Start
                </th>
                <th>
                  <FaClock className="me-1" /> End
                </th>
                <th>
                  <FaFlag className="me-1" /> Priority
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.length > 0 ? (
                currentTasks.map((task, i) => (
                 <tr key={task._id || i} className="task-row text-center">

  <td data-label="Sr. No">
    {indexOfFirstTask + i + 1}
  </td>

  <td data-label="Task" className="fw-semibold text-center ps-3 text-capitalize">
    {task.title}
  </td>

  <td data-label="Description" className="text-muted small text-center">
    {task.description || "-"}
  </td>

  <td data-label="Project">
    {task.projectId?.name || "-"}
  </td>

  <td data-label="Start Date">
    {task.startDate
      ? new Date(task.startDate).toLocaleDateString("en-GB")
      : "-"}
  </td>

  <td data-label="End Date">
    {task.endDate
      ? new Date(task.endDate).toLocaleDateString("en-GB")
      : "-"}
  </td>

  <td data-label="Priority">
    {getPriorityBadge(task.priority)}
  </td>

  <td data-label="Status">
    <select
      className={`form-select form-select-sm text-center
        ${task.status === "Completed"
          ? "border-success text-success"
          : task.status === "In Progress"
            ? "border-primary text-primary"
            : "border-secondary text-secondary"
        }`}
      value={task.status}
      onChange={(e) => updateStatusChange(task._id, e.target.value)}
      style={{
        fontWeight: "600",
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg fill=\"%23000\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 6l4 4 4-4\"/></svg>')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        backgroundSize: "12px",
        appearance: "none",
      }}
    >
      <option value="Planned" style={{ color: "#6c757d", fontWeight: 600 }}>
        Planned
      </option>

      <option value="In Progress" style={{ color: "#0d6efd", fontWeight: 600 }}>
        In Progress
      </option>

      <option value="Completed" style={{ color: "#198754", fontWeight: 600 }}>
        Completed
      </option>
    </select>
  </td>

</tr>

                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    <FaTasks className="fs-3 mb-2 text-secondary" />
                    <div>No tasks available</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination pagination-sm mb-0">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="page-link">{i + 1}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TaskList;
