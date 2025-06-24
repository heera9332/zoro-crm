import { useAppStore } from "@/store/appStore";

export function useUsers() {
  const users = useAppStore((s) => s.users);
  const loadingUsers = useAppStore((s) => s.loadingUsers);
  const usersPagination = useAppStore((s) => s.usersPagination);
  const currentUser = useAppStore((s) => s.currentUser);

  const getUsers = useAppStore((s) => s.getUsers);
  const getUser = useAppStore((s) => s.getUser);
  const addUser = useAppStore((s) => s.addUser);
  const updateUser = useAppStore((s) => s.updateUser);
  const removeUser = useAppStore((s) => s.removeUser);

  return {
    users,
    loadingUsers,
    usersPagination,
    currentUser,
    getUsers,
    getUser,
    addUser,
    updateUser,
    removeUser,
  };
}
