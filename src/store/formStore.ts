// store/formStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { arrayMove } from '@dnd-kit/sortable';
import type { FieldType, FormField, FormGroup } from '@/types/form';

interface FormStore {
  groups: FormGroup[];
  selectedFieldId: string | null;
  selectedGroupId: string | null;
  hasHydrated: boolean;

  addGroup: (title?: string) => void;
  removeGroup: (groupId: string) => void;
  reorderGroups: (from: number, to: number) => void;
  updateGroupTitle: (groupId: string, title: string) => void;

  addField: (groupId: string, type: FieldType) => void;
  removeField: (groupId: string, fieldId: string) => void;
  reorderFields: (groupId: string, from: number, to: number) => void;
  updateField: (groupId: string, fieldId: string, patch: Partial<FormField>) => void;
  moveFieldToGroup: (
    fieldId: string,
    fromGroupId: string,
    toGroupId: string,
    toIndex: number,
  ) => void;

  selectField: (id: string | null) => void;
  selectGroup: (id: string | null) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      groups: [],
      selectedFieldId: null,
      selectedGroupId: null,
      hasHydrated: false,

      addGroup: (title) =>
        set((state) => ({
          groups: [
            ...state.groups,
            {
              id: crypto.randomUUID(),
              fields: [],
              ...(title !== undefined ? { title } : {}),
            },
          ],
        })),

      removeGroup: (groupId) =>
        set((state) => {
          const removedGroup = state.groups.find((g) => g.id === groupId);
          const wasFieldSelected = removedGroup?.fields.some((f) => f.id === state.selectedFieldId);
          return {
            groups: state.groups.filter((g) => g.id !== groupId),
            selectedGroupId: state.selectedGroupId === groupId ? null : state.selectedGroupId,
            selectedFieldId: wasFieldSelected ? null : state.selectedFieldId,
          };
        }),

      reorderGroups: (from, to) =>
        set((state) => ({
          groups: arrayMove(state.groups, from, to),
        })),

      updateGroupTitle: (groupId, title) =>
        set((state) => ({
          groups: state.groups.map((g) => (g.id === groupId ? { ...g, title } : g)),
        })),

      addField: (groupId, type) =>
        set((state) => {
          const group = state.groups.find((g) => g.id === groupId);
          const sameTypeCount = group ? group.fields.filter((f) => f.type === type).length : 0;
          const newField: FormField = {
            id: crypto.randomUUID(),
            name: `${type}_${sameTypeCount + 1}`,
            type,
            label: type.charAt(0).toUpperCase() + type.slice(1),
            required: false,
            width: 'full',
          };
          return {
            groups: state.groups.map((g) =>
              g.id === groupId ? { ...g, fields: [...g.fields, newField] } : g,
            ),
          };
        }),

      removeField: (groupId, fieldId) =>
        set((state) => ({
          groups: state.groups.map((g) =>
            g.id === groupId ? { ...g, fields: g.fields.filter((f) => f.id !== fieldId) } : g,
          ),
          selectedFieldId: state.selectedFieldId === fieldId ? null : state.selectedFieldId,
        })),

      reorderFields: (groupId, from, to) =>
        set((state) => ({
          groups: state.groups.map((g) =>
            g.id === groupId ? { ...g, fields: arrayMove(g.fields, from, to) } : g,
          ),
        })),

      updateField: (groupId, fieldId, patch) =>
        set((state) => ({
          groups: state.groups.map((g) =>
            g.id === groupId
              ? {
                  ...g,
                  fields: g.fields.map((f) => (f.id === fieldId ? { ...f, ...patch } : f)),
                }
              : g,
          ),
        })),

      moveFieldToGroup: (fieldId, fromGroupId, toGroupId, toIndex) =>
        set((state) => {
          const fromGroup = state.groups.find((g) => g.id === fromGroupId);
          const field = fromGroup?.fields.find((f) => f.id === fieldId);
          if (!field) return state;

          return {
            groups: state.groups.map((g) => {
              if (g.id === fromGroupId) {
                return { ...g, fields: g.fields.filter((f) => f.id !== fieldId) };
              }
              if (g.id === toGroupId) {
                const newFields = [...g.fields];
                newFields.splice(toIndex, 0, field);
                return { ...g, fields: newFields };
              }
              return g;
            }),
          };
        }),

      selectField: (id) => set({ selectedFieldId: id, selectedGroupId: null }),
      selectGroup: (id) => set({ selectedGroupId: id, selectedFieldId: null }),

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'formbuilder-form',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ groups: state.groups }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
