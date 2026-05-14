import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ClipboardCheck, CheckCircle2, Clock, AlertCircle, Printer, Download } from "lucide-react";
import { clearanceStatus, studentInfo } from "../data/mockData";

export function MyClearance() {
  const clearedCount = clearanceStatus.filter((c) => c.status === "Cleared").length;
  const pendingCount = clearanceStatus.filter((c) => c.status === "Pending").length;
  const forClearanceCount = clearanceStatus.filter((c) => c.status === "For Clearance").length;
  const totalOffices = clearanceStatus.length;
  const isFullyCleared = clearedCount === totalOffices;
  const completionPercentage = Math.round((clearedCount / totalOffices) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Cleared":
        return <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />;
      case "Pending":
        return <Clock size={20} className="text-amber-600 dark:text-amber-400" />;
      default:
        return <AlertCircle size={20} className="text-red-600 dark:text-red-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Cleared":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Cleared
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            For Clearance
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Clearance</h1>
          <p className="text-gray-600 dark:text-gray-300">{studentInfo.semester}</p>
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

      {/* Clearance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className={isFullyCleared ? "border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20" : ""}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Cleared</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{clearedCount}</p>
              </div>
              <CheckCircle2 className="text-green-600 dark:text-green-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Pending</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</p>
              </div>
              <Clock className="text-amber-600 dark:text-amber-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">For Clearance</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{forClearanceCount}</p>
              </div>
              <AlertCircle className="text-red-600 dark:text-red-400" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Completion</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{completionPercentage}%</p>
              </div>
              <ClipboardCheck className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Clearance Progress</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {clearedCount} of {totalOffices} offices cleared
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Status Alert */}
      {!isFullyCleared && (
        <Card className="border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">
                  Clearance Incomplete
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  You still have {totalOffices - clearedCount} office(s) to clear. Please
                  visit the offices marked as "Pending" or "For Clearance" to complete your
                  clearance process. Complete clearance is required before enrollment for
                  the next semester.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isFullyCleared && (
        <Card className="border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  Clearance Complete!
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Congratulations! You have completed all clearance requirements. You may
                  now proceed with enrollment for the next semester.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clearance Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clearance Status by Office</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Office</th>
                  <th className="text-center p-3 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">
                    Cleared By
                  </th>
                  <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                {clearanceStatus.map((office, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(office.status)}
                        <span className="font-medium text-gray-900 dark:text-white">{office.office}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">{getStatusBadge(office.status)}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">{office.clearedBy}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-300">
                      {office.date !== "-"
                        ? new Date(office.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Clearance Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>Visit each office listed above to process your clearance</li>
            <li>
              Ensure all requirements (returned books, settled fees, etc.) are completed
            </li>
            <li>Office personnel will update your clearance status in the system</li>
            <li>
              Check this page regularly to monitor your clearance progress
            </li>
            <li>
              Complete all clearances before the deadline to avoid enrollment delays
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}