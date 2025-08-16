import React, { useState, useEffect } from "react";

interface TimeUnit {
  value: number;
  label: string;
}

interface CountdownTimerProps {
  hours: number;
  onComplete?: () => void;
  cardClassName?: string;
  numberClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  showLabels?: boolean;
  size?: "small" | "medium" | "large";
  theme?: "default" | "dark" | "minimal";
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  hours,
  onComplete,
  cardClassName = "",
  numberClassName = "",
  labelClassName = "",
  containerClassName = "",
  showLabels = true,
  size = "medium",
  theme = "default",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
  });

  const [isActive, setIsActive] = useState(true);

  // Calculate initial total seconds from hours input
  useEffect(() => {
    const totalSeconds = hours * 60 * 60;
    setTimeLeft({
      days: Math.floor(totalSeconds / (24 * 60 * 60)),
      hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
      minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
      seconds: totalSeconds % 60,
      totalSeconds,
    });
  }, [hours]);

  // Countdown logic
  useEffect(() => {
    if (!isActive || timeLeft.totalSeconds <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTotalSeconds = prev.totalSeconds - 1;

        if (newTotalSeconds <= 0) {
          setIsActive(false);
          onComplete?.();
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalSeconds: 0,
          };
        }

        return {
          days: Math.floor(newTotalSeconds / (24 * 60 * 60)),
          hours: Math.floor((newTotalSeconds % (24 * 60 * 60)) / (60 * 60)),
          minutes: Math.floor((newTotalSeconds % (60 * 60)) / 60),
          seconds: newTotalSeconds % 60,
          totalSeconds: newTotalSeconds,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft.totalSeconds, onComplete]);

  // Determine urgency level for styling
  const getUrgencyLevel = () => {
    const totalHours = timeLeft.totalSeconds / 3600;
    if (totalHours <= 1) return "critical";
    if (totalHours <= 4) return "urgent";
    if (totalHours <= 6) return "warning";
    if (totalHours <= 24) return "caution";
    return "normal";
  };

  const urgencyLevel = getUrgencyLevel();

  // Size configurations
  const sizeConfig = {
    small: {
      card: "w-12 h-12 text-lg",
      container: "gap-2",
      label: "text-xs",
    },
    medium: {
      card: "w-16 h-16 text-2xl",
      container: "gap-4",
      label: "text-sm",
    },
    large: {
      card: "w-24 h-24 text-4xl",
      container: "gap-6",
      label: "text-base",
    },
  };

  // Theme configurations
  const themeConfig = {
    default: {
      normal: "bg-white text-deep-navy shadow-lg",
      caution: "bg-orange-400 text-white shadow-lg",
      warning: "bg-orange-600 text-white shadow-lg",
      urgent: "bg-red-500 text-white shadow-lg animate-pulse",
      critical: "bg-red-700 text-white shadow-lg animate-pulse",
    },
    dark: {
      normal: "bg-gray-800 text-gray-100 border border-gray-600",
      caution: "bg-yellow-700 text-white border border-yellow-500",
      warning: "bg-orange-700 text-white border border-orange-500",
      urgent: "bg-red-700 text-white border border-red-500 animate-pulse",
      critical: "bg-red-800 text-white border border-red-600 animate-pulse",
    },
    minimal: {
      normal: "bg-white text-gray-800 border-2 border-gray-200",
      caution: "bg-amber-50 text-amber-800 border-2 border-amber-200",
      warning: "bg-orange-50 text-orange-800 border-2 border-orange-300",
      urgent: "bg-red-50 text-red-800 border-2 border-red-400 animate-pulse",
      critical: "bg-red-100 text-red-900 border-2 border-red-500 animate-pulse",
    },
  };

  const formatTime = (time: number): string => {
    return time.toString().padStart(2, "0");
  };

  const timeUnits: TimeUnit[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  const baseCardStyle = `
    ${sizeConfig[size].card}
    rounded-md flex flex-col items-center justify-center font-bold
    transition-all duration-300 ease-in-out
    ${themeConfig[theme][urgencyLevel]}
    ${cardClassName}
  `;

  const containerStyle = `
    flex items-center justify-center ${sizeConfig[size].container} ${containerClassName}
  `;

  const labelStyle = `
    ${sizeConfig[size].label} font-medium mt-1 opacity-80 ${labelClassName}
  `;

  const numberStyle = `
    leading-none ${numberClassName}
  `;

  if (timeLeft.totalSeconds <= 0 && !isActive) {
    return (
      <div className={containerStyle}>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            🎉 Time&apos;s Up! 🎉
          </div>
          <div className="text-gray-600">The countdown has completed</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={containerStyle}>
        {timeUnits.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className={baseCardStyle}>
              <div className={numberStyle}>{formatTime(unit.value)}</div>
            </div>
            {showLabels && <div className={labelStyle}>{unit.label}</div>}
          </div>
        ))}
      </div>

      {/* Status indicator */}
      <div className="text-center mt-4">
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            urgencyLevel === "critical"
              ? "bg-red-100 text-red-800"
              : urgencyLevel === "urgent"
              ? "bg-orange-100 text-orange-800"
              : urgencyLevel === "warning"
              ? "bg-yellow-100 text-yellow-800"
              : urgencyLevel === "caution"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {urgencyLevel === "critical"
            ? "⚠️ CRITICAL - Less than 1 hour!"
            : urgencyLevel === "urgent"
            ? "🔥 URGENT - Less than 4 hours!"
            : urgencyLevel === "warning"
            ? "⚡ WARNING - Less than 6 hours!"
            : urgencyLevel === "caution"
            ? "⏰ CAUTION - Less than 24 hours!"
            : "✅ On track"}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
