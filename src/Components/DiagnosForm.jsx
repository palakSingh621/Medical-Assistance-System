import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/DiagnosForm.css"

function DiagnosForm() {
  const navigate = useNavigate(); // Use navigate hook from react-router-dom
  const [diseaseOrCondition, setDiseaseOrCondition] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Male"); // Default value for gender
  const [previousDiseases, setPreviousDiseases] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      diseaseOrCondition,
      symptoms,
      age,
      gender,
      previousDiseases,
    };

    try {
      const response = await fetch("https://example.com/submit-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      const responseData = await response.json(); // Parse JSON response


      toast.success("Request for Assistance Submitted!", {
        position: toast.POSITION.TOP_CENTER,
      });

      navigate("/results", { state: { responseData } });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again later.");
    }
  };

  return (
    <div className="appointment-form-section">
      <h1 className="legal-siteTitle">
        <Link to="/">
          Health <span className="legal-siteSign">+</span>
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>Medical Diagnosis Assistance</span>
        </h2>

        <form className="form-content" onSubmit={handleFormSubmit}>
          <label>
            Please enter the disease or condition:
            <input
              type="text"
              value={diseaseOrCondition}
              onChange={(e) => setDiseaseOrCondition(e.target.value)}
              required
            />
          </label>

          <br />
          <label>
            Please describe your symptoms:
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            ></textarea>
          </label>

          <br />
          <label>
            Please enter your age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>

          <br />
          <label>
            Please select your gender:
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <br />
          <label>
            Please enter the diseases you have been previously diagnosed with:
            <input
              type="text"
              value={previousDiseases}
              onChange={(e) => setPreviousDiseases(e.target.value)}
            />
          </label>

          <br />
          <button type="submit" className="text-appointment-btn">
            Get Assistance
          </button>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2024 Medical Assistance System. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default DiagnosForm;
