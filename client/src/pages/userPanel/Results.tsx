import React from "react";

const Results = () => {
  const subjects = [
    { name: "General Studies", percent: 82 },
    { name: "Odia Language", percent: 65 },
    { name: "Quantitative Aptitude", percent: 48 },
    { name: "Logical Reasoning", percent: 74 },
  ];

  const stats = [
    {
      label: "Correct",
      value: "71 Questions",
      score: "+142",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      text: "text-emerald-600",
      icon: "check_circle",
    },
    {
      label: "Incorrect",
      value: "14 Questions",
      score: "-7",
      bg: "bg-rose-50 dark:bg-rose-950/30",
      text: "text-rose-600",
      icon: "cancel",
    },
    {
      label: "Skipped",
      value: "15 Questions",
      score: "0",
      bg: "bg-slate-100 dark:bg-slate-800/50",
      text: "text-slate-400",
      icon: "block",
    },
  ];

  const questionGrid = Array.from({ length: 25 }, (_, i) => {
    if ([3, 8, 14, 18].includes(i)) return "incorrect";
    if ([5, 11, 20].includes(i)) return "skipped";
    return "correct";
  });

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-10 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <h1 className="text-xl font-bold">Odisha Exam Prep</h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              <span className="material-symbols-outlined text-[20px]">
                dashboard
              </span>
              Back to Dashboard
            </button>
            <button className="size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
              <span className="material-symbols-outlined">
                notifications
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-6xl mx-auto w-full px-4 py-8 space-y-10 flex-1">

        {/* Test Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold">
              OPSC Prelims Mock 1
            </h2>
            <p className="text-slate-500 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
              Completed on Oct 24, 2023
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90">
              Review Solutions
            </button>
            <button className="px-6 py-3 bg-white dark:bg-slate-800 border rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
              Take Another Test
            </button>
          </div>
        </div>

        {/* ================= SCORE SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Score Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border flex flex-col md:flex-row items-center gap-8">

            {/* Circular Score */}
            <div className="relative size-40 flex items-center justify-center">
              <svg className="size-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  strokeWidth="12"
                  className="text-slate-100 dark:text-slate-800"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  strokeWidth="12"
                  className="text-primary"
                  stroke="currentColor"
                  fill="transparent"
                  strokeDasharray="440"
                  strokeDashoffset="127.6"
                />
              </svg>

              <div className="absolute text-center">
                <div className="text-4xl font-black">142</div>
                <div className="text-sm text-slate-500">
                  out of 200
                </div>
              </div>
            </div>

            {/* Score Details */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold">
                  Great job!
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  You performed better than 92% of students.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    Accuracy
                  </p>
                  <p className="text-xl font-bold text-primary">
                    71%
                  </p>
                </div>
                <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    Time Taken
                  </p>
                  <p className="text-xl font-bold text-primary">
                    1h 45m
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            {stats.map((item, i) => (
              <div
                key={i}
                className={`${item.bg} border p-5 rounded-2xl flex justify-between items-center`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-white/50 flex items-center justify-center">
                    <span className={`material-symbols-outlined ${item.text}`}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-sm text-slate-500">
                      {item.value}
                    </p>
                  </div>
                </div>
                <span className={`text-2xl font-black ${item.text}`}>
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Subject Accuracy */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                bar_chart
              </span>
              Subject-wise Accuracy
            </h3>

            <div className="space-y-6">
              {subjects.map((sub, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{sub.name}</span>
                    <span className="text-primary font-bold">
                      {sub.percent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full mt-2">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{ width: `${sub.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                psychology
              </span>
              AI Improvement Insights
            </h3>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
              <p className="font-bold">Focus on Ancient History</p>
              <p className="text-sm text-slate-600 mt-1">
                Revise Maurya Dynasty topics.
              </p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border rounded-xl">
              <p className="font-bold">Time Efficiency</p>
              <p className="text-sm text-slate-600 mt-1">
                Reduce time spent on Quantitative Aptitude.
              </p>
            </div>
          </div>
        </div>

        {/* ================= QUESTION GRID ================= */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-bold mb-6">
            Question-wise Breakdown
          </h3>

          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 gap-2">
            {questionGrid.map((status, i) => (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer hover:scale-110 transition-transform
                ${
                  status === "correct"
                    ? "bg-emerald-500 text-white"
                    : status === "incorrect"
                    ? "bg-rose-500 text-white"
                    : "bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* ================= BANNER ================= */}
        <div className="relative h-48 rounded-2xl overflow-hidden bg-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/80 to-transparent flex flex-col justify-center px-8 z-10">
            <h3 className="text-white text-2xl font-bold">
              Ready for the next challenge?
            </h3>
            <p className="text-slate-200 mt-2 max-w-md">
              AI recommends Indian Polity Masterclass.
            </p>
            <button className="mt-4 w-fit px-6 py-2 bg-white text-primary font-bold rounded-xl hover:bg-slate-100">
              View Recommended Course
            </button>
          </div>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white dark:bg-slate-900 border-t px-6 py-6 text-sm text-slate-500 text-center">
        © 2023 Odisha Exam Prep. All rights reserved.
      </footer>
    </div>
  );
};

export default Results;