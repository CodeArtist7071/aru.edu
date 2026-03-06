import { Bell, Download, History, Share, TrendingUp } from 'lucide-react';
import React from 'react';

const PerformanceAnalytics = () => {
  const MaterialIcon = ({ name, className = "material-symbols-outlined", size = "20px" }) => (
    <span className={`${className} font-normal leading-none`} style={{ fontSize: size }}>
      {name}
    </span>
  );

  const stats = [
    {
      label: 'Total Score',
      value: '164 / 200',
      trend: '+12 pts',
      trendColor: 'text-green-600',
      icon: 'military_tech',
      iconColor: 'text-[#1a57db]'
    },
    {
      label: 'Accuracy',
      value: '82%',
      trend: '+2.4%',
      trendColor: 'text-green-600',
      icon: 'target',
      iconColor: 'text-orange-500'
    },
    {
      label: 'Global Rank',
      value: '#452',
      subtitle: 'Top 3.6% of 12,403',
      trendColor: 'text-blue-500',
      icon: 'public',
      iconColor: 'text-blue-500'
    },
    {
      label: 'Time Taken',
      value: '142 min',
      subtitle: 'Avg: 158 min',
      trendColor: 'text-purple-500',
      icon: 'timer',
      iconColor: 'text-purple-500'
    }
  ];

  const subjectBreakdown = [
    {
      subject: 'Physics',
      questions: 60,
      score: '48 / 60',
      accuracy: 80,
      time: '1.2 min/q',
      color: 'blue',
      icon: 'biotech'
    },
    {
      subject: 'Chemistry',
      questions: 60,
      score: '54 / 60',
      accuracy: 90,
      time: '0.8 min/q',
      color: 'orange',
      icon: 'science'
    },
    {
      subject: 'Mathematics',
      questions: 80,
      score: '62 / 80',
      accuracy: 77,
      time: '1.8 min/q',
      color: 'emerald',
      icon: 'calculate'
    }
  ];

  const strongChapters = [
    { name: 'Stoichiometry', subject: 'Chemistry', accuracy: '100%' },
    { name: 'Optics', subject: 'Physics', accuracy: '94%' }
  ];

  const weakChapters = [
    { name: 'Thermodynamics', subject: 'Physics', accuracy: '35%' },
    { name: 'Integration', subject: 'Mathematics', accuracy: '42%' }
  ];

  const aiInsights = [
    {
      type: 'Focus Area',
      color: 'text-[#1a57db]',
      title: 'Thermodynamics Concepts',
      desc: 'Accuracy is 40% lower than average in this chapter.'
    },
    {
      type: 'Action Required',
      color: 'text-green-400',
      title: 'Speed up Calc-based Physics',
      desc: 'Avg time per correct answer: 145s (Target: 90s).'
    },
    {
      type: 'Next Recommended',
      color: 'text-blue-400',
      title: 'Organic Chemistry Quiz #4',
      desc: 'Strengthen your base in Carbonyl compounds.'
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Navigation Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 md:px-20 py-4 sticky top-0 z-50 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4 text-[#1a57db]">
          <div className="size-8 flex items-center justify-center bg-[#1a57db]/10 rounded-lg">
            <MaterialIcon name="analytics" className="text-[#1a57db]" />
          </div>
          <h2 className="text-lg font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
            EduMetrics Pro
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 text-sm font-bold gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200">
            <Share size="20px" />
            <span className="hidden sm:inline"></span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 text-sm font-bold gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200">
            <Download size="20px" />
            <span className="hidden sm:inline">Report</span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 bg-[#1a57db] text-white px-6 text-sm font-bold gap-2 shadow-lg hover:bg-[#1a57db]/90 hover:shadow-xl transition-all duration-200">
            <History size="20px" />
            <span>Retake Test</span>
          </button>
        </div>
      </header>

      <main className="flex flex-1 justify-center py-12 px-4 md:px-10">
        <div className="flex flex-col max-w-[1200px] flex-1 gap-12">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/80 dark:bg-slate-900/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-3">
              <span className="text-[#1a57db] font-bold text-sm uppercase tracking-wider">Attempt #3 Completed</span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
                JEE Advanced Mock - 08
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Great effort! You've improved by <span className="text-green-600 font-bold">5.4%</span> since your last attempt.
              </p>
            </div>
            <button className="px-8 py-4 bg-[#1a57db] text-white rounded-2xl font-bold shadow-2xl shadow-[#1a57db]/25 hover:bg-[#1a57db]/90 hover:scale-105 transition-all duration-300">
              Review Solutions
            </button>
          </div>

          {/* Score Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-3xl p-8 bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                  <MaterialIcon name={stat.icon} className={stat.iconColor} />
                </div>
                <p className={`text-4xl font-black text-slate-900 dark:text-slate-100 ${stat.value.includes('/') ? 'leading-tight' : ''}`}>
                  {stat.value}
                </p>
                {stat.subtitle ? (
                  <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{stat.subtitle}</p>
                ) : (
                  <div className={`flex items-center gap-1 ${stat.trendColor} text-sm font-bold`}>
                    <TrendingUp color='white' size={20} />
                    <span>{stat.trend}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Middle Section: Chart & AI Suggestions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Question Distribution Chart */}
            <div className="lg:col-span-2 flex flex-col gap-8 p-10 bg-white/70 dark:bg-slate-900/70 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">Question Distribution</h3>
                <span className="text-slate-500 dark:text-slate-400 text-lg font-semibold">Total 200 Questions</span>
              </div>
              <div className="flex flex-col gap-8">
                <div className="h-12 w-full flex rounded-3xl overflow-hidden bg-slate-100/50 dark:bg-slate-800/50 shadow-inner border border-slate-200/50 dark:border-slate-700/50">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-full w-[75%] shadow-lg" title="Correct: 150" />
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-full w-[15%] shadow-lg" title="Incorrect: 30" />
                  <div className="bg-gradient-to-r from-slate-400 to-slate-500 h-full w-[10%] shadow-lg" title="Unattempted: 20" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-green-50/50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50">
                    <div className="size-4 rounded-full bg-green-500 shadow-lg" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 dark:text-slate-100">150</span>
                      <span className="text-xs uppercase font-bold text-green-600 tracking-wider">Correct</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50">
                    <div className="size-4 rounded-full bg-red-500 shadow-lg" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 dark:text-slate-100">30</span>
                      <span className="text-xs uppercase font-bold text-red-600 tracking-wider">Incorrect</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <div className="size-4 rounded-full bg-slate-400 shadow-lg" />
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-slate-900 dark:text-slate-100">20</span>
                      <span className="text-xs uppercase font-bold text-slate-600 tracking-wider">Skipped</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-[#1a57db]/10 rounded-3xl border border-[#1a57db]/20 shadow-lg">
                  <div className="flex items-start gap-4">
                    <Bell className="text-[#1a57db] mt-1" size="24px" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                        <strong>Pro Tip:</strong> You spent 42% of your total time on just 15 skipped questions. Better time management on difficult problems could increase your score by up to 20 points.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="flex flex-col gap-6 p-10 bg-gradient-to-br from-slate-900/95 to-slate-800/95 text-white rounded-3xl border border-slate-800/50 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <MaterialIcon name="auto_awesome" className="text-[#1a57db]" size="28px" />
                <h3 className="text-xl font-black">AI Improvement Plan</h3>
              </div>
              <div className="flex flex-col gap-4">
                {aiInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 p-5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                  >
                    <span className={`${insight.color} text-xs font-bold uppercase tracking-widest`}>{insight.type}</span>
                    <p className="text-lg font-bold">{insight.title}</p>
                    <p className="text-sm text-slate-300">{insight.desc}</p>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-[#1a57db] rounded-2xl font-bold text-lg shadow-2xl shadow-[#1a57db]/30 hover:bg-[#1a57db]/90 hover:shadow-3xl hover:scale-105 transition-all duration-300">
                Start Recommended Drill
              </button>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Subject-wise Breakdown</h2>
            <div className="overflow-x-auto rounded-3xl border border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 shadow-2xl backdrop-blur-md">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 dark:bg-slate-800/70 border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
                  <tr>
                    {['Subject', 'Questions', 'Score', 'Accuracy', 'Avg Time', 'Action'].map((header) => (
                      <th
                        key={header}
                        className="px-8 py-6 text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider text-center border-r last:border-r-0 border-slate-100 dark:border-slate-800"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
                  {subjectBreakdown.map((subject, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-4">
                          <div className={`size-12 rounded-2xl flex items-center justify-center shadow-lg ${
                            `bg-${subject.color}-100 dark:bg-${subject.color}-900/30 text-${subject.color}-600`
                          }`}>
                            <MaterialIcon name={subject.icon} />
                          </div>
                          <span className="font-black text-xl text-slate-900 dark:text-slate-100">{subject.subject}</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center text-lg text-slate-700 dark:text-slate-300 font-semibold">{subject.questions}</td>
                      <td className="px-8 py-8 text-center text-lg font-bold text-slate-900 dark:text-slate-100">{subject.score}</td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-3 justify-center">
                          <div className={`w-28 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner`}>
                            <div className={`bg-${subject.color}-500 h-full rounded-full shadow-lg`} style={{ width: `${subject.accuracy}%` }} />
                          </div>
                          <span className="text-lg font-black text-slate-900 dark:text-slate-100">{subject.accuracy}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-center text-lg text-slate-700 dark:text-slate-300 font-semibold">{subject.time}</td>
                      <td className="px-8 py-8">
                        <button className="text-[#1a57db] hover:underline font-bold text-lg hover:text-[#1a57db]/80 transition-colors duration-200">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strong vs Weak Chapters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <MaterialIcon name="check_circle" className="text-green-600" size="28px" />
                Strongest Chapters
              </h3>
              <div className="flex flex-col gap-4">
                {strongChapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-black text-xl text-slate-900 dark:text-slate-100">{chapter.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{chapter.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-black text-2xl">100%</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-black flex items-center gap-3 text-slate-900 dark:text-slate-100">
                <MaterialIcon name="warning" className="text-red-600" size="28px" />
                Focus Areas (Weak Chapters)
              </h3>
              <div className="flex flex-col gap-4">
                {weakChapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-rose-50/70 to-red-50/70 dark:from-red-900/40 dark:to-red-800/40 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 backdrop-blur-md flex justify-between items-center"
                  >
                    <div>
                      <p className="font-black text-xl text-slate-900 dark:text-slate-100">{chapter.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{chapter.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-red-600 font-black text-2xl">{chapter.accuracy}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 bg-gradient-to-r from-[#1a57db]/10 to-[#1a57db]/5 border border-[#1a57db]/20 rounded-3xl mb-16 shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="size-20 rounded-2xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <MaterialIcon name="psychology" className="text-4xl text-[#1a57db]" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">Ready to master the concepts?</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
                  We've generated a custom study plan based on these results.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <button className="px-10 py-4 bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-50 hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
                Review Errors
              </button>
              <button className="px-10 py-4 bg-[#1a57db] text-white rounded-2xl font-bold text-lg shadow-2xl shadow-[#1a57db]/40 hover:scale-105 hover:shadow-3xl transition-all duration-300">
                Go to Study Plan
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/50 py-12 px-6 text-center text-slate-500/80 text-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <p>
          © 2024 EduMetrics Pro • All mock tests are property of their respective owners •{' '}
          <a className="text-[#1a57db] font-bold hover:underline transition-colors duration-200" href="#">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default PerformanceAnalytics;
