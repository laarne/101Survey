import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Lock, User, GraduationCap, Briefcase, ClipboardCheck } from "lucide-react";
import logoImg from "../../imports/Caraga_State_University.png";
import campusImg from "../../imports/image.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ReviewSetupHub } from "./review/ReviewSetupHub";

export function Login() {
  const [userType, setUserType] = useState("student");
  const [showReviewSetup, setShowReviewSetup] = useState(false);
  const isReviewMode = true; // Review Mode is now active by default for this dedicated site
  const navigate = useNavigate();
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(6, 78, 59, 0.88), rgba(21, 128, 61, 0.75)), url(${campusImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse" />

      <Card className="w-full max-w-[360px] shadow-2xl border-green-100 dark:border-green-900/30 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 relative z-10 rounded-2xl">
        <CardHeader className="space-y-3 pb-2 pt-6">
          <div className="flex justify-center mb-1">
            <div className="w-14 h-14 p-1.5 bg-white rounded-xl shadow-md border border-green-50">
              <ImageWithFallback 
                src={logoImg} 
                alt="CSU Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-xl font-bold text-green-800 dark:text-green-400">MySchool Portal</CardTitle>
            <CardDescription className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
              Caraga State University Student Information System
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pt-2 pb-8">
          <Tabs defaultValue="student" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg h-9">
              <TabsTrigger value="student" className="text-xs rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all py-1">
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                Student
              </TabsTrigger>
              <TabsTrigger value="employee" className="text-xs rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all py-1">
                <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                Employee
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="id" className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 ml-1">Username or ID Number</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <Input 
                  id="id" 
                  placeholder="e.g. 231-02365" 
                  className="pl-9 h-10 text-sm border-gray-200 dark:border-gray-700 focus:ring-green-500 rounded-lg bg-gray-50/50" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <Label htmlFor="pass" className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">Password</Label>
                <button className="text-[10px] text-green-600 hover:underline font-medium">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                <Input 
                  id="pass" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-9 h-10 text-sm border-gray-200 dark:border-gray-700 focus:ring-green-500 rounded-lg bg-gray-50/50" 
                />
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 text-sm rounded-lg shadow-md shadow-green-200 dark:shadow-none transition-all active:scale-[0.98] mt-2"
            onClick={() => navigate("/")}
          >
            Sign In to Portal
          </Button>

          <div className="text-center pt-1">
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              By logging in, you agree to our <button className="text-green-600/70 hover:underline">Privacy Policy</button>
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Footer Branding */}
      <div className="absolute bottom-6 text-center w-full">
        <p className="text-[11px] text-white/60 font-bold tracking-[0.3em] uppercase">
          BUGSAY CSUAN
        </p>
      </div>

      {/* Review Mode Button */}
      {isReviewMode && (
        <button
          onClick={() => setShowReviewSetup(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-green-700 dark:text-green-400 font-bold text-sm rounded-full shadow-2xl border border-green-200 dark:border-green-800 hover:bg-white hover:scale-105 transition-all animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          <ClipboardCheck size={18} />
          Start Peer Review
        </button>
      )}

      {/* Review Setup Dialog */}
      {showReviewSetup && (
        <ReviewSetupHub onClose={() => {
          setShowReviewSetup(false);
          navigate("/");
        }} />
      )}
    </div>
  );
}
