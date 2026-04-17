'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { SiteContent, defaultContent } from './siteContent';

const STORAGE_KEY = 'w10_site_content';
const MAX_HISTORY = 50;

interface State {
  content: SiteContent;
  history: SiteContent[];
  future: SiteContent[];
  isDirty: boolean;
}

type Action =
  | { type: 'UPDATE'; payload: Partial<SiteContent> }
  | { type: 'UPDATE_NESTED'; section: keyof SiteContent; payload: unknown }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; payload: SiteContent };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, content: action.payload };

    case 'UPDATE': {
      const newContent = { ...state.content, ...action.payload };
      return {
        content: newContent,
        history: [...state.history.slice(-MAX_HISTORY + 1), state.content],
        future: [],
        isDirty: true,
      };
    }
    case 'UPDATE_NESTED': {
      const newContent = {
        ...state.content,
        [action.section]: { ...(state.content[action.section] as object), ...(action.payload as object) },
      };
      return {
        content: newContent,
        history: [...state.history.slice(-MAX_HISTORY + 1), state.content],
        future: [],
        isDirty: true,
      };
    }
    case 'UNDO': {
      if (!state.history.length) return state;
      const prev = state.history[state.history.length - 1];
      return {
        content: prev,
        history: state.history.slice(0, -1),
        future: [state.content, ...state.future],
        isDirty: true,
      };
    }
    case 'REDO': {
      if (!state.future.length) return state;
      const next = state.future[0];
      return {
        content: next,
        history: [...state.history, state.content],
        future: state.future.slice(1),
        isDirty: true,
      };
    }
    case 'RESET':
      return { content: defaultContent, history: [], future: [], isDirty: false };

    default:
      return state;
  }
}

interface SiteContextValue {
  content: SiteContent;
  canUndo: boolean;
  canRedo: boolean;
  isDirty: boolean;
  update: (payload: Partial<SiteContent>) => void;
  updateSection: (section: keyof SiteContent, payload: unknown) => void;
  undo: () => void;
  redo: () => void;
  save: () => void;
  reset: () => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    content: defaultContent,
    history: [],
    future: [],
    isDirty: false,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SiteContent;
        dispatch({ type: 'HYDRATE', payload: { ...defaultContent, ...parsed } });
      }
    } catch {}
  }, []);

  const save = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.content));
    } catch {}
  }, [state.content]);

  const value: SiteContextValue = {
    content: state.content,
    canUndo: state.history.length > 0,
    canRedo: state.future.length > 0,
    isDirty: state.isDirty,
    update: (payload) => dispatch({ type: 'UPDATE', payload }),
    updateSection: (section, payload) => dispatch({ type: 'UPDATE_NESTED', section, payload }),
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),
    save,
    reset: () => dispatch({ type: 'RESET' }),
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
