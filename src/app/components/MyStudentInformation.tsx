import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { User, Mail, Phone, MapPin, Calendar, Heart, Flag, Users, Printer, Download, Edit } from "lucide-react";
import { studentInfo } from "../data/mockData";

export function MyStudentInformation() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Student Information
          </h1>
          <p className="text-gray-600 dark:text-gray-300">View and manage your personal information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit size={16} className="mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Printer size={16} className="mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Student Photo and Basic Info */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {studentInfo.name.split(",")[1]?.trim().charAt(0)}
              {studentInfo.name.split(",")[0]?.trim().charAt(0)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {studentInfo.name}
              </h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                <Badge className="bg-blue-600">{studentInfo.studentNumber}</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {studentInfo.status}
                </Badge>
                <Badge variant="secondary">{studentInfo.yearLevel}</Badge>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{studentInfo.program}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={20} />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Full Name</label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Date of Birth
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.dateOfBirth}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Civil Status
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.civilStatus}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Citizenship</label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.citizenship}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Religion</label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.religion}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={20} />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Mail size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  Email Address
                </label>
                <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Phone size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                  Contact Number
                </label>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {studentInfo.contactNumber}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <MapPin size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">Address</label>
                <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={20} />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Student Number
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.studentNumber}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Program</label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.program}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Year Level</label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.yearLevel}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Current Semester
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.semester}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Enrollment Status
              </label>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                {studentInfo.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={20} />
            Guardian Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Guardian Name
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">{studentInfo.guardian}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">
                Contact Number
              </label>
              <p className="font-semibold text-gray-900 dark:text-white">
                {studentInfo.guardianContact}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Edit size={16} className="mr-2" />
              Update Information
            </Button>
            <Button variant="outline" className="w-full">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Note */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Note:</strong> If you need to update any information, please visit
            the Registrar's Office with valid identification documents. Some information
            can only be changed through official request.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}