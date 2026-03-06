import { QueueListIcon } from "@heroicons/react/24/solid";
import { BarChart, LayoutDashboard, Notebook, Package, School } from "lucide-react"
import { useSelector } from "react-redux";

import { NavLink, Outlet } from "react-router-dom";
import type { RootState } from "../store";


const navItems = [
  { label: "Dashboard", icon: <LayoutDashboard color="white" size={20}/>, path: "/user/dashboard" },
  { label: "Performance", icon:<BarChart color="white" size={20}/>, path: "/user/performance" },
  { label: "Study Planner", icon:<Notebook color="white" size={20}/>, path: "/user/study-planner" },
  { label: "Mock Tests", icon:<Package color="white" size={20}/>, path: "/user/mock-tests" },
  { label: "Results", icon:<Package color="white" size={20}/> , path: "/user/results" },
];

export default function UserPanelLayout() {
  const {user} = useSelector((state:RootState)=>state.user ?? null)
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">

      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex flex-col">

        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1a57db] rounded-lg flex items-center justify-center text-white">
            <School color="white" size={20}/>
          </div>
          <h2 className="text-xl font-bold tracking-tight">OPrep Portal</h2>
        </div>

        {/* User Profile */}
        <div className="px-4 mb-6">
          <div className="p-4 bg-[#1a57db]/5 rounded-xl border border-[#1a57db]/10">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 bg-blue-200 px-5 flex justify-center items-center rounded-full bg-cover bg-center shadow-lg"
              >
                {user.email[0].toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="w-30 text-sm font-semibold truncate">{user.email}</span>
                <span className="text-xs text-slate-500">OPSC Aspirant</span>
              </div>
            </div>
            <button className="w-full py-1.5 text-xs font-bold bg-[#1a57db] text-white rounded-lg hover:bg-[#1a57db]/90 transition-all duration-200">
              View Profile
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#1a57db]/10 text-[#1a57db] font-medium shadow-sm"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Upgrade CTA */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-gradient-to-br from-[#1a57db] to-blue-700 p-4 rounded-xl text-white shadow-lg">
            <p className="text-sm font-medium mb-2">Crack OPSC with Pro</p>
            <p className="text-[10px] opacity-90 mb-3">
              Unlimited mocks, expert mentorship & PDF notes.
            </p>
            <button className="w-full py-2 bg-white text-[#1a57db] text-xs font-bold rounded-lg hover:bg-slate-100 transition-all duration-200">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}