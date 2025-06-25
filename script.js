
let studentData = {};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      if (user === data.username && pass === data.password) {
        studentData = data;
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("portalPage").style.display = "block";
        document.getElementById("studentName").innerText = data.personal.name;
        showSection("info");
      } else {
        document.getElementById("loginError").innerText = "Invalid credentials";
      }
    });
}

function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");

  if (section === "info") {
    const p = studentData.personal;
    document.getElementById("infoSection").innerHTML = `
      <h2>Personal Info</h2>
      <p>Name: ${p.name}</p>
      <p>ID: ${p.id}</p>
      <p>Department: ${p.department}</p>
      <p>Email: ${p.email}</p>
    `;
    document.getElementById("infoSection").style.display = "block";

  } else if (section === "attendance") {
    document.getElementById("attendanceSection").style.display = "block";
    loadAttendancePDF();
  } else if (section === "result") {
    document.getElementById("resultSection").style.display = "block";
    loadResultPDF();
  }
}

function maintenancePage() {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById("maintenanceSection").style.display = "block";
}

function expireSession() {
  document.getElementById("portalPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("loginError").innerText = "Session has expired. Please log in again.";
}

function loadResultPDF() {
  const sem = document.getElementById("semesterSelect").value;
  const frame = document.getElementById("pdfFrame");
  const error = document.getElementById("pdfError");

  const urls = {
    sem1: "sem1_result.pdf",
    sem2: "sem2_result.pdf"
  };

  frame.onerror = () => {
    frame.style.display = "none";
    error.style.display = "block";
  };

  frame.style.display = "block";
  error.style.display = "none";
  frame.src = urls[sem];
}

function printPDF() {
  const frame = document.getElementById("pdfFrame");
  if (frame && frame.contentWindow) frame.contentWindow.print();
}

function loadAttendancePDF() {
  const sem = document.getElementById("attendanceSemester").value;
  const frame = document.getElementById("attendanceFrame");
  const error = document.getElementById("attendanceError");

  const urls = {
    sem1: "sem1_attendance.pdf",
    sem2: "sem2_attendance.pdf"
  };

  frame.onerror = () => {
    frame.style.display = "none";
    error.style.display = "block";
  };

  frame.style.display = "block";
  error.style.display = "none";
  frame.src = urls[sem];
}

function printAttendance() {
  const frame = document.getElementById("attendanceFrame");
  if (frame && frame.contentWindow) frame.contentWindow.print();
}
dir 
