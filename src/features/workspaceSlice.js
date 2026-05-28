import { createSlice } from "@reduxjs/toolkit";
import { dummyWorkspaces } from "../assets/assets";

const loadWorkspacesFromStorage = () => {
    try {
        const serialized = localStorage.getItem("workspaces");
        if (serialized === null) {
            localStorage.setItem("workspaces", JSON.stringify(dummyWorkspaces));
            return dummyWorkspaces;
        }
        return JSON.parse(serialized);
    } catch {
        return dummyWorkspaces;
    }
};

const loadCurrentWorkspaceFromStorage = (workspaces) => {
    try {
        const id = localStorage.getItem("currentWorkspaceId");
        if (id) {
            const found = workspaces.find((w) => w.id === id);
            if (found) return found;
        }
        return workspaces[1] || workspaces[0] || null;
    } catch {
        return workspaces[1] || workspaces[0] || null;
    }
};

const saveWorkspacesToStorage = (workspaces) => {
    try {
        localStorage.setItem("workspaces", JSON.stringify(workspaces));
    } catch (err) {
        console.error("Failed to save workspaces to localStorage:", err);
    }
};

const initialWorkspaces = loadWorkspacesFromStorage();

const initialState = {
    workspaces: initialWorkspaces,
    currentWorkspace: loadCurrentWorkspaceFromStorage(initialWorkspaces),
    loading: false,
};

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setWorkspaces: (state, action) => {
            state.workspaces = action.payload;
            saveWorkspacesToStorage(state.workspaces);
        },
        setCurrentWorkspace: (state, action) => {
            localStorage.setItem("currentWorkspaceId", action.payload);
            state.currentWorkspace = state.workspaces.find((w) => w.id === action.payload);
        },
        addWorkspace: (state, action) => {
            state.workspaces.push(action.payload);

            // set current workspace to the new workspace
            if (state.currentWorkspace?.id !== action.payload.id) {
                state.currentWorkspace = action.payload;
                localStorage.setItem("currentWorkspaceId", action.payload.id);
            }
            saveWorkspacesToStorage(state.workspaces);
        },
        updateWorkspace: (state, action) => {
            state.workspaces = state.workspaces.map((w) =>
                w.id === action.payload.id ? action.payload : w
            );

            // if current workspace is updated, set it to the updated workspace
            if (state.currentWorkspace?.id === action.payload.id) {
                state.currentWorkspace = action.payload;
            }
            saveWorkspacesToStorage(state.workspaces);
        },
        deleteWorkspace: (state, action) => {
            state.workspaces = state.workspaces.filter((w) => w.id !== action.payload);
            if (state.currentWorkspace?.id === action.payload) {
                state.currentWorkspace = state.workspaces[0] || null;
                if (state.currentWorkspace) {
                    localStorage.setItem("currentWorkspaceId", state.currentWorkspace.id);
                } else {
                    localStorage.removeItem("currentWorkspaceId");
                }
            }
            saveWorkspacesToStorage(state.workspaces);
        },
        addProject: (state, action) => {
            state.currentWorkspace.projects.push(action.payload);
            // find workspace by id and add project to it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? { ...w, projects: w.projects.concat(action.payload) } : w
            );
            saveWorkspacesToStorage(state.workspaces);
        },
        addTask: (state, action) => {
            state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    p.tasks.push(action.payload);
                }
                return p;
            });

            // find workspace and project by id and add task to it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? {
                    ...w, projects: w.projects.map((p) =>
                        p.id === action.payload.projectId ? { ...p, tasks: p.tasks.concat(action.payload) } : p
                    )
                } : w
            );
            saveWorkspacesToStorage(state.workspaces);
        },
        updateTask: (state, action) => {
            state.currentWorkspace.projects.map((p) => {
                if (p.id === action.payload.projectId) {
                    p.tasks = p.tasks.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                    );
                }
            });
            // find workspace and project by id and update task in it
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? {
                    ...w, projects: w.projects.map((p) =>
                        p.id === action.payload.projectId ? {
                            ...p, tasks: p.tasks.map((t) =>
                                t.id === action.payload.id ? action.payload : t
                            )
                        } : p
                    )
                } : w
            );
            saveWorkspacesToStorage(state.workspaces);
        },
        deleteTask: (state, action) => {
            const taskIds = action.payload;
            state.currentWorkspace.projects = state.currentWorkspace.projects.map((p) => ({
                ...p, tasks: p.tasks.filter((t) => !taskIds.includes(t.id))
            }));
            // Sync with workspaces array
            state.workspaces = state.workspaces.map((w) =>
                w.id === state.currentWorkspace.id ? {
                    ...w, projects: w.projects.map((p) => ({
                        ...p, tasks: p.tasks.filter((t) => !taskIds.includes(t.id))
                    }))
                } : w
            );
            saveWorkspacesToStorage(state.workspaces);
        }

    }
});

export const { setWorkspaces, setCurrentWorkspace, addWorkspace, updateWorkspace, deleteWorkspace, addProject, addTask, updateTask, deleteTask } = workspaceSlice.actions;
export default workspaceSlice.reducer;