import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  User,
  Mail,
  Lock,
  Key,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  Smartphone,
} from "lucide-react";
import { studentInfo } from "../data/mockData";
import { useState } from "react";

export function MyAccount() {
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">
          Manage your account information and security settings
        </p>
      </div>

      {/* Profile Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {studentInfo.name.split(",")[1]?.trim().charAt(0)}
              {studentInfo.name.split(",")[0]?.trim().charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {studentInfo.name}
              </h2>
              <p className="text-gray-700 mb-2">{studentInfo.studentNumber}</p>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active Account
                </Badge>
                <Badge variant="secondary">{studentInfo.yearLevel}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email and Login */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={20} />
            Email & Login Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail size={16} />
              Email Address
            </Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                value={studentInfo.email}
                disabled={!isEditingEmail}
              />
              <Button
                variant="outline"
                onClick={() => setIsEditingEmail(!isEditingEmail)}
              >
                {isEditingEmail ? "Save" : "Edit"}
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Your primary email for receiving university notifications
            </p>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <User size={16} />
              Username
            </Label>
            <Input value={studentInfo.studentNumber} disabled />
            <p className="text-xs text-gray-600 mt-1">
              Your student number is your username
            </p>
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Lock size={16} />
              Password
            </Label>
            <Button variant="outline" className="w-full">
              <Key size={16} className="mr-2" />
              Change Password
            </Button>
            <p className="text-xs text-gray-600 mt-1">
              Last changed: January 10, 2026
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Google Apps Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={20} />
            Google Apps Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  CSU Google Workspace Account
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Email: {studentInfo.email}
                </p>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Your Google Apps account gives you access to Gmail, Drive, Calendar, and
            other Google services with your CSU email address.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Access Gmail
            </Button>
            <Button variant="outline" className="flex-1">
              Access Drive
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield size={20} />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
            </div>
            <Badge variant="secondary">Not Enabled</Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Account Status</p>
                <p className="text-sm text-gray-600">Your account is secure</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Active
            </Badge>
          </div>

          <Button variant="outline" className="w-full">
            <Key size={16} className="mr-2" />
            Enable Two-Factor Authentication
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              title: "Grade Updates",
              description: "Receive notifications when new grades are posted",
              enabled: true,
            },
            {
              title: "Enrollment Reminders",
              description: "Get reminded about enrollment periods and deadlines",
              enabled: true,
            },
            {
              title: "Clearance Updates",
              description: "Notifications about clearance status changes",
              enabled: true,
            },
            {
              title: "Announcements",
              description: "University-wide announcements and news",
              enabled: true,
            },
            {
              title: "Payment Reminders",
              description: "Reminders for outstanding balances and due dates",
              enabled: false,
            },
          ].map((pref, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{pref.title}</p>
                <p className="text-sm text-gray-600">{pref.description}</p>
              </div>
              <Badge
                className={
                  pref.enabled
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                }
              >
                {pref.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Settings size={16} className="mr-2" />
            Manage Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle size={20} />
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle size={16} className="mr-2" />
            User Guide & FAQs
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings size={16} className="mr-2" />
            Technical Support
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Mail size={16} className="mr-2" />
            Contact Support
          </Button>
        </CardContent>
      </Card>

      {/* Deactivate Account */}
      <Card className="border-red-200 bg-red-50/50">
        <CardHeader>
          <CardTitle className="text-red-900">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-800 mb-4">
            Once you deactivate your account, you will lose access to the student portal.
            This action cannot be undone.
          </p>
          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-100">
            Deactivate Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
