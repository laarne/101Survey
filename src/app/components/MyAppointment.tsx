import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Send, Calendar, Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { appointments, studentInfo } from "../data/mockData";

export function MyAppointment() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Pending
          </Badge>
        );
      case "Cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 size={20} className="text-green-600" />;
      case "Pending":
        return <Clock size={20} className="text-amber-600" />;
      default:
        return <AlertCircle size={20} className="text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">
            Schedule and manage your appointments with university offices
          </p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Student Info */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Student Name</p>
              <p className="font-semibold text-gray-900">{studentInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Student Number</p>
              <p className="font-semibold text-gray-900">{studentInfo.studentNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Appointments ({appointments.length})
        </h2>
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Send size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No appointments scheduled</p>
              <Button>
                <Plus size={16} className="mr-2" />
                Schedule an Appointment
              </Button>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card
              key={appointment.id}
              className={`${
                appointment.status === "Approved"
                  ? "border-green-200 bg-green-50/30"
                  : appointment.status === "Pending"
                  ? "border-amber-200 bg-amber-50/30"
                  : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getStatusIcon(appointment.status)}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {appointment.office}
                        </h3>
                        <p className="text-gray-700 mb-2">{appointment.purpose}</p>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>
                          {new Date(appointment.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{appointment.time}</span>
                      </div>
                      {appointment.queueNumber !== "-" && (
                        <div className="text-sm">
                          <Badge className="bg-blue-600">
                            Queue: {appointment.queueNumber}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {appointment.status === "Approved" && (
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
                        <p className="text-sm text-green-800">
                          <strong>Your appointment has been confirmed.</strong> Please
                          arrive 10 minutes before your scheduled time. Bring your student
                          ID and any required documents.
                        </p>
                      </div>
                    )}

                    {appointment.status === "Pending" && (
                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-4">
                        <p className="text-sm text-amber-800">
                          <strong>Your appointment is pending approval.</strong> You will
                          receive a notification once it's confirmed.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {appointment.status === "Approved" && (
                        <>
                          <Button size="sm">View Details</Button>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Cancel
                          </Button>
                        </>
                      )}
                      {appointment.status === "Pending" && (
                        <>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Cancel Request
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Available Offices */}
      <Card>
        <CardHeader>
          <CardTitle>Available Offices for Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Registrar's Office",
              "Cashier's Office",
              "Guidance Office",
              "Scholarship Office",
              "Student Affairs Office",
              "Admissions Office",
              "Library",
              "Dean's Office",
            ].map((office, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto py-3"
              >
                <div className="text-left">
                  <p className="font-medium">{office}</p>
                  <p className="text-xs text-gray-500">Click to schedule</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle>Appointment Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Book your appointment at least 1 day in advance</li>
            <li>Arrive 10 minutes before your scheduled time</li>
            <li>Bring your student ID and any required documents</li>
            <li>You can reschedule or cancel up to 4 hours before your appointment</li>
            <li>If you miss your appointment, you'll need to schedule a new one</li>
            <li>Walk-in appointments are subject to availability</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
