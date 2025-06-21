import { useAppStore } from "@/store/appStore";
import { Project } from "@/payload-types";

export function useProjects() {
  const projects = useAppStore((s) => s.projects);
  const loadingProjects = useAppStore((s) => s.loadingProjects);
  const projectsPagination = useAppStore((s) => s.projectsPagination);

  const addProject = useAppStore((s) => s.addProject);
  const updateProject = useAppStore((s) => s.updateProject);
  const removeProject = useAppStore((s) => s.removeProject);
  const loadProjects = useAppStore((s) => s.loadProjects);

  return {
    projects,
    loadingProjects,
    projectsPagination,
    addProject,
    updateProject,
    removeProject,
    loadProjects,
  };
}
