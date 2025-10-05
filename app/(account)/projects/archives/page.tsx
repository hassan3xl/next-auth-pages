"use client";

import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiService } from "@/services/apiService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Archive,
  ArchiveRestore,
  Trash2,
  Eye,
  Lock,
  Globe,
  Users,
  CheckCircle2,
  FolderArchive,
  AlertCircle,
  Calendar,
  Package,
} from "lucide-react";

type ArchivedProjectsType = {
  id: string;
  item_count: number;
  title: string;
  description: string;
  visibility: string;
  is_archived: boolean;
  created_at?: string;
  completed_count?: number;
  owner_email?: string;
};

const ProjectArchivesPage = () => {
  const [archivedProjects, setArchivedProjects] = useState<
    ArchivedProjectsType[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<{
    id: string;
    action: "restore" | "delete";
  } | null>(null);
  const toast = useToast();
  const router = useRouter();

  const fetchArchives = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("api/projects/archives/");
      setArchivedProjects(Array.isArray(response) ? response : []);
    } catch (error: any) {
      toast.error(error?.detail || "Failed to fetch archived projects");
      setArchivedProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const handleRestore = async (projectId: string) => {
    setActionLoading({ id: projectId, action: "restore" });
    try {
      await apiService.patch(`api/projects/${projectId}/archive/`, {
        is_archived: false,
      });
      toast.success("Project restored successfully!");
      fetchArchives();
    } catch (error: any) {
      toast.error(error?.detail || "Failed to restore project");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewProject = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility.toLowerCase()) {
      case "private":
        return <Lock className="w-4 h-4" />;
      case "public":
        return <Globe className="w-4 h-4" />;
      case "shared":
        return <Users className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility.toLowerCase()) {
      case "private":
        return "bg-red-100 text-red-800 border-red-200";
      case "public":
        return "bg-green-100 text-green-800 border-green-200";
      case "shared":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading archived projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-secondary/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-tertiary/50">
          <div className="flex items-center gap-3 mb-2">
            <FolderArchive className="w-8 h-8 text-orange-400" />
            <h1 className="text-3xl font-bold">Archived Projects</h1>
          </div>
          <p className="text-gray-300">
            View and manage your archived projects. Restore them or permanently
            delete them.
          </p>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 flex items-center gap-2 px-3 py-1.5">
              <Archive className="w-4 h-4" />
              {archivedProjects.length} Archived{" "}
              {archivedProjects.length === 1 ? "Project" : "Projects"}
            </Badge>
          </div>
        </div>

        {/* Projects Grid */}
        {archivedProjects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {archivedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-secondary/80 backdrop-blur-sm rounded-xl border border-tertiary/50 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-orange-500/50 group"
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 p-5 border-b border-tertiary/50">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white mb-2 truncate group-hover:text-orange-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200 flex items-center gap-1 shrink-0">
                      <Archive className="w-3 h-3" />
                      Archived
                    </Badge>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`${getVisibilityColor(
                        project.visibility
                      )} capitalize flex items-center gap-1 text-xs`}
                    >
                      {getVisibilityIcon(project.visibility)}
                      {project.visibility}
                    </Badge>
                    {project.created_at && (
                      <Badge
                        variant="outline"
                        className="text-gray-400 border-gray-600 text-xs"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(project.created_at)}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Project Stats */}
                <div className="p-5 bg-primary/30 border-b border-tertiary/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Package className="w-4 h-4 text-blue-400" />
                        <span className="text-2xl font-bold text-blue-400">
                          {project.item_count}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Total Tasks</p>
                    </div>
                    {project.completed_count !== undefined && (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-2xl font-bold text-green-400">
                            {project.completed_count}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">Completed</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 space-y-3">
                  {/* View Project */}
                  <Button
                    onClick={() => handleViewProject(project.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Project
                  </Button>

                  {/* Restore and Delete */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleRestore(project.id)}
                      disabled={
                        actionLoading?.id === project.id &&
                        actionLoading?.action === "restore"
                      }
                      className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      {actionLoading?.id === project.id &&
                      actionLoading?.action === "restore" ? (
                        "Restoring..."
                      ) : (
                        <>
                          <ArchiveRestore className="w-4 h-4 mr-2" />
                          Restore
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => handleDelete(project.id)}
                      disabled={
                        actionLoading?.id === project.id &&
                        actionLoading?.action === "delete"
                      }
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      {actionLoading?.id === project.id &&
                      actionLoading?.action === "delete" ? (
                        "Deleting..."
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Warning Text */}
                  <p className="text-xs text-center text-gray-500 italic">
                    Deletion is permanent and cannot be undone
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-secondary/50 backdrop-blur-sm rounded-xl border border-tertiary/50 p-12 text-center">
            <FolderArchive className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">
              No Archived Projects
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't archived any projects yet. Archived projects will
              appear here.
            </p>
            <Button
              onClick={() => router.push("/projects")}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Go to Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectArchivesPage;
