import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GraduationCap, CheckCircle2, AlertCircle, FileText, Calendar, Send } from "lucide-react";
import { studentInfo, grades } from "../data/mockData";

export function GraduationApplication() {
  const applicationStatus = "Not Applied"; // Can be: "Not Applied", "Pending", "Approved", "Requirements Incomplete"
  const totalUnits = grades.reduce((sum, g) => sum + g.units, 0);
  const requiredUnits = 120;
  const unitsRemaining = requiredUnits - totalUnits;
  const cumulativeGPA =
    grades.reduce((sum, g) => sum + g.gpa * g.units, 0) / totalUnits;
  const meetsGPARequirement = cumulativeGPA >= 2.0;
  const meetsUnitsRequirement = totalUnits >= requiredUnits;

  const requirements = [
    {
      id: 1,
      title: "Completed Required Units",
      description: `${totalUnits} of ${requiredUnits} units completed`,
      status: meetsUnitsRequirement ? "complete" : "incomplete",
      details: meetsUnitsRequirement
        ? "Congratulations! You have completed all required units."
        : `You need ${unitsRemaining} more units to meet graduation requirements.`,
    },
    {
      id: 2,
      title: "Minimum GPA Requirement",
      description: `Current GPA: ${cumulativeGPA.toFixed(2)} (Minimum: 2.00)`,
      status: meetsGPARequirement ? "complete" : "incomplete",
      details: meetsGPARequirement
        ? "You meet the minimum GPA requirement for graduation."
        : "Your GPA is below the minimum requirement of 2.00.",
    },
    {
      id: 3,
      title: "Complete Clearance",
      description: "All offices must be cleared",
      status: "complete",
      details: "You have been cleared by all university offices.",
    },
    {
      id: 4,
      title: "No Outstanding Balance",
      description: "All fees and charges must be settled",
      status: "incomplete",
      details: "You have an outstanding balance of ₱2,200.00. Please settle before applying.",
    },
    {
      id: 5,
      title: "Complete Exit Survey",
      description: "Required survey for graduating students",
      status: "incomplete",
      details: "Complete the exit survey before submitting your graduation application.",
    },
  ];

  const completedReqs = requirements.filter((r) => r.status === "complete").length;
  const totalReqs = requirements.length;
  const canApply = completedReqs === totalReqs;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Graduation Application
        </h1>
        <p className="text-gray-600">
          Apply for graduation and check your eligibility requirements
        </p>
      </div>

      {/* Student Info */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div>
              <p className="text-sm text-gray-600 mb-1">Year Level</p>
              <p className="font-semibold text-gray-900">{studentInfo.yearLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Status */}
      <Card
        className={
          applicationStatus === "Approved"
            ? "border-green-300 bg-green-50/50"
            : applicationStatus === "Pending"
            ? "border-amber-300 bg-amber-50/50"
            : "border-blue-300 bg-blue-50/50"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap size={20} />
            Application Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Status</p>
              <Badge
                className={
                  applicationStatus === "Approved"
                    ? "bg-green-100 text-green-700 hover:bg-green-100 text-lg px-4 py-1"
                    : applicationStatus === "Pending"
                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100 text-lg px-4 py-1"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-100 text-lg px-4 py-1"
                }
              >
                {applicationStatus}
              </Badge>
            </div>
            {applicationStatus === "Not Applied" && (
              <Button size="lg" disabled={!canApply}>
                <Send size={20} className="mr-2" />
                Apply for Graduation
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requirements Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Requirements Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-gray-900">
                {completedReqs} of {totalReqs} requirements met
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  canApply
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600"
                }`}
                style={{ width: `${(completedReqs / totalReqs) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {requirements.map((req) => (
              <div
                key={req.id}
                className={`p-5 rounded-lg border-2 ${
                  req.status === "complete"
                    ? "bg-green-50 border-green-200"
                    : "bg-amber-50 border-amber-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {req.status === "complete" ? (
                    <CheckCircle2
                      size={24}
                      className="text-green-600 flex-shrink-0 mt-0.5"
                    />
                  ) : (
                    <AlertCircle
                      size={24}
                      className="text-amber-600 flex-shrink-0 mt-0.5"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{req.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{req.description}</p>
                    <p
                      className={`text-sm ${
                        req.status === "complete"
                          ? "text-green-700"
                          : "text-amber-700"
                      }`}
                    >
                      {req.details}
                    </p>
                  </div>
                  <Badge
                    className={
                      req.status === "complete"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }
                  >
                    {req.status === "complete" ? "Complete" : "Incomplete"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Academic Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Units Completed</p>
              <p className="text-3xl font-bold text-blue-600">{totalUnits}</p>
              <p className="text-xs text-gray-600 mt-1">of {requiredUnits} required</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Cumulative GPA</p>
              <p className="text-3xl font-bold text-green-600">
                {cumulativeGPA.toFixed(2)}
              </p>
              <p className="text-xs text-gray-600 mt-1">Minimum: 2.00</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Expected Graduation</p>
              <p className="text-xl font-bold text-purple-600">May 2027</p>
              <p className="text-xs text-gray-600 mt-1">Subject to approval</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Required Documents for Graduation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {[
              "Completely filled-out Graduation Application Form",
              "Recent 2x2 ID photo (2 copies, white background)",
              "Certificate of Clearance from all university offices",
              "Proof of payment for graduation fees",
              "Exit survey completion certificate",
              "Transcript of Records (for verification)",
            ].map((doc, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FileText size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Important Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Important Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Calendar size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">
                  Graduation Application Deadline
                </p>
                <p className="text-sm text-gray-600">March 31, 2027</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <Calendar size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Graduation Ceremony</p>
                <p className="text-sm text-gray-600">May 15, 2027</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      {!canApply && (
        <Card className="border-amber-300 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Requirements Not Met
                </h3>
                <p className="text-sm text-amber-800">
                  You must complete all graduation requirements before submitting your
                  application. Please address the incomplete requirements listed above.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
