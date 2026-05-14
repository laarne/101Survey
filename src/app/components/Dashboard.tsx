import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Calendar,
  GraduationCap,
  DollarSign,
  AlertCircle,
  TrendingUp,
  LogOut,
  Bell,
  Library,
  Award,
  ShieldCheck,
  Search,
  Clock,
  FileText,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Book,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "react-router";
import { studentInfo, currentSchedule, balances, clearanceStatus, announcements, grades } from "../data/mockData";
import campusImg from "../../imports/image.png";
import studentImg from "../../imports/Student.png";

export function Dashboard() {
  const todaySchedule = currentSchedule.slice(0, 3);
  const latestGrades = grades[0];
  const currentBalance = balances[0];
  const clearedCount = clearanceStatus.filter((c) => c.status === "Cleared").length;
  const totalOffices = clearanceStatus.length;
  const urgentAnnouncements = announcements.filter((a) => a.important);

  return (
    <div className="space-y-6">
      {/* Welcome Section with Campus Background */}
      <div 
        className="rounded-xl p-5 sm:p-10 text-white relative overflow-hidden shadow-2xl dark:border-emerald-500/10"
        style={{
          background: `linear-gradient(to right, var(--banner-overlay) 40%, var(--banner-overlay-soft) 70%, transparent 100%), url(${studentImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right 20%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 leading-tight drop-shadow-md">
            Welcome back, {studentInfo.name.split(",")[1]?.trim()}!
          </h1>
          <p className="text-sm sm:text-lg text-green-50 mb-6 font-medium opacity-90">
            {studentInfo.program} • {studentInfo.yearLevel}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30 px-3 py-1">
              {studentInfo.semester}
            </Badge>
            <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 hover:bg-white/30 px-3 py-1">
              Student No: {studentInfo.studentNumber}
            </Badge>
          </div>
        </div>
        
        {/* Decorative elements - Subtle emerald glow instead of white */}
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-emerald-400/10 to-transparent pointer-events-none" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Units</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {currentSchedule.reduce((sum, s) => sum + s.units, 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center border border-green-100 dark:border-green-800">
                <Library className="text-green-700 dark:text-green-400" size={24} strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Current GPA</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{latestGrades.gpa}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center border border-green-100 dark:border-green-800">
                <Award className="text-green-700 dark:text-green-400" size={24} strokeWidth={1.5} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link to="/my-clearance">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Clearance</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {clearedCount}/{totalOffices}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center border border-green-100 dark:border-green-800">
                  <ShieldCheck className="text-green-700 dark:text-green-400" size={24} strokeWidth={1.5} />
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Important Announcements */}
          {urgentAnnouncements.length > 0 && (
            <Card className="border-amber-300 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-400">
                  <AlertCircle size={20} />
                  Important Announcements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {urgentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="p-4 bg-white dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/30"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-amber-100">
                        {announcement.title}
                      </h4>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        {announcement.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-amber-200/70 mb-2">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-amber-200/50">
                      {new Date(announcement.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Today's Schedule */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Today's Schedule
              </CardTitle>
              <Link to="/my-class-schedule">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((schedule, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <Badge className="bg-blue-600 mb-2">{schedule.code}</Badge>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {schedule.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{schedule.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mt-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {schedule.time}
                    </span>
                    <span>{schedule.room}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap size={20} />
                Recent Grades - {latestGrades.semester}
              </CardTitle>
              <Link to="/my-grade">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-green-50/50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-800 dark:text-green-400">Semester GPA</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-900 dark:text-white">
                      {latestGrades.gpa}
                    </span>
                    <TrendingUp className="text-green-600" size={20} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {latestGrades.subjects.slice(0, 5).map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {subject.code}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{subject.title}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          subject.grade <= 1.5
                            ? "text-green-600 dark:text-green-400"
                            : subject.grade <= 2.0
                            ? "text-blue-600 dark:text-blue-400"
                            : subject.grade <= 2.5
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {subject.grade.toFixed(2)}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                      >
                        {subject.remarks}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/my-class-schedule">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar size={16} className="mr-2" />
                  View Schedule
                </Button>
              </Link>
              <Link to="/my-grade">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <GraduationCap size={16} className="mr-2" />
                  Check Grades
                </Button>
              </Link>
              <Link to="/my-balances">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <DollarSign size={16} className="mr-2" />
                  View Balances
                </Button>
              </Link>
              <Link to="/my-clearance">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ClipboardCheck size={16} className="mr-2" />
                  My Clearance
                </Button>
              </Link>
              <Link to="/online-enrollment">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="sm">
                  <BookOpen size={16} className="mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Clearance Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardCheck size={18} />
                Clearance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Cleared</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Offices completed</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {clearedCount}/{totalOffices}
                  </div>
                </div>
                <div className="space-y-2">
                  {clearanceStatus.slice(0, 4).map((office, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {office.status === "Cleared" ? (
                        <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <Clock size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      )}
                      <span className="text-sm text-gray-700 dark:text-gray-300 flex-1 min-w-0 truncate">
                        {office.office}
                      </span>
                    </div>
                  ))}
                </div>
                <Link to="/my-clearance">
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Status
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell size={18} />
                Recent Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.slice(0, 3).map((announcement) => (
                <div
                  key={announcement.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {announcement.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(announcement.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Resources & Support Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle size={20} />
            Resources & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button className="flex items-center gap-3 p-3 bg-white dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/30 rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-900/40 hover:border-gray-300 dark:hover:border-emerald-800 transition-all text-left group">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <Book size={18} className="text-green-700 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">User Guide</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Portal user guide</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/30 rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-900/40 hover:border-gray-300 dark:hover:border-emerald-800 transition-all text-left group">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <BookOpen size={18} className="text-green-700 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Student Handbook</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">CSU handbook</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white dark:bg-emerald-950/20 border border-gray-200 dark:border-emerald-900/30 rounded-xl hover:bg-gray-50 dark:hover:bg-emerald-900/40 hover:border-gray-300 dark:hover:border-emerald-800 transition-all text-left group">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <FileText size={18} className="text-green-700 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Satisfaction Survey</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Share your feedback</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-left group">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <HelpCircle size={18} className="text-slate-600 dark:text-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Technical Support</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Get help</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-left group">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <ClipboardCheck size={18} className="text-slate-600 dark:text-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Exam Feedback</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Proctored exam</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-left group">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                <MessageSquare size={18} className="text-slate-600 dark:text-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Client Survey</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Oct 6, 2016</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}