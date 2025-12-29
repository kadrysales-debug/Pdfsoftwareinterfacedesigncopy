import {
  FileText,
  Upload,
  Clock,
  FolderOpen,
  Sun,
  Cloud,
  CloudRain,
  Zap,
  Coffee,
  Sunrise,
  Moon,
} from "lucide-react";
import { useEffect, useState } from "react";

interface WelcomePageProps {
  userName: string;
  onGetStarted: () => void;
}

export function WelcomePage({
  userName,
  onGetStarted,
}: WelcomePageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [weatherIcon, setWeatherIcon] = useState<any>(Sun);
  const [weatherColor, setWeatherColor] =
    useState("text-amber-500");
  const [greetingEmoji, setGreetingEmoji] = useState("☀️");

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
      setWeatherIcon(Sunrise);
      setWeatherColor("text-orange-500");
      setGreetingEmoji("🌅");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
      setWeatherIcon(Sun);
      setWeatherColor("text-amber-500");
      setGreetingEmoji("☀️");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good Evening");
      setWeatherIcon(Cloud);
      setWeatherColor("text-blue-400");
      setGreetingEmoji("🌤️");
    } else {
      setGreeting("Good Night");
      setWeatherIcon(Moon);
      setWeatherColor("text-indigo-400");
      setGreetingEmoji("🌙");
    }

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const WeatherIcon = weatherIcon;

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
        {/* Main Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-6 mb-6">
            {/* Purple Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-xl relative">
              <FileText className="w-12 h-12 text-white" />
              <div className="absolute -top-2 -right-2 text-3xl">
                {greetingEmoji}
              </div>
            </div>

            {/* Time and Date */}
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-white/50">
              <WeatherIcon
                className={`w-8 h-8 ${weatherColor}`}
              />
              <div className="text-left">
                <div className="text-3xl text-neutral-800 tracking-tight">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-neutral-500">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl mb-2 text-neutral-900">
            {greeting},{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>

          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mt-4 mb-4">
            Your professional PDF workspace is ready. View,
            edit, annotate, and manage all your documents in one
            powerful platform.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
              <Upload className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-neutral-900">
              Upload & View
            </h3>
            <p className="text-sm text-neutral-600">
              Import PDF files and view them with precision
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-neutral-900">
              Edit & Annotate
            </h3>
            <p className="text-sm text-neutral-600">
              Add comments, highlights, and annotations
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg">
              <FolderOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-neutral-900">Organize</h3>
            <p className="text-sm text-neutral-600">
              Manage all your documents efficiently
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="space-y-6">
          <button
            onClick={onGetStarted}
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl shadow-blue-500/30 hover:scale-105 hover:shadow-blue-500/50"
          >
            <span className="flex items-center gap-3 justify-center">
              <Coffee className="w-5 h-5" />
              <span>Get Started with Your Documents</span>
            </span>
          </button>

          {/* Additional Info */}
          <div className="flex items-center justify-center gap-6 text-sm text-neutral-600">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Last login: Today at 9:42 AM</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>5 active projects</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200/50">
              <span className="text-lg">🇸🇦</span>
              <span className="text-green-700">
                Made in Saudi Arabia
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}