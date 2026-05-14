import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, User, BookOpen, Printer, Download } from "lucide-react";
import { currentSchedule, studentInfo } from "../data/mockData";

export function MyClassSchedule() {
  const totalUnits = currentSchedule.reduce((sum, s) => sum + s.units, 0);

  const scheduleByDay = {
    Monday: currentSchedule.filter((s) => s.time.includes("M/")),
    Tuesday: currentSchedule.filter((s) => s.time.includes("T/") || s.time.includes("/T")),
    Wednesday: currentSchedule.filter((s) => s.time.includes("W")),
    Thursday: currentSchedule.filter((s) => s.time.includes("TH")),
    Friday: currentSchedule.filter((s) => s.time.includes("F")),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Class Schedule</h1>
          <p className="text-gray-600 dark:text-gray-300">{studentInfo.semester}</p>
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

      {/* Student Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Student Name</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Student Number</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.studentNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Program</p>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.program}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentSchedule.length}</p>
              </div>
              <BookOpen className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Units</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUnits}</p>
              </div>
              <Calendar className="text-green-600 dark:text-green-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Year Level</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{studentInfo.yearLevel}</p>
              </div>
              <User className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700 text-sm uppercase tracking-wider">
                  <th className="text-left px-4 py-4 font-semibold text-gray-900 dark:text-white">Subject Code</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-900 dark:text-white">Subject Title</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-900 dark:text-white">Section</th>
                  <th className="text-center px-4 py-4 font-semibold text-gray-900 dark:text-white">Units</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-900 dark:text-white">Schedule</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-900 dark:text-white">Room</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-900 dark:text-white">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {currentSchedule.map((schedule, index) => (
                  <tr key={index} className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow rounded-lg">
                    <td className="px-4 py-4">
                      <Badge className="bg-blue-600 px-3 py-1">{schedule.code}</Badge>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{schedule.title}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{schedule.section}</td>
                    <td className="px-4 py-4 text-center font-bold text-blue-600 dark:text-blue-400">
                      {schedule.units}
                    </td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{schedule.time}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300">{schedule.room}</td>
                    <td className="px-4 py-4 text-gray-600 dark:text-gray-300 italic">{schedule.instructor}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
                  <td colSpan={3} className="p-3 text-right dark:text-white">
                    Total Units:
                  </td>
                  <td className="p-3 text-center text-lg text-blue-600 dark:text-blue-400">{totalUnits}</td>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Weekly View */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule View</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(scheduleByDay).map(([day, classes]) => (
            <div key={day}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Calendar size={18} />
                {day}
                <Badge variant="secondary">{classes.length} class{classes.length !== 1 ? 'es' : ''}</Badge>
              </h3>
              {classes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm ml-7 mb-4">No classes scheduled</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {classes.map((schedule, index) => (
                    <div
                      key={index}
                      className="ml-7 p-6 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-600"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <Badge className="bg-blue-600 mb-2">{schedule.code}</Badge>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{schedule.title}</h4>
                        </div>
                        <Badge variant="outline">{schedule.units} units</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {schedule.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {schedule.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {schedule.instructor}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}