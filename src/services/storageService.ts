
import { JournalEntryType } from "@/components/Insights";

const STORAGE_KEY = 'digital-bonsai-entries';
const LAST_ENTRY_DATE_KEY = 'digital-bonsai-last-entry-date';

// Function to check if we can save an entry today
export const canSaveEntryToday = (): boolean => {
  const lastEntryDate = localStorage.getItem(LAST_ENTRY_DATE_KEY);
  
  if (!lastEntryDate) {
    return true;
  }
  
  const today = new Date().toDateString();
  const lastDate = new Date(lastEntryDate).toDateString();
  
  return today !== lastDate;
};

// Function to save an entry
export const saveEntry = (content: string, prompt: string): JournalEntryType | null => {
  if (!canSaveEntryToday()) {
    return null;
  }
  
  const now = new Date();
  const entry: JournalEntryType = {
    id: now.getTime().toString(),
    content,
    date: now.toISOString(),
    prompt
  };
  
  const existingEntries = getEntries();
  existingEntries.push(entry);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEntries));
  localStorage.setItem(LAST_ENTRY_DATE_KEY, now.toISOString());
  
  return entry;
};

// Function to get all entries
export const getEntries = (): JournalEntryType[] => {
  const entries = localStorage.getItem(STORAGE_KEY);
  return entries ? JSON.parse(entries) : [];
};

// Function to clear all entries (for testing)
export const clearEntries = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LAST_ENTRY_DATE_KEY);
};

// Function to check if an entry was made today
export const hasEntryToday = (): boolean => {
  const lastEntryDate = localStorage.getItem(LAST_ENTRY_DATE_KEY);
  
  if (!lastEntryDate) {
    return false;
  }
  
  const today = new Date().toDateString();
  const lastDate = new Date(lastEntryDate).toDateString();
  
  return today === lastDate;
};
