import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DollarSign, Printer, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { balances, studentInfo } from "../data/mockData";

export function MyBalances() {
  const currentBalance = balances[0];
  const isFullyPaid = currentBalance.balance === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Account Balances</h1>
          <p className="text-gray-600 dark:text-gray-300">{currentBalance.semester}</p>
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

      {/* Balance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Assessment</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  ₱{currentBalance.totalAssessment.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                <DollarSign className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Total Paid</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                  ₱{currentBalance.totalPaid.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={isFullyPaid ? "border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20" : "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-1">Outstanding Balance</p>
                <p className={`text-xl sm:text-2xl font-bold ${isFullyPaid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  ₱{currentBalance.balance.toLocaleString()}
                </p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
                isFullyPaid ? "bg-green-100 dark:bg-green-900/40" : "bg-red-100 dark:bg-red-900/40"
              }`}>
                {isFullyPaid ? (
                  <CheckCircle2 className="text-green-600 dark:text-green-400" size={20} />
                ) : (
                  <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Free Tuition Notice */}
      <Card className="border-blue-300 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Free Higher Education
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                As a State University, Caraga State University provides <strong>FREE TUITION</strong> to all Filipino students under Republic Act 10931 (Universal Access to Quality Tertiary Education Act).
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Students are only required to pay for miscellaneous fees such as laboratory, library, internet, and other student activity fees.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentBalance.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-gray-900 dark:text-white font-medium">{item.description}</span>
                <span className="text-gray-900 dark:text-white font-semibold">
                  ₱{item.amount.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <span className="text-gray-900 dark:text-white font-bold text-lg">Total Assessment</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">
                ₱{currentBalance.totalAssessment.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {currentBalance.payments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No payments recorded yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">Date</th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white">
                      OR Number
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-900 dark:text-white">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBalance.payments.map((payment, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-3 text-gray-900 dark:text-white">
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{payment.orNumber}</Badge>
                      </td>
                      <td className="p-3 text-right font-semibold text-green-600 dark:text-green-400">
                        ₱{payment.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-green-50 dark:bg-green-900/20 font-semibold">
                    <td colSpan={2} className="p-3 text-right dark:text-white">
                      Total Paid:
                    </td>
                    <td className="p-3 text-right text-lg text-green-600 dark:text-green-400">
                      ₱{currentBalance.totalPaid.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Balance Summary */}
      <Card className={isFullyPaid ? "border-green-300 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20" : "border-red-300 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-700 dark:text-gray-300">Total Assessment:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ₱{currentBalance.totalAssessment.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-700 dark:text-gray-300">Total Paid:</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                - ₱{currentBalance.totalPaid.toLocaleString()}
              </span>
            </div>
            <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Outstanding Balance:
                </span>
                <span className={`text-3xl font-bold ${isFullyPaid ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  ₱{currentBalance.balance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isFullyPaid && (
        <Card className="border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-300 mb-2">Payment Reminder</h3>
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                  You have an outstanding balance of ₱{currentBalance.balance.toLocaleString()}.
                  Please settle your account to avoid any delays in enrollment and access to
                  university services.
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Payment can be made at the Cashier's Office during office hours (8:00 AM -
                  5:00 PM, Monday to Friday).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}