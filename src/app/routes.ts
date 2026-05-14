import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { MyClassSchedule } from "./components/MyClassSchedule";
import { MyGrade } from "./components/MyGrade";
import { MyTranscript } from "./components/MyTranscript";
import { MyStudentInformation } from "./components/MyStudentInformation";
import { MyBalances } from "./components/MyBalances";
import { MyClearance } from "./components/MyClearance";
import { OnlineEnrollment } from "./components/OnlineEnrollment";
import { OfferedSubject } from "./components/OfferedSubject";
import { MyAppointment } from "./components/MyAppointment";
import { MyEvaluation } from "./components/MyEvaluation";
import { GraduationApplication } from "./components/GraduationApplication";
import { MyAccount } from "./components/MyAccount";
import { Login } from "./components/Login";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "my-class-schedule", Component: MyClassSchedule },
      { path: "my-grade", Component: MyGrade },
      { path: "my-transcript", Component: MyTranscript },
      { path: "my-student-information", Component: MyStudentInformation },
      { path: "my-balances", Component: MyBalances },
      { path: "my-clearance", Component: MyClearance },
      { path: "online-enrollment", Component: OnlineEnrollment },
      { path: "offered-subject", Component: OfferedSubject },
      { path: "my-appointment", Component: MyAppointment },
      { path: "my-evaluation", Component: MyEvaluation },
      { path: "graduation-application", Component: GraduationApplication },
      { path: "my-account", Component: MyAccount },
    ],
  },
]);
