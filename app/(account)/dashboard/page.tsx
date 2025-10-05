"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  MoreVertical,
  Calendar,
  Filter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { apiService } from "@/services/apiService";

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    tasks: 12,
    completedTasks: 8,
    collaborators: [
      { id: 1, name: "Alice Johnson", avatar: "AJ", role: "owner" },
      { id: 2, name: "Bob Smith", avatar: "BS", role: "editor" },
      { id: 3, name: "Carol Davis", avatar: "CD", role: "viewer" },
    ],
    dueDate: "2024-10-15",
    priority: "high",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Cross-platform mobile application",
    tasks: 25,
    completedTasks: 15,
    collaborators: [
      { id: 1, name: "Alice Johnson", avatar: "AJ", role: "owner" },
      { id: 4, name: "David Wilson", avatar: "DW", role: "editor" },
    ],
    dueDate: "2024-11-20",
    priority: "medium",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Q4 product launch campaign",
    tasks: 8,
    completedTasks: 3,
    collaborators: [
      { id: 5, name: "Eve Brown", avatar: "EB", role: "owner" },
      { id: 2, name: "Bob Smith", avatar: "BS", role: "editor" },
      { id: 6, name: "Frank Miller", avatar: "FM", role: "viewer" },
    ],
    dueDate: "2024-12-01",
    priority: "high",
    color: "bg-purple-500",
  },
];

const mockRecentTasks = [
  {
    id: 1,
    title: "Design homepage mockup",
    project: "Website Redesign",
    completed: true,
    assignee: "Alice Johnson",
  },
  {
    id: 2,
    title: "Set up authentication",
    project: "Mobile App Development",
    completed: false,
    assignee: "David Wilson",
  },
  {
    id: 3,
    title: "Create social media assets",
    project: "Marketing Campaign",
    completed: false,
    assignee: "Eve Brown",
  },
  {
    id: 4,
    title: "Review user feedback",
    project: "Website Redesign",
    completed: true,
    assignee: "Bob Smith",
  },
];

export default function Dashboard() {
  const [projects, setProjects] = useState(mockProjects);
  const [recentTasks, setRecentTasks] = useState(mockRecentTasks);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = async () => {
    // Fetch projects and recent tasks from API
    setLoading(true);
    try {
      const response = await apiService.get("/api/dashboard/");
      setDashboardData(response);
      // setProjects(response.projects);
      // setRecentTasks(response.recent_tasks);
    } catch (err) {
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch dashboard data on mount
    fetchDashboard();
  }, []);

  console.log("dashboard data", dashboardData);

  // Calculate dashboard stats
  const totalProjects = projects.length;
  const totalTasks = projects.reduce((sum, project) => sum + project.tasks, 0);
  const completedTasks = projects.reduce(
    (sum, project) => sum + project.completedTasks,
    0
  );
  const pendingTasks = totalTasks - completedTasks;
  const totalCollaborators = new Set(
    projects.flatMap((p) => p.collaborators.map((c) => c.id))
  ).size;

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "text-blue-500",
  }) => (
    <div className="bg-secondary rounded-lg p-4 border border-border hover:border-accent-hover transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => {
    const completionPercentage = Math.round(
      (project.completedTasks / project.tasks) * 100
    );

    return (
      <div className="bg-secondary rounded-lg p-6 border border-tertiary hover:border-accent-hover transition-all hover:shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${project.color}`}></div>
            <div>
              <h3 className="font-semibold text-white">{project.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {project.description}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-300">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${project.color}`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <span>
            {project.completedTasks}/{project.tasks} tasks
          </span>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{project.dueDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.collaborators.slice(0, 3).map((collaborator) => (
              <div
                key={collaborator.id}
                className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-medium text-white"
                title={collaborator.name}
              >
                {collaborator.avatar}
              </div>
            ))}
            {project.collaborators.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-slate-600 border-2 border-slate-900 flex items-center justify-center text-xs font-medium text-gray-300">
                +{project.collaborators.length - 3}
              </div>
            )}
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              project.priority === "high"
                ? "bg-red-500/20 text-red-300"
                : project.priority === "medium"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-green-500/20 text-green-300"
            }`}
          >
            {project.priority}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white p-2">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back! Here's what's happening with your projects.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={CheckCircle}
            title="Total Projects"
            value={totalProjects}
            color="text-blue-500"
          />
          <StatCard
            icon={Clock}
            title="Total Tasks"
            value={totalTasks}
            subtitle={`${completedTasks} completed`}
            color="text-green-500"
          />
          <StatCard
            icon={AlertCircle}
            title="Pending Tasks"
            value={pendingTasks}
            color="text-yellow-500"
          />
          <StatCard
            icon={Users}
            title="Collaborators"
            value={totalCollaborators}
            color="text-purple-500"
          />
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between">
          <p>Top Projects</p>
          <Link className="text-accent hover:underline" href="/projects">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p className="my-4">Recent tasks </p>
        <div className="bg-secondary rounded-lg border border-slate-700">
          {recentTasks.map((task, index) => (
            <div
              key={task.id}
              className={`p-4 ${
                index !== recentTasks.length - 1
                  ? "border-b border-slate-700"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded border-2 ${
                      task.completed
                        ? "bg-accent border-accent"
                        : "border-gray-400"
                    }`}
                  >
                    {task.completed && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {task.project} • {task.assignee}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
