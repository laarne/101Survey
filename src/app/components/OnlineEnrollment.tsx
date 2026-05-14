import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { UserPlus, AlertCircle, CheckCircle2, BookOpen, Info } from "lucide-react";
import { studentInfo, currentSchedule } from "../data/mockData";

export function OnlineEnrollment() {
  const isEnrollmentOpen = false; // Change to true to enable enrollment
  const enrollmentStartDate = "May 15, 2026";
  const totalUnits = currentSchedule.reduce((sum, s) => sum + s.units, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Enrollment</h1>
        <p className="text-gray-600">
          Enroll for the upcoming semester online
        </p>
      </div>

      {/* Enrollment Status Alert */}
      {!isEnrollmentOpen ? (
        <Card className="border-amber-300 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Enrollment Not Yet Open
                </h3>
                <p className="text-sm text-amber-800 mb-2">
                  Online enrollment for the next semester will open on{" "}
                  <span className="font-semibold">{enrollmentStartDate}</span>.
                </p>
                <p className="text-sm text-amber-800">
                  Please check back on this date to begin your enrollment process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-green-300 bg-green-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">
                  Enrollment is Now Open!
                </h3>
                <p className="text-sm text-green-800">
                  You may now proceed with your enrollment for the upcoming semester.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Student Info */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Student Name</p>
              <p className="font-semibold text-gray-900">{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Student Number</p>
              <p className="font-semibold text-gray-900">{studentInfo.studentNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Program</p>
              <p className="font-semibold text-gray-900">{studentInfo.program}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Enrollment (if applicable) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen size={20} />
            Current Enrollment - {studentInfo.semester}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">Enrollment Status</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Enrolled
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Subjects</p>
                  <p className="font-semibold text-gray-900">{currentSchedule.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Units</p>
                  <p className="font-semibold text-gray-900">{totalUnits}</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-900">
                      Subject Code
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-900">
                      Subject Title
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-900">Units</th>
                    <th className="text-left p-3 font-semibold text-gray-900">Section</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSchedule.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="p-3">
                        <Badge className="bg-blue-600">{subject.code}</Badge>
                      </td>
                      <td className="p-3 text-gray-900">{subject.title}</td>
                      <td className="p-3 text-center font-semibold text-gray-900">
                        {subject.units}
                      </td>
                      <td className="p-3 text-gray-600">{subject.section}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan={2} className="p-3 text-right">
                      Total Units:
                    </td>
                    <td className="p-3 text-center text-lg text-blue-600">
                      {totalUnits}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info size={20} />
            Enrollment Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Complete Clearance
                </h4>
                <p className="text-sm text-gray-600">
                  All offices must be cleared before enrollment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Settle All Balances</h4>
                <p className="text-sm text-gray-600">
                  No outstanding balance from previous semesters
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Valid Student Account
                </h4>
                <p className="text-sm text-gray-600">
                  Active and verified student account
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  Complete Previous Semester
                </h4>
                <p className="text-sm text-gray-600">
                  All grades from previous semester must be submitted
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrollment Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Process</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: "Check Requirements",
                description:
                  "Ensure all clearance and balance requirements are met",
              },
              {
                step: 2,
                title: "Browse Offered Subjects",
                description:
                  "View available subjects and check slot availability",
              },
              {
                step: 3,
                title: "Select Subjects",
                description:
                  "Choose subjects according to your curriculum and schedule preference",
              },
              {
                step: 4,
                title: "Review Enrollment",
                description:
                  "Verify your selected subjects and total units",
              },
              {
                step: 5,
                title: "Submit Enrollment",
                description:
                  "Finalize and submit your enrollment form",
              },
              {
                step: 6,
                title: "Print Enrollment Form",
                description:
                  "Download and print your enrollment confirmation",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              disabled={!isEnrollmentOpen}
            >
              <UserPlus size={20} className="mr-2" />
              {isEnrollmentOpen ? "Start Enrollment" : "Enrollment Closed"}
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                View Offered Subjects
              </Button>
              <Button variant="outline" className="w-full">
                Check Requirements
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
