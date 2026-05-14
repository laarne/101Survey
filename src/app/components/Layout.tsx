import { Link, Outlet, useLocation } from "react-router";
import { useReview } from "../contexts/ReviewContext";
import { ReviewHUD } from "./review/ReviewHUD";
import { HeuristicCard } from "./review/heuristic/HeuristicCard";
import { TaskCard } from "./review/usability/TaskCard";
import { SUSForm } from "./review/usability/SUSForm";
import { QualitativeForm } from "./review/usability/QualitativeForm";
import { AccessibilityFlow } from "./review/accessibility/AccessibilityFlow";
import { ReviewSummary } from "./review/ReviewSummary";
import { ReviewSetupHub } from "./review/ReviewSetupHub";
import {
  Home,
  Calendar,
  GraduationCap,
  FileText,
  User,
  DollarSign,
  ClipboardCheck,
  BookOpen,
  UserPlus,
  ClipboardList,
  Send,
  Menu,
  X,
  Bell,
  LogOut,
  Settings,
  HelpCircle,
  Book,
  Moon,
  Sun,
  ChevronLeft,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { studentInfo } from "../data/mockData";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useTheme } from "../contexts/ThemeContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoImg from "../../imports/Caraga_State_University.png";
import campusImg from "../../imports/image.png";
import profileImg from "../../imports/profile.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home, category: "main" },
  { path: "/my-class-schedule", label: "My Class Schedule", icon: Calendar, category: "academic" },
  { path: "/my-grade", label: "My Grade", icon: GraduationCap, category: "academic" },
  { path: "/my-transcript", label: "My Transcript", icon: FileText, category: "academic" },
  { path: "/my-evaluation", label: "My Evaluation", icon: ClipboardList, category: "academic" },
  { path: "/offered-subject", label: "Offered Subject", icon: BookOpen, category: "enrollment" },
  { path: "/online-enrollment", label: "Online Enrollment", icon: UserPlus, category: "enrollment" },
  { path: "/my-student-information", label: "My Student Information", icon: User, category: "student" },
  { path: "/my-balances", label: "My Balances", icon: DollarSign, category: "student" },
  { path: "/my-clearance", label: "My Clearance", icon: ClipboardCheck, category: "student" },
  { path: "/my-appointment", label: "My Appointment", icon: Send, category: "student" },
  { path: "/graduation-application", label: "My Graduation Application", icon: GraduationCap, category: "applications" },
];

const categories = [
  { id: "main", label: "Main" },
  { id: "academic", label: "Academic Services" },
  { id: "enrollment", label: "Enrollment" },
  { id: "student", label: "Student Services" },
  { id: "applications", label: "Applications" },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showReviewSetup, setShowReviewSetup] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { theme, toggleTheme } = useTheme();
  const { state: reviewState, recordClick, recordPageChange } = useReview();

  // Track clicks for review mode (Only for Usability Evaluation)
  useEffect(() => {
    if (reviewState.phase !== "evaluating" || reviewState.evaluationType !== "usability") return;
    const handler = () => recordClick();
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [reviewState.phase, reviewState.evaluationType, recordClick]);

  // Track page changes for review mode
  useEffect(() => {
    if (reviewState.phase !== "evaluating") return;
    const pageName = location.pathname === "/" ? "Dashboard" : location.pathname.replace("/", "").replace(/-/g, " ");
    recordPageChange(location.pathname, pageName);
  }, [location.pathname, reviewState.phase, recordPageChange]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Offline Alert (Fixes Heuristic #9) */}
      {isOffline && (
        <div className="bg-red-600 text-white text-center py-2 text-sm font-bold sticky top-0 z-50 animate-pulse">
          You are currently offline. Some features may be unavailable.
        </div>
      )}

      {/* Header */}
      <header
        className="relative border-b border-green-800 sticky top-0 z-40 shadow-lg overflow-hidden"
        style={{
          background: `linear-gradient(to right, var(--banner-overlay), var(--banner-overlay-soft)), url(${campusImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-green-600 rounded-lg text-white flex-shrink-0"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Back Button (Fixes Heuristic #3) */}
            {location.pathname !== "/" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-green-600 px-2 flex items-center gap-1 group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}

            <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 hover:opacity-80 transition-opacity">
              <ImageWithFallback
                src={logoImg}
                alt="Caraga State University Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 object-contain"
              />
              <div className="min-w-0">
                <h1 className="font-bold text-white text-sm sm:text-lg truncate">MySchool</h1>
                <p className="text-xs text-green-100 hidden sm:block">Caraga State University</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-white hover:bg-green-600 p-2"
            >
              {theme === "dark" ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
            </Button>

            <Button variant="ghost" size="sm" className="relative text-white hover:bg-green-600 p-2">
              <Bell size={18} className="sm:w-5 sm:h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-green-600 p-2 sm:px-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden mr-2 border border-white/20">
                    <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <span className="hidden sm:inline text-sm">{studentInfo.name.split(",")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/my-account">
                    <Settings size={16} className="mr-2" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings size={16} className="mr-2" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Book size={16} className="mr-2" />
                  User Guide
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle size={16} className="mr-2" />
                  Technical Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <LogOut size={16} className="mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will need to enter your credentials again to access your student portal.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => window.location.href = "/login"}
                      >
                        Log out
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`
          fixed lg:sticky top-[65px] left-0 h-[calc(100vh-65px)] w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border
          transition-transform duration-300 ease-in-out z-30 overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-green-500 shadow-md">
                <img src={profileImg} alt="Student Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                  {studentInfo.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{studentInfo.studentNumber}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                {studentInfo.yearLevel}
              </Badge>
              <Badge className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-100 text-xs">
                {studentInfo.status}
              </Badge>
            </div>
          </div>

          <nav className="p-3">
            {categories.map((category) => {
              const categoryItems = navItems.filter((item) => item.category === category.id);
              if (categoryItems.length === 0) return null;

              return (
                <div key={category.id} className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">
                    {category.label}
                  </h3>
                  <div className="space-y-1">
                    {categoryItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm
                            ${isActive
                              ? "bg-green-600 dark:bg-green-700 text-white"
                              : "text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700"
                            }
                          `}
                        >
                          <Icon size={18} />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden top-[65px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Review Mode Components */}
      <ReviewHUD />
      <HeuristicCard />
      <TaskCard />
      <SUSForm />
      <QualitativeForm />
      <AccessibilityFlow />
      <ReviewSummary />

      {/* Floating Start Button (Visible if idle) */}
      {reviewState.phase === "idle" && (
        <button
          onClick={() => setShowReviewSetup(true)}
          className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-bold text-sm rounded-full shadow-2xl hover:bg-emerald-500 hover:scale-105 transition-all animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <ClipboardCheck size={18} />
          Start Peer Review
        </button>
      )}

      {/* Review Setup Dialog */}
      {showReviewSetup && (
        <ReviewSetupHub onClose={() => setShowReviewSetup(false)} />
      )}
    </div>
  );
}
