"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";

// ADMIN PASSWORD (change it)
const ADMIN_PASSWORD = "admin123";

// Local storage key
const STORAGE_KEY = "tb_users";

export default function TBChecker() {
  const [answers, setAnswers] = useState({});
  const [risk, setRisk] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  // Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState("");
  const [users, setUsers] = useState([]);

  // Load saved users for admin panel
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setUsers(saved);
  }, []);

  // Questions and weights
  const QUESTIONS = [
    { q: "Do you have a cough lasting more than 3 weeks?", weight: 20 },
    { q: "Do you experience chest pain?", weight: 10 },
    { q: "Do you have fever or night sweats?", weight: 15 },
    { q: "Have you recently lost weight unintentionally?", weight: 15 },
    { q: "Are you exposed to someone diagnosed with TB?", weight: 40 },
  ];

  // Calculate risk score
  const calculateRisk = () => {
    let total = 0;
    QUESTIONS.forEach((q, i) => {
      if (answers[i] === "yes") total += q.weight;
    });
    setRisk(total);
    setShowForm(false);
  };

  // Save patient to admin list
  const saveForDoctor = () => {
    const entry = {
      ...userDetails,
      risk,
      time: new Date().toLocaleString(),
    };

    let all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    all.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

    setUsers(all);
    setSubmitted(true);
  };

  // Admin login
  const tryAdminLogin = () => {
    if (adminPassInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("Wrong password!");
    }
  };

  // Delete entry from admin dashboard
  const deleteEntry = (index) => {
    let all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    all.splice(index, 1); // remove item at index

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    setUsers(all); // update state
  };

  // PDF generator
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Tuberculosis Risk Report", 10, 15);

    doc.setFontSize(12);
    doc.text(`Name: ${userDetails.name}`, 10, 30);
    doc.text(`Phone: ${userDetails.phone}`, 10, 40);
    doc.text(`Risk Score: ${risk}`, 10, 50);
    doc.text(`Assessment Time: ${new Date().toLocaleString()}`, 10, 60);

    doc.text("This assessment is automated and not a medical diagnosis.", 10, 80);

    doc.save("TB_Risk_Report.pdf");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">

      {/* ----------------- ADMIN LOGIN ------------------- */}
      {!isAdmin && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            className="p-2 border rounded w-full"
            value={adminPassInput}
            onChange={(e) => setAdminPassInput(e.target.value)}
          />
          <button
            className="mt-3 bg-black text-white px-4 py-2 rounded"
            onClick={tryAdminLogin}
          >
            Login
          </button>
        </div>
      )}

      {/* ----------------- ADMIN DASHBOARD ------------------- */}
      {isAdmin && (
        <div className="border p-4 rounded bg-gray-100 mb-6">
          <h2 className="text-xl font-bold mb-3">Admin Dashboard</h2>

          {users.length === 0 ? (
            <p>No user requests yet.</p>
          ) : (
            users.map((u, i) => (
              <div key={i} className="p-4 bg-white shadow rounded mb-2">
                <p><b>Name:</b> {u.name}</p>
                <p><b>Phone:</b> {u.phone}</p>
                <p><b>Risk Score:</b> {u.risk}</p>
                <p><b>Time:</b> {u.time}</p>

                <button
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteEntry(i)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ----------------- TB FORM ------------------- */}
      {showForm && (
        <div>
          <h1 className="text-3xl font-bold mb-4">TB Risk Checker</h1>

          {QUESTIONS.map((item, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium">{item.q}</p>
              <div className="flex gap-3 mt-2">
                <button
                  className={`px-4 py-2 rounded ${
                    answers[i] === "yes" ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setAnswers({ ...answers, [i]: "yes" })}
                >
                  Yes
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    answers[i] === "no" ? "bg-red-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setAnswers({ ...answers, [i]: "no" })}
                >
                  No
                </button>
              </div>
            </div>
          ))}

          <button
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
            onClick={calculateRisk}
          >
            Calculate Risk
          </button>
        </div>
      )}

      {/* ----------------- RESULTS ------------------- */}
      {!showForm && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-3">Your Risk Score: {risk}</h2>

          <h3 className="font-bold mb-2">Enter your details</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 rounded w-full mb-2"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 rounded w-full mb-3"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
          />

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={saveForDoctor}
          >
            Contact Doctor
          </button>

          <button
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded block"
            onClick={downloadPDF}
          >
            Download PDF Report
          </button>

          {submitted && (
            <p className="text-green-600 mt-2">
              Your details have been sent to admin.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
