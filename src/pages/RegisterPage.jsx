import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../Redux/auth/authSlice'
import "./LoginPage.css"; 

const RegisterPage = () => {

  const [form, setForm] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function handleSubmit(event) {
    event.preventDefault()
    const res = await dispatch(registerUser(form))
    if (res) navigate('/')
  }

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg p-4 rounded-4">
        <h3 className="text-center fw-bold mb-4 text-primary">Create Account</h3>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              name="name"
              placeholder="Enter full name"
              onChange={handleChange}
              value={form.name || ""}
              className="form-control form-control-lg custom-input"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={form.email || ""}
              className="form-control form-control-lg custom-input"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={form.password || ""}
              className="form-control form-control-lg custom-input"
            />
          </div>

          <button className="btn btn-primary w-100 btn-lg mt-3 custom-btn">
            Register
          </button>

        </form>

        {/* ✅ Login Link */}
        <div className="text-center mt-3 register-text">
          Already have an account?{" "}
          <a href="/" className="register-link">Login</a>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage
