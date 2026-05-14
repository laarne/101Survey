import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { GraduationCap, TrendingUp, Printer, Download, ChevronDown } from "lucide-react";
import { grades, studentInfo } from "../data/mockData";
import { useState } from "react";

export function MyGrade() {
  const [expandedSemester, setExpandedSemester] = useState<string | null>(
    grades[0].semester
  );

  const cumulativeGPA =
    grades.reduce((sum, g) => sum + g.gpa * g.units, 0) /
    grades.reduce((sum, g) => sum + g.units, 0);
  const totalUnits = grades.reduce((sum, g) => sum + g.units, 0);

  const getGradeRemark = (grade: number) => {
    if (grade <= 1.0) return { color: "text-green-600", text: "Excellent" };
    if (grade <= 1.5) return { color: "text-green-600", text: "Very Good" };
    if (grade <= 2.0) return { color: "text-blue-600", text: "Good" };
    if (grade <= 2.5) return { color: "text-blue-600", text: "Satisfactory" };
    if (grade <= 3.0) return { color: "text-amber-600", text: "Passing" };
    return { color: "text-red-600", text: "Failed" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Grades</h1>
          <p className="text-gray-600 dark:text-gray-300">Academic Record - {studentInfo.program}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer size={16} className="mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Student Info */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Student Name</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Student Number</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.studentNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Year Level</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.yearLevel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Semester</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.semester}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GPA Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Cumulative GPA</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {cumulativeGPA.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-green-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Units Earned</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalUnits}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Academic Status</p>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Good Standing
                </Badge>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-purple-600" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades by Semester */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Grades by Semester</h2>
        {grades.map((semesterGrade) => {
          const isExpanded = expandedSemester === semesterGrade.semester;

          return (
            <Card key={semesterGrade.semester}>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() =>
                  setExpandedSemester(isExpanded ? null : semesterGrade.semester)
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{semesterGrade.semester}</CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="secondary">{semesterGrade.units} units</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        GPA: <span className="font-bold text-green-600 dark:text-green-400">{semesterGrade.gpa}</span>
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-gray-400 dark:text-gray-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">
                            Subject Code
                          </th>
                          <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">
                            Subject Title
                          </th>
                          <th className="text-center p-3 font-semibold text-gray-900 dark:text-white">
                            Units
                          </th>
                          <th className="text-center p-3 font-semibold text-gray-900 dark:text-white">
                            Grade
                          </th>
                          <th className="text-center p-3 font-semibold text-gray-900 dark:text-white">
                            Remarks
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {semesterGrade.subjects.map((subject, index) => {
                          const gradeInfo = getGradeRemark(subject.grade);
                          return (
                            <tr
                              key={index}
                              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <td className="p-3">
                                <Badge className="bg-blue-600">{subject.code}</Badge>
                              </td>
                              <td className="p-3 font-medium text-gray-900 dark:text-white">
                                {subject.title}
                              </td>
                              <td className="p-3 text-center text-gray-900 dark:text-white">
                                {subject.units}
                              </td>
                              <td className="p-3 text-center">
                                <span className={`text-lg font-bold ${gradeInfo.color}`}>
                                  {subject.grade.toFixed(2)}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <Badge
                                  className={`${
                                    subject.remarks === "Passed"
                                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                                      : "bg-red-100 text-red-700 hover:bg-red-100"
                                  }`}
                                >
                                  {subject.remarks}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        Semester GPA:
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        {semesterGrade.gpa}
                      </span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Grading System */}
      <Card>
        <CardHeader>
          <CardTitle>Grading System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { grade: "1.00", desc: "Excellent", color: "#10b981" },
              { grade: "1.25-1.50", desc: "Very Good", color: "#10b981" },
              { grade: "1.75-2.00", desc: "Good", color: "#3b82f6" },
              { grade: "2.25-2.50", desc: "Satisfactory", color: "#3b82f6" },
              { grade: "2.75-3.00", desc: "Passing", color: "#f59e0b" },
              { grade: "5.00", desc: "Failed", color: "#ef4444" },
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 text-center"
              >
                <p className="text-xl font-bold mb-1" style={{ color: item.color }}>
                  {item.grade}
                </p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}