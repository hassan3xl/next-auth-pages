"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Archive, Settings, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AddProjectCollaboratorModal from "../modals/AddProjectCollaborator";

interface ShowMoreButtonProps {
  project: {
    id: string;
    owner_email: string;
  };
}

const ShowMoreButton = ({ project }: ShowMoreButtonProps) => {
  const [showAddCollaboratorModal, setShowAddCollaboratorModal] =
    React.useState(false);
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);
  const moreOptionsRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const { user } = useAuth();

  const isOwner = user?.email === project.owner_email;
  const gotoSettings = () => {
    router.push(`/projects/${project.id}/settings`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreOptionsRef.current &&
        !moreOptionsRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setShowMoreOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="absolute right-2 top-12 z-50 bg-secondary border border-tertiary rounded-lg shadow-lg p-3 w-48">
        <div className="space-y-2">
          <Button
            disabled={!isOwner}
            className={`w-full transition-colors
            ${isOwner ? "" : "text-gray-500 cursor-not-allowed opacity-50"}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isOwner) return; // block action
              setShowAddCollaboratorModal(true);
              setShowMoreOptions(false);
            }}
          >
            <UserPlus className="w-4 h-4" />
            Invite Collaborator
          </Button>

          <Button
            disabled={!isOwner}
            className={`w-full transition-colors
            ${isOwner ? "" : "text-gray-500 cursor-not-allowed opacity-50"}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isOwner) return;
              setShowMoreOptions(false);
            }}
          >
            <Archive className="w-4 h-4" />
            Archive Project
          </Button>

          <Button
            disabled={!isOwner}
            className={`w-full transition-colors
            ${isOwner ? "" : "text-gray-500 cursor-not-allowed opacity-50"}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!isOwner) return;
              // Edit functionality
              setShowMoreOptions(false);
              gotoSettings();
            }}
          >
            <Settings className="w-4 h-4" />
            Project Settings
          </Button>

          <div className="border-t border-tertiary pt-2">
            <Button
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowMoreOptions(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      <AddProjectCollaboratorModal
        isOpen={showAddCollaboratorModal}
        projectId={project.id}
        onClose={() => setShowAddCollaboratorModal(false)}
      />
    </>
  );
};

export default ShowMoreButton;
