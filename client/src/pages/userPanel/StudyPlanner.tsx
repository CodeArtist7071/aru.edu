

const StudyPlanner = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-10 py-3 sticky top-0 z-50">

        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <h2 className="text-lg font-bold">Odisha Exam Prep</h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center justify-center h-10 px-3 rounded-lg bg-slate-100 dark:bg-slate-800">
            <span className="material-symbols-outlined text-[20px]">
              notifications
            </span>
          </button>

          <button className="flex items-center gap-2 bg-primary text-white px-4 h-10 rounded-lg text-sm font-bold hover:bg-primary/90 transition">
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="hidden sm:inline">New Plan</span>
          </button>

          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="size-10 rounded-full border-2 border-primary/20"
          />
        </div>
      </header>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex flex-1">

        {/* ===== Sidebar (Desktop Only) ===== */}
        <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4">

          <nav className="flex flex-col gap-2">
            {["Dashboard", "Study Planner", "Resources", "Analytics"].map(
              (item, i) => (
                <a
                  key={i}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                    item === "Study Planner"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {item === "Dashboard"
                      ? "dashboard"
                      : item === "Study Planner"
                      ? "calendar_today"
                      : item === "Resources"
                      ? "menu_book"
                      : "analytics"}
                  </span>
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Exam Target Card */}
          <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-xs font-bold text-primary uppercase mb-2">
              Target Exam
            </p>
            <h4 className="text-sm font-bold">OPSC Civil Services</h4>

            <div className="mt-3 flex justify-between text-xs">
              <span>Days to go</span>
              <span className="text-lg font-black text-primary">42</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2">
              <div className="bg-primary h-1.5 rounded-full w-[65%]" />
            </div>
          </div>
        </aside>

        {/* ===== Content ===== */}
        <main className="flex-1 p-4 md:p-8 max-w-[1200px] mx-auto w-full">

          {/* Page Title */}
          <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Study Planner
              </h1>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  event
                </span>
                Monday, October 23, 2023
              </p>
            </div>

            <div className="flex items-center bg-white dark:bg-slate-900 border rounded-lg px-4 py-2 shadow-sm">
              <span className="material-symbols-outlined text-orange-500 mr-2">
                local_fire_department
              </span>
              <span className="text-sm font-bold">12 Day Streak</span>
            </div>
          </div>

          {/* ================= TOP SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

            {/* Weekly Chart */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500">
                    Weekly Study Hours
                  </p>
                  <h3 className="text-2xl font-bold">32.5 hrs</h3>
                </div>
                <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-600 px-2 py-1 rounded font-bold">
                  +12%
                </span>
              </div>

              <div className="flex items-end justify-between h-32 gap-2">
                {[60, 40, 85, 30, 55, 95, 20].map((h, i) => (
                  <div key={i} className="flex flex-col items-center w-full">
                    <div
                      className={`w-full rounded-t-lg ${
                        i === 5 ? "bg-primary" : "bg-primary/20"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      {["M","T","W","T","F","S","S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Timer */}
            <div className="bg-primary text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase">Focus Timer</h3>
                <span className="material-symbols-outlined">timer</span>
              </div>

              <div className="text-center py-6">
                <div className="text-4xl md:text-5xl font-black">
                  25:00
                </div>
                <p className="text-xs opacity-80">Pomodoro Session</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-white text-primary py-2.5 rounded-lg font-bold text-sm">
                  Start
                </button>
                <button className="bg-white/20 px-3 rounded-lg">
                  <span className="material-symbols-outlined">
                    refresh
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= GOALS + PROGRESS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Daily Goals */}
            <section>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    task_alt
                  </span>
                  Daily Goals
                </h2>
                <button className="text-primary text-sm font-bold">
                  Add Task
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Complete OPSC History MCQ", status: "High" },
                  { title: "Read Current Affairs", done: true },
                  { title: "Geography Revision", status: "Medium" },
                ].map((task, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border shadow-sm ${
                      task.done
                        ? "bg-slate-50 dark:bg-slate-800 opacity-75"
                        : "bg-white dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4
                        className={`text-sm font-bold ${
                          task.done && "line-through text-slate-400"
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.status && (
                        <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          {task.status}
                        </span>
                      )}
                      {task.done && (
                        <span className="text-[10px] font-bold bg-slate-200 px-2 py-1 rounded">
                          Done
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus Progress */}
            <section>
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary">
                  donut_large
                </span>
                Syllabus Progress
              </h2>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border shadow-sm space-y-5">
                {[
                  { subject: "General Studies I", percent: 78 },
                  { subject: "CSAT", percent: 45 },
                  { subject: "Odia Language", percent: 92 },
                ].map((sub, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold">{sub.subject}</span>
                      <span className="text-primary font-bold">
                        {sub.percent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${sub.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ================= EXAM CARDS ================= */}
          <div className="mt-12">
            <h2 className="text-lg font-bold mb-4">
              Upcoming Exam Deadlines
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {[
                { name: "OPSC Prelims", days: 42 },
                { name: "OSSC CGL", days: 18 },
                { name: "OJS Mains", days: 65 },
              ].map((exam, i) => (
                <div
                  key={i}
                  className="min-w-[260px] bg-white dark:bg-slate-900 p-5 rounded-xl border shadow-sm"
                >
                  <h4 className="font-bold text-sm mb-2">
                    {exam.name}
                  </h4>
                  <div className="text-3xl font-black">
                    {exam.days}
                  </div>
                  <p className="text-xs text-slate-500 uppercase">
                    Days Left
                  </p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default StudyPlanner;