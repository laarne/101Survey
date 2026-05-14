import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ClipboardList, CheckCircle2, AlertCircle, Star } from "lucide-react";
import { evaluations, studentInfo } from "../data/mockData";

export function MyEvaluation() {
  const completedEvaluations = evaluations[0].subjects.filter(
    (s) => s.status === "Completed"
  ).length;
  const totalEvaluations = evaluations[0].subjects.length;
  const completionPercentage = Math.round(
    (completedEvaluations / totalEvaluations) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Teacher Evaluation
        </h1>
        <p className="text-gray-600">
          Evaluate your teachers and help improve the quality of education
        </p>
      </div>

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
              <p className="text-sm text-gray-600 mb-1">Year Level</p>
              <p className="font-semibold text-gray-900">{studentInfo.yearLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Evaluation Progress
            </span>
            <span className="text-sm font-bold text-gray-900">
              {completedEvaluations} of {totalEvaluations} completed
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Complete all evaluations to view your grades for the semester
          </p>
        </CardContent>
      </Card>

      {/* Alert */}
      {completionPercentage < 100 ? (
        <Card className="border-amber-300 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 mb-2">
                  Evaluation Required
                </h3>
                <p className="text-sm text-amber-800">
                  You must complete all teacher evaluations before you can view your
                  final grades or enroll for the next semester. Please complete the
                  remaining evaluations as soon as possible.
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
                  All Evaluations Complete!
                </h3>
                <p className="text-sm text-green-800">
                  Thank you for completing all teacher evaluations. Your feedback helps
                  improve the quality of education at our university.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Evaluation List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {evaluations[0].semester}
        </h2>
        {evaluations[0].subjects.map((subject, index) => (
          <Card
            key={index}
            className={
              subject.status === "Completed"
                ? "border-green-200 bg-green-50/30"
                : "border-blue-200 bg-blue-50/30"
            }
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {subject.status === "Completed" ? (
                    <CheckCircle2 size={20} className="text-green-600" />
                  ) : (
                    <ClipboardList size={20} className="text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-600">{subject.code}</Badge>
                        {subject.status === "Completed" && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {subject.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Instructor: {subject.instructor}
                      </p>
                    </div>
                  </div>

                  {subject.status === "Completed" ? (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star size={16} className="text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Evaluation Submitted
                        </span>
                      </div>
                      <p className="text-sm text-green-700">
                        Thank you for your feedback on this course!
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                      <p className="text-sm text-blue-800">
                        Please complete your evaluation for this course. Your honest
                        feedback helps maintain high teaching standards.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {subject.status === "Completed" ? (
                      <Button size="sm" variant="outline" disabled>
                        Evaluation Completed
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <ClipboardList size={16} className="mr-2" />
                        Start Evaluation
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Evaluation Criteria */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Your evaluation will be based on the following criteria:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                Teaching Effectiveness - Subject knowledge, clarity of explanation,
                teaching methods
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                Course Organization - Clear syllabus, organized lessons, timely feedback
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                Student Interaction - Approachability, communication, responsiveness
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                Assessment - Fair grading, appropriate difficulty, timely return of work
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Overall Learning Experience - Course value, would recommend</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle>Evaluation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>All evaluations are anonymous and confidential</li>
            <li>Be honest and constructive in your feedback</li>
            <li>Consider the entire semester when evaluating</li>
            <li>Focus on teaching quality, not personal preferences</li>
            <li>Once submitted, evaluations cannot be changed</li>
            <li>
              Complete all evaluations to unlock access to your grades and enrollment
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
