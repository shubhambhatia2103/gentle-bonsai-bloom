
import { JournalEntryType } from "@/components/Insights";

const STORAGE_KEY = 'digital-bonsai-entries';
const LAST_GROWTH_DATE_KEY = 'digital-bonsai-last-growth-date';

// Function to check if we can grow the tree today
export const canGrowTreeToday = (): boolean => {
  const lastGrowthDate = localStorage.getItem(LAST_GROWTH_DATE_KEY);
  
  if (!lastGrowthDate) {
    return true;
  }
  
  const today = new Date().toDateString();
  const lastDate = new Date(lastGrowthDate).toDateString();
  
  return today !== lastDate;
};

// Function to save an entry
export const saveEntry = (content: string): JournalEntryType => {
  const now = new Date();
  const entry: JournalEntryType = {
    id: now.getTime().toString(),
    content,
    date: now.toISOString()
  };
  
  const existingEntries = getEntries();
  existingEntries.push(entry);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEntries));
  
  // If this is the first entry of the day, mark the tree as grown today
  if (canGrowTreeToday()) {
    localStorage.setItem(LAST_GROWTH_DATE_KEY, now.toISOString());
  }
  
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
  localStorage.removeItem(LAST_GROWTH_DATE_KEY);
};

// Function to get entries from today
export const getTodayEntries = (): JournalEntryType[] => {
  const entries = getEntries();
  const today = new Date().toDateString();
  
  return entries.filter(entry => 
    new Date(entry.date).toDateString() === today
  );
};

// Function to delete today's entries
export const deleteTodayEntries = (): void => {
  const entries = getEntries();
  const today = new Date().toDateString();
  
  const filteredEntries = entries.filter(entry => 
    new Date(entry.date).toDateString() !== today
  );
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
};

// Function to check if the tree has grown today
export const hasTreeGrownToday = (): boolean => {
  const lastGrowthDate = localStorage.getItem(LAST_GROWTH_DATE_KEY);
  
  if (!lastGrowthDate) {
    return false;
  }
  
  const today = new Date().toDateString();
  const lastDate = new Date(lastGrowthDate).toDateString();
  
  return today === lastDate;
};
