import React, { useState, useEffect } from 'react';

const MockTests = () => {
  const [timeLeft, setTimeLeft] = useState(6120); // 01:42:15 in seconds
  const [currentQuestion, setCurrentQuestion] = useState(45);
  const [selectedOption, setSelectedOption] = useState('A');
  const [showNotepad, setShowNotepad] = useState(false);
  const [notepadText, setNotepadText] = useState('');

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const MaterialIcon = ({ name, className = "material-symbols-outlined" }) => (
    <span className={`${className} font-normal leading-none`}>{name}</span>
  );

  // Generate question palette data
  const generateQuestionPalette = () => {
    const palette = [];
    const totalQuestions = 100;
    
    for (let i = 1; i <= totalQuestions; i++) {
      let status = 'unvisited';
      if (i <= 12) status = 'answered'; // First 12 answered
      else if ([3, 15, 28].includes(i)) status = 'flagged'; // Some flagged
      else if ([5, 67].includes(i)) status = 'notAnswered'; // Some not answered
      else if (i === currentQuestion) status = 'current';
      
      palette.push({ number: i, status });
    }
    return palette;
  };

  const questionPalette = generateQuestionPalette();
  const stats = {
    answered: 12,
    flagged: 3,
    notVisited: 85,
    notAnswered: 2
  };

  const options = [
    { id: 'A', text: '7th Constitutional Amendment Act', selected: true },
    { id: 'B', text: '10th Constitutional Amendment Act' },
    { id: 'C', text: '12th Constitutional Amendment Act' },
    { id: 'D', text: '14th Constitutional Amendment Act' }
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 font-['Inter'] text-slate-900 dark:text-slate-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-3 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a57db] text-white shadow-lg">
            <MaterialIcon name="description" />
          </div>
          <div>
            <h2 className="text-lg font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              OPSC GS Prelims Mock #1
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Section: General Studies I</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <MaterialIcon name="timer" className="text-[#1a57db]" />
            <span className="font-mono text-lg font-black text-slate-700 dark:text-slate-200">
              {formatTime(timeLeft)}
            </span>
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1a57db] px-6 text-sm font-bold text-white shadow-lg hover:bg-[#1a57db]/90 transition-all duration-200">
            <span>Submit Test</span>
            <MaterialIcon name="send" />
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        {/* Left Side: Question Area */}
        <div className="flex flex-1 flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="flex-1 overflow-y-auto p-8 lg:p-12">
            <div className="mx-auto max-w-3xl">
              {/* Question Header */}
              <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-6 dark:border-slate-800">
                <span className="inline-flex items-center rounded-full bg-[#1a57db]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1a57db]">
                  Question {currentQuestion}
                </span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#1a57db] dark:text-slate-400 transition-colors duration-200">
                    <MaterialIcon name="translate" />
                    <span>English</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-[#1a57db] dark:text-slate-400 transition-colors duration-200">
                    <MaterialIcon name="report" />
                    <span>Report</span>
                  </button>
                </div>
              </div>

              {/* Question Content */}
              <div className="mb-12">
                <h3 className="text-2xl lg:text-3xl font-semibold leading-relaxed text-slate-800 dark:text-slate-100 max-w-4xl">
                  Which of the following constitutional amendments of India provided for the establishment of a common High Court for two or more States?
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className={`group relative flex cursor-pointer items-center gap-4 rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-md ${
                      option.selected
                        ? 'border-[#1a57db] bg-[#1a57db]/5'
                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/30 dark:hover:border-slate-600'
                    }`}
                  >
                    <input
                      className="h-5 w-5 border-slate-300 text-[#1a57db] focus:ring-[#1a57db] shadow-sm cursor-pointer"
                      type="radio"
                      name="mcq"
                      checked={option.selected}
                      onChange={() => setSelectedOption(option.id)}
                    />
                    <div className="flex-1">
                      <span className="text-lg font-semibold text-slate-900 dark:text-white">{option.text}</span>
                    </div>
                    {option.selected && (
                      <span className="text-xs font-bold uppercase text-[#1a57db]">Selected</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="border-t border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-md shadow-lg">
            <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
              <div className="flex gap-3">
                <button className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all duration-200 shadow-sm">
                  <MaterialIcon name="bookmark" />
                  <span>Mark for Review</span>
                </button>
                <button className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all duration-200 shadow-sm">
                  <MaterialIcon name="delete_sweep" />
                  <span>Clear Response</span>
                </button>
              </div>
              <div className="flex gap-3">
                <button className="flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all duration-200 shadow-sm">
                  <MaterialIcon name="chevron_left" />
                  <span>Previous</span>
                </button>
                <button className="flex h-11 items-center gap-2 rounded-lg bg-[#1a57db] px-8 text-sm font-bold text-white shadow-lg shadow-[#1a57db]/20 hover:bg-[#1a57db]/90 hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
                  <span>Save & Next</span>
                  <MaterialIcon name="chevron_right" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Sidebar */}
        <aside className="w-80 border-l border-slate-200 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-900/70 backdrop-blur-md">
          <div className="flex h-full flex-col">
            {/* Progress Stats */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-lg font-black text-slate-800 dark:text-slate-100">Question Palette</h4>
                <button
                  className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#1a57db] shadow-sm ring-1 ring-slate-200 hover:shadow-md dark:bg-slate-800 dark:ring-slate-700 transition-all duration-200"
                  onClick={() => setShowNotepad(!showNotepad)}
                >
                  <MaterialIcon name="notes" className="!text-sm" />
                  <span>Notepad</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-emerald-500 shadow-sm"></span>
                  <span className="text-slate-700 dark:text-slate-300">{stats.answered} Answered</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-amber-500 shadow-sm"></span>
                  <span className="text-slate-700 dark:text-slate-300">{stats.flagged} Flagged</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-600 shadow-sm"></span>
                  <span className="text-slate-700 dark:text-slate-300">{stats.notVisited} Not Visited</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-red-400 shadow-sm"></span>
                  <span className="text-slate-700 dark:text-slate-300">{stats.notAnswered} Not Answered</span>
                </div>
              </div>
            </div>

            {/* Question Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-white/30 dark:bg-slate-900/30">
              <div className="grid grid-cols-5 gap-2">
                {questionPalette.slice(0, 25).map((q) => (
                  <button
                    key={q.number}
                    className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                      q.status === 'current'
                        ? 'bg-[#1a57db] text-white ring-2 ring-[#1a57db] ring-offset-2 dark:ring-offset-slate-900 shadow-lg'
                        : q.status === 'answered'
                        ? 'bg-emerald-500 text-white shadow-md hover:shadow-lg'
                        : q.status === 'flagged'
                        ? 'bg-amber-500 text-white shadow-md hover:shadow-lg'
                        : q.status === 'notAnswered'
                        ? 'bg-red-400 text-white shadow-md hover:shadow-lg'
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => setCurrentQuestion(q.number)}
                  >
                    {q.number}
                  </button>
                ))}
                {currentQuestion > 25 && (
                  <div className="col-span-5 text-center py-4 text-xs text-slate-500 dark:text-slate-400">
                    ... Scroll for more questions
                  </div>
                )}
              </div>
            </div>

            {/* Legend/Helper */}
            <div className="bg-white p-6 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-200">
                  <span>Exam Progress</span>
                  <span>45%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-[#1a57db] to-blue-600 shadow-sm"
                    style={{ width: '45%' }}
                  />
                </div>
              </div>
              <button className="w-full rounded-xl bg-slate-100 py-3 text-xs font-bold text-slate-700 transition-all duration-200 hover:bg-slate-200 hover:shadow-md dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                View Instructions
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Floating Notepad */}
      <div
        className={`fixed bottom-24 right-8 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/95 transition-all duration-300 ${
          showNotepad ? 'scale-100 opacity-100' : 'scale-75 opacity-0 lg:opacity-40 lg:hover:opacity-100 lg:hover:scale-100'
        }`}
      >
        <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
          <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">Built-in Notepad</h5>
          <button
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            onClick={() => setShowNotepad(false)}
          >
            <MaterialIcon name="close" className="!text-lg" />
          </button>
        </div>
        <textarea
          className="w-full resize-none border-0 bg-transparent p-0 text-sm text-slate-600 focus:ring-0 dark:text-slate-400 h-32 outline-none placeholder-slate-500"
          placeholder="Jot down rough work here..."
          value={notepadText}
          onChange={(e) => setNotepadText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MockTests;
