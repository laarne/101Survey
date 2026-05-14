export const studentInfo = {
  studentNumber: "231-02365",
  name: "GO, RANIER BRYLLE L.",
  program: "Bachelor of Science in Computer Science",
  yearLevel: "2nd Year",
  semester: "2nd Semester, A.Y. 2025-2026",
  status: "Regular",
  email: "ranier.go@student.csu.edu.ph",
  contactNumber: "+63 912 345 6789",
  address: "P3A Villa Paraiso, Ampayon, Butuan City, Agusan del Norte",
  dateOfBirth: "March 29, 2004",
  civilStatus: "Single",
  citizenship: "Filipino",
  religion: "Born Again",
  guardian: "Go, Parent Name",
  guardianContact: "+63 917 654 3210",
};

export const currentSchedule = [
  {
    code: "CSC 102",
    title: "DISCRETE STRUCTURES",
    section: "CS3A",
    units: 3,
    time: "M/W 7:30 AM - 9:00 AM",
    room: "CCS Building Room 301",
    instructor: "Dr. Maria Santos",
  },
  {
    code: "MATH 17",
    title: "CALCULUS 1 (DIFFERENTIAL CALCULUS) ",
    section: "CS3A",
    units: 3,
    time: "T/TH 10:30 AM - 12:00 NN",
    room: "CCS Building Room 302",
    instructor: "Prof. Roberto Cruz",
  },
  {
    code: "ITE 17",
    title: "Technopreneurship",
    section: "CS3A",
    units: 3,
    time: "M/W 1:00 PM - 2:30 PM",
    room: "CCS Building Room 303",
    instructor: "Engr. Linda Reyes",
  },
  {
    code: "ITE 101",
    title: "HUMAN-COMPUTER INTERACTION",
    section: "CS3A",
    units: 3,
    time: "T/TH 7:30 AM - 9:00 AM",
    room: "Math Building Room 201",
    instructor: "Prof. Antonio Garcia",
  },
];

export const grades = [
  {
    semester: "1st Semester, A.Y. 2025-2026",
    subjects: [
      { code: "CS 301", title: "Object-Oriented Programming", units: 3, grade: 1.50, remarks: "Passed" },
      { code: "CS 302", title: "Computer Organization", units: 3, grade: 1.75, remarks: "Passed" },
      { code: "MATH 301", title: "Calculus II", units: 3, grade: 2.00, remarks: "Passed" },
      { code: "PHYS 301", title: "Physics for Engineers", units: 3, grade: 2.25, remarks: "Passed" },
      { code: "ENG 301", title: "Communication Skills II", units: 3, grade: 1.50, remarks: "Passed" },
      { code: "PE 2", title: "Physical Education 2", units: 2, grade: 1.25, remarks: "Passed" },
    ],
    gpa: 1.79,
    units: 17,
  },
  {
    semester: "2nd Semester, A.Y. 2024-2025",
    subjects: [
      { code: "CS 201", title: "Data Structures", units: 3, grade: 1.75, remarks: "Passed" },
      { code: "CS 202", title: "Programming Languages", units: 3, grade: 1.50, remarks: "Passed" },
      { code: "MATH 201", title: "Calculus I", units: 3, grade: 2.00, remarks: "Passed" },
      { code: "CHEM 201", title: "General Chemistry", units: 3, grade: 2.25, remarks: "Passed" },
      { code: "FIL 201", title: "Panitikang Panlipunan", units: 3, grade: 1.75, remarks: "Passed" },
      { code: "PE 1", title: "Physical Education 1", units: 2, grade: 1.50, remarks: "Passed" },
    ],
    gpa: 1.82,
    units: 17,
  },
];

export const balances = [
  {
    semester: "2nd Semester, A.Y. 2025-2026",
    items: [
      { description: "Tuition Fee (FREE - State University)", amount: 0.0 },
      { description: "Laboratory Fee", amount: 500.0 },
      { description: "Library Fee", amount: 200.0 },
      { description: "Medical/Dental Fee", amount: 150.0 },
      { description: "Student Activity Fee", amount: 200.0 },
      { description: "Athletic Fee", amount: 150.0 },
      { description: "Internet Fee", amount: 200.0 },
      { description: "Registration Fee", amount: 100.0 },
      { description: "ID Fee", amount: 100.0 },
      { description: "Miscellaneous Fee", amount: 200.0 },
    ],
    totalAssessment: 1800.0,
    payments: [
      { date: "2026-01-15", orNumber: "OR-2026-001234", amount: 1000.0 },
      { date: "2026-02-10", orNumber: "OR-2026-002456", amount: 800.0 },
    ],
    totalPaid: 1800.0,
    balance: 0.0,
  },
];

export const clearanceStatus = [
  { office: "College Library", status: "Cleared", clearedBy: "Ms. Ana Santos", date: "2026-02-10" },
  { office: "University Library", status: "Cleared", clearedBy: "Mr. Jose Reyes", date: "2026-02-12" },
  { office: "College Dean's Office", status: "Cleared", clearedBy: "Dean Maria Garcia", date: "2026-02-13" },
  { office: "Registrar's Office", status: "Pending", clearedBy: "-", date: "-" },
  { office: "Cashier's Office", status: "For Clearance", clearedBy: "-", date: "-" },
  { office: "Student Affairs Office", status: "Cleared", clearedBy: "Dr. Roberto Cruz", date: "2026-02-11" },
  { office: "Guidance Office", status: "Cleared", clearedBy: "Ms. Linda Flores", date: "2026-02-14" },
  { office: "Property Custodian", status: "Cleared", clearedBy: "Mr. Carlos Mendoza", date: "2026-02-10" },
];

export const offeredSubjects = [
  {
    code: "CS 411",
    title: "System Administration and Maintenance",
    section: "CS4A",
    units: 3,
    schedule: "M/W 7:30 AM - 9:00 AM",
    room: "CCS 401",
    slots: "5/40",
    instructor: "Prof. Garcia",
  },
  {
    code: "CS 412",
    title: "Network Security",
    section: "CS4A",
    units: 3,
    schedule: "T/TH 10:30 AM - 12:00 NN",
    room: "CCS 402",
    slots: "12/40",
    instructor: "Dr. Santos",
  },
  {
    code: "CS 413",
    title: "Mobile Application Development",
    section: "CS4A",
    units: 3,
    schedule: "M/W 1:00 PM - 2:30 PM",
    room: "CCS 403",
    slots: "8/40",
    instructor: "Engr. Reyes",
  },
  {
    code: "CS 414",
    title: "Web Technologies",
    section: "CS4A",
    units: 3,
    schedule: "T/TH 1:00 PM - 2:30 PM",
    room: "CCS 404",
    slots: "15/40",
    instructor: "Mr. Cruz",
  },
  {
    code: "MATH 411",
    title: "Numerical Methods",
    section: "CS4A",
    units: 3,
    schedule: "F 9:00 AM - 12:00 NN",
    room: "Math 301",
    slots: "10/40",
    instructor: "Dr. Mendoza",
  },
];

export const appointments = [
  {
    id: 1,
    office: "Registrar's Office",
    purpose: "Request for Transcript of Records",
    date: "2026-02-20",
    time: "10:00 AM",
    status: "Approved",
    queueNumber: "REG-045",
  },
  {
    id: 2,
    office: "Guidance Office",
    purpose: "Academic Counseling",
    date: "2026-02-18",
    time: "2:00 PM",
    status: "Pending",
    queueNumber: "-",
  },
];

export const evaluations = [
  {
    semester: "1st Semester, A.Y. 2025-2026",
    subjects: [
      { code: "CS 301", title: "Object-Oriented Programming", instructor: "Dr. Santos", status: "Completed" },
      { code: "CS 302", title: "Computer Organization", instructor: "Prof. Cruz", status: "Completed" },
      { code: "MATH 301", title: "Calculus II", instructor: "Dr. Garcia", status: "Completed" },
      { code: "PHYS 301", title: "Physics for Engineers", instructor: "Engr. Reyes", status: "Completed" },
      { code: "ENG 301", title: "Communication Skills II", instructor: "Dr. Flores", status: "Completed" },
    ],
  },
];

export const announcements = [
  {
    id: 1,
    title: "Online Enrollment for 1st Semester A.Y. 2026-2027",
    content: "Online enrollment will start on May 15, 2026. Please settle all your balances before enrollment.",
    date: "2026-02-15",
    category: "Enrollment",
    important: true,
  },
  {
    id: 2,
    title: "Submission of Clearance",
    content: "All students are required to submit their clearance before February 28, 2026.",
    date: "2026-02-14",
    category: "Clearance",
    important: true,
  },
  {
    id: 3,
    title: "Teacher Evaluation Period",
    content: "Teacher evaluation is now open until February 25, 2026. Please complete all evaluations.",
    date: "2026-02-10",
    category: "Evaluation",
    important: false,
  },
  {
    id: 4,
    title: "Library Extended Hours",
    content: "The library will be open until 10:00 PM during the finals week.",
    date: "2026-02-12",
    category: "Library",
    important: false,
  },
];