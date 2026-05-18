import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getAuthHeader } from "./AuthContext";

export interface Concert {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  price: string;
  image: string;
  description: string;
  isPast: boolean;
  eventType?: string;
  flyers?: string[];
  address?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
}


interface DataContextType {
  concerts: Concert[];
  events: Event[];
  news: NewsArticle[];
  addConcert: (c: Omit<Concert, "id">) => void;
  updateConcert: (c: Concert) => void;
  deleteConcert: (id: string) => void;
  addEvent: (e: Omit<Event, "id">) => void;
  updateEvent: (e: Event) => void;
  deleteEvent: (id: string) => void;
  addNews: (n: Omit<NewsArticle, "id">) => void;
  updateNews: (n: NewsArticle) => void;
  deleteNews: (id: string) => void;
  reorderConcerts: (arr: Concert[]) => void;
  reorderEvents: (arr: Event[]) => void;
  reorderNews: (arr: NewsArticle[]) => void;
}

const DataContext = createContext<DataContextType | null>(null);

const authJson = () => ({ "Content-Type": "application/json", ...getAuthHeader() });
const authOnly = () => ({ ...getAuthHeader() });

function authFetch(url: string, init: RequestInit): void {
  fetch(url, init).then((r) => {
    if (r.status === 401) {
      localStorage.removeItem("cc_admin_token");
      window.location.assign("/admin/login");
    }
  }).catch(() => {});
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetch("/api/concerts").then((r) => r.json()).then(setConcerts).catch(() => {});
    fetch("/api/events").then((r) => r.json()).then(setEvents).catch(() => {});
    fetch("/api/news").then((r) => r.json()).then(setNews).catch(() => {});
  }, []);

  const addConcert = (c: Omit<Concert, "id">) => {
    const item: Concert = { ...c, id: Date.now().toString() };
    setConcerts((prev) => [item, ...prev]);
    authFetch("/api/concerts", { method: "POST", headers: authJson(), body: JSON.stringify(item) });
  };
  const updateConcert = (c: Concert) => {
    setConcerts((prev) => prev.map((x) => (x.id === c.id ? c : x)));
    authFetch(`/api/concerts/${c.id}`, { method: "PUT", headers: authJson(), body: JSON.stringify(c) });
  };
  const deleteConcert = (id: string) => {
    setConcerts((prev) => prev.filter((x) => x.id !== id));
    authFetch(`/api/concerts/${id}`, { method: "DELETE", headers: authOnly() });
  };

  const addEvent = (e: Omit<Event, "id">) => {
    const item: Event = { ...e, id: Date.now().toString() };
    setEvents((prev) => [item, ...prev]);
    authFetch("/api/events", { method: "POST", headers: authJson(), body: JSON.stringify(item) });
  };
  const updateEvent = (e: Event) => {
    setEvents((prev) => prev.map((x) => (x.id === e.id ? e : x)));
    authFetch(`/api/events/${e.id}`, { method: "PUT", headers: authJson(), body: JSON.stringify(e) });
  };
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((x) => x.id !== id));
    authFetch(`/api/events/${id}`, { method: "DELETE", headers: authOnly() });
  };

  const addNews = (n: Omit<NewsArticle, "id">) => {
    const item: NewsArticle = { ...n, id: Date.now().toString() };
    setNews((prev) => [item, ...prev]);
    authFetch("/api/news", { method: "POST", headers: authJson(), body: JSON.stringify(item) });
  };
  const updateNews = (n: NewsArticle) => {
    setNews((prev) => prev.map((x) => (x.id === n.id ? n : x)));
    authFetch(`/api/news/${n.id}`, { method: "PUT", headers: authJson(), body: JSON.stringify(n) });
  };
  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((x) => x.id !== id));
    authFetch(`/api/news/${id}`, { method: "DELETE", headers: authOnly() });
  };

  const reorderConcerts = (arr: Concert[]) => {
    setConcerts(arr);
    authFetch("/api/concerts", { method: "PUT", headers: authJson(), body: JSON.stringify(arr) });
  };
  const reorderEvents = (arr: Event[]) => {
    setEvents(arr);
    authFetch("/api/events", { method: "PUT", headers: authJson(), body: JSON.stringify(arr) });
  };
  const reorderNews = (arr: NewsArticle[]) => {
    setNews(arr);
    authFetch("/api/news", { method: "PUT", headers: authJson(), body: JSON.stringify(arr) });
  };

  return (
    <DataContext.Provider
      value={{
        concerts,
        events,
        news,
        addConcert,
        updateConcert,
        deleteConcert,
        addEvent,
        updateEvent,
        deleteEvent,
        addNews,
        updateNews,
        deleteNews,
        reorderConcerts,
        reorderEvents,
        reorderNews,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
