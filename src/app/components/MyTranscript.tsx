import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, GraduationCap, Printer, Download, DollarSign } from "lucide-react";
import { grades, studentInfo } from "../data/mockData";

export function MyTranscript() {
  const totalUnits = grades.reduce((sum, g) => sum + g.units, 0);
  const cumulativeGPA =
    grades.reduce((sum, g) => sum + g.gpa * g.units, 0) / totalUnits;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Transcript of Records
          </h1>
          <p className="text-gray-600">
            Official academic transcript and record of grades
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer size={16} className="mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* University Header */}
      <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <GraduationCap size={40} className="text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Caraga State University</h2>
          <p className="text-green-100 mb-1">Ampayon, Butuan City</p>
          <p className="text-green-100">Republic of the Philippines</p>
        </CardContent>
      </Card>

      {/* Student Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">TRANSCRIPT OF RECORDS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Name</label>
              <p className="font-semibold text-gray-900">{studentInfo.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Student Number
              </label>
              <p className="font-semibold text-gray-900">{studentInfo.studentNumber}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Program</label>
              <p className="font-semibold text-gray-900">{studentInfo.program}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-1">Year Level</label>
              <p className="font-semibold text-gray-900">{studentInfo.yearLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Record */}
      <div className="space-y-6">
        {grades.map((semesterGrade, semIndex) => (
          <Card key={semIndex}>
            <CardHeader className="bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{semesterGrade.semester}</CardTitle>
                <Badge variant="secondary">{semesterGrade.units} units</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Subject Code
                      </th>
                      <th className="text-left p-3 font-semibold text-gray-900">
                        Subject Title
                      </th>
                      <th className="text-center p-3 font-semibold text-gray-900">
                        Units
                      </th>
                      <th className="text-center p-3 font-semibold text-gray-900">
                        Grade
                      </th>
                      <th className="text-center p-3 font-semibold text-gray-900">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesterGrade.subjects.map((subject, subIndex) => (
                      <tr
                        key={subIndex}
                        className="border-b border-gray-100"
                      >
                        <td className="p-3 font-medium text-gray-900">
                          {subject.code}
                        </td>
                        <td className="p-3 text-gray-900">{subject.title}</td>
                        <td className="p-3 text-center text-gray-900">
                          {subject.units}
                        </td>
                        <td className="p-3 text-center font-bold text-gray-900">
                          {subject.grade.toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <Badge
                            className={
                              subject.remarks === "Passed"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : "bg-red-100 text-red-700 hover:bg-red-100"
                            }
                          >
                            {subject.remarks}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-blue-50 font-semibold">
                      <td colSpan={2} className="p-3 text-right">
                        Semester Units:
                      </td>
                      <td className="p-3 text-center text-blue-600">
                        {semesterGrade.units}
                      </td>
                      <td colSpan={2} className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-700">GPA:</span>
                          <span className="text-blue-600">{semesterGrade.gpa}</span>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Academic Summary */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle>Academic Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Total Units Earned</p>
              <p className="text-3xl font-bold text-blue-600">{totalUnits}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Cumulative GPA</p>
              <p className="text-3xl font-bold text-green-600">
                {cumulativeGPA.toFixed(2)}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Academic Standing</p>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-base px-4 py-1">
                Good Standing
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Official Transcript */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Request Official Transcript
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            This is an unofficial copy of your transcript. To request an official
            Transcript of Records for employment, scholarship, or transfer purposes,
            please follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 mb-6">
            <li>Visit the Registrar's Office or make an online request</li>
            <li>Fill out the Transcript Request Form</li>
            <li>Pay the required processing fee at the Cashier's Office</li>
            <li>Processing time: 3-5 working days</li>
            <li>Pick up at the Registrar's Office or request delivery</li>
          </ol>
          <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-amber-200 mb-4">
            <DollarSign className="text-amber-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Processing Fee</p>
              <p className="text-sm text-gray-600">
                ₱150.00 per copy (Regular Processing)
              </p>
              <p className="text-sm text-gray-600">
                ₱300.00 per copy (Rush Processing - 1-2 days)
              </p>
            </div>
          </div>
          <Button className="w-full">
            <FileText size={16} className="mr-2" />
            Request Official Transcript
          </Button>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <Card>
        <CardContent className="p-4">
          <p className="text-xs text-gray-600 text-center italic">
            This is a computer-generated document. No signature is required for
            unofficial copies. For official transcripts, please request through the
            Registrar's Office.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
