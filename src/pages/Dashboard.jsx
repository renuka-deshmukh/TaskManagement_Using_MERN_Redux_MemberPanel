import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo } from '../Redux/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { getTasksOfUser } from '../apis/taskAPI';
import { motion } from "framer-motion";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf, FaPlus } from "react-icons/fa";
import './Dashboard.css'

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const { user, status } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  async function fetchBaseQuery() {
    await dispatch(getUserInfo())
  }

  useEffect(() => {
    fetchBaseQuery()
  }, [])

    const fetchTasks = async () => {
    try {
      const response = await getTasksOfUser();
      if (response.data.success) setTasks(response.data.usersTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

   // Task summary stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const plannedTasks = tasks.filter((t) => t.status === "Planned").length;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.div
        className="hero-section text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="fw-bold gradient-text">Welcome to TaskFlow</h1>
        <p className="lead text-muted">
          Plan smarter, work better, and track your progress effortlessly.
        </p>
        <button
          className="btn btn-primary btn-lg mt-3 shadow"
          onClick={() => navigate("/tasks")}
        >
          <FaClipboardList className="me-2" /> View My Tasks
        </button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="row mt-5 g-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="col-md-3">
          <div className="stats-card total shadow-sm">
            <FaClipboardList className="icon" />
            <h4>{totalTasks}</h4>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stats-card completed shadow-sm">
            <FaCheckCircle className="icon" />
            <h4>{completedTasks}</h4>
            <p>Completed</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stats-card inprogress shadow-sm">
            <FaHourglassHalf className="icon" />
            <h4>{inProgressTasks}</h4>
            <p>In Progress</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stats-card planned shadow-sm">
            <FaClipboardList className="icon" />
            <h4>{plannedTasks}</h4>
            <p>Planned</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default Dashboard