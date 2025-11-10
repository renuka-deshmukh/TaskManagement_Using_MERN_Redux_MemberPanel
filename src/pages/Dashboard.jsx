import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../Redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getTasksOfUser } from '../apis/taskAPI';
import { motion } from "framer-motion";
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import './Dashboard.css';

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Fetch user info
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  // Fetch tasks
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

  // Task Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const plannedTasks = tasks.filter((t) => t.status === "Planned").length;

  // Pie Chart Data
  const pieData = [
    { name: "Planned", value: plannedTasks },
    { name: "In Progress", value: inProgressTasks },
    { name: "Completed", value: completedTasks }
  ];

  const COLORS = ["#6c757d", "#0d6efd", "#198754"]; // grey, blue, green

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

      {/* Pie Chart Section */}
      <motion.div
        className="row mt-5 justify-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="col-md-6">
          <div className="chart-card shadow p-3 rounded-4 bg-white">
            <h5 className="text-center fw-bold mb-3">Task Distribution</h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={60}
                  paddingAngle={4}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Dashboard;
