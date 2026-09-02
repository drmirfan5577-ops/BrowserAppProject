import { useState, useEffect } from "react";

interface ClockState {
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
  date: string;
  day: string;
  hijriDate: string;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getHijriApprox(date: Date): string {
  // Approximate Hijri date calculation
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  const hijriMonths = ["Muharram", "Safar", "Rabi I", "Rabi II", "Jumada I", "Jumada II",
    "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];

  return `${day} ${hijriMonths[month - 1] || ""} ${year} AH`;
}

export function useDigitalClock(): ClockState {
  const [clock, setClock] = useState<ClockState>(() => {
    const now = new Date();
    return buildClock(now);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(buildClock(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return clock;
}

function buildClock(now: Date): ClockState {
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    ampm,
    date: `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    day: DAYS[now.getDay()],
    hijriDate: getHijriApprox(now),
  };
}
