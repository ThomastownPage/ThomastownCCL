import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Music,
  Newspaper,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  LogOut,
  CheckCircle,
  Home,
  Upload,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useAuth, getAuthHeader } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import type { Concert, NewsArticle } from "../context/DataContext";

type Tab = "concerts" | "news";

function moveItem<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr];
  const [item] = result.splice(from, 1);
  result.splice(to, 0, item);
  return result;
}

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", headers: getAuthHeader(), body: fd });
  if (!res.ok) throw new Error("Upload failed");
  const { url } = await res.json();
  return url;
}

function ImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch {
      setUploadError("Upload failed — please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer text-lg font-semibold select-none transition-colors ${
        uploading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}>
        <Upload className="w-5 h-5" />
        {uploading ? "Uploading…" : "Upload Photo from Computer"}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      {uploadError && <p className="text-red-600 text-base font-medium">{uploadError}</p>}
      <p className="text-gray-400 text-base">— or paste an image web address (URL) below —</p>
      <input
        className={inputCls}
        value={value.startsWith("/uploads/") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />
      {value && (
        <div className="flex items-center gap-4 mt-2">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-36 object-cover rounded-xl border-2 border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <p className="text-green-700 font-semibold text-base">
              {value.startsWith("/uploads/") ? "📷 Photo uploaded from computer" : "🔗 Image from web address"}
            </p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-red-600 text-base hover:underline mt-1"
            >
              × Remove image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FlyerUploadButton({ onUploaded }: { onUploaded: (urls: string[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  return (
    <div>
      <label className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer text-lg font-semibold select-none transition-colors ${
        uploading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}>
        <Upload className="w-5 h-5" />
        {uploading ? "Uploading…" : "Add Flyer Photos"}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={async (e) => {
            const files = Array.from(e.target.files || []);
            if (!files.length) return;
            setUploading(true);
            setUploadError("");
            try {
              const urls = await Promise.all(files.map(uploadFile));
              onUploaded(urls);
            } catch {
              setUploadError("One or more uploads failed — please try again.");
            } finally {
              setUploading(false);
              e.target.value = "";
            }
          }}
        />
      </label>
      {uploadError && <p className="text-red-600 text-sm mt-2">{uploadError}</p>}
      <p className="text-gray-400 text-sm mt-2">
        Tip: Hold Ctrl (or Cmd on Mac) to select multiple photos at once
      </p>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:border-[var(--brand)] focus:outline-none transition-colors";
const labelCls = "block text-lg font-semibold text-gray-700 mb-2 mt-4 first:mt-0";

export default function AdminPanel() {
  const { logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    concerts, news,
    addConcert, updateConcert, deleteConcert,
    addNews, updateNews, deleteNews,
    reorderConcerts, reorderNews,
  } = useData();

  const [tab, setTab] = useState<Tab>("concerts");
  const [toast, setToast] = useState("");

  const [cForm, setCForm] = useState<Omit<Concert, "id"> | null>(null);
  const [cEditId, setCEditId] = useState<string | null>(null);
  const [cDelId, setCDelId] = useState<string | null>(null);

  const [nForm, setNForm] = useState<Omit<NewsArticle, "id"> | null>(null);
  const [nEditId, setNEditId] = useState<string | null>(null);
  const [nDelId, setNDelId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) navigate("/admin/login", { replace: true });
  }, [isLoggedIn, navigate]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const switchTab = (newTab: Tab) => {
    setCForm(null); setCEditId(null); setCDelId(null);
    setNForm(null); setNEditId(null); setNDelId(null);
    setTab(newTab);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const emptyConcert: Omit<Concert, "id"> = {
    title: "", artist: "", date: "", time: "", price: "", image: "", description: "", isPast: false, eventType: "Concert", flyers: [], address: "",
  };
  const emptyNews: Omit<NewsArticle, "id"> = {
    title: "", date: "", category: "Programs", image: "", excerpt: "",
  };

  const saveConcert = () => {
    if (!cForm || !cForm.title.trim()) return;
    if (cEditId) { updateConcert({ ...cForm, id: cEditId }); showToast("✅ Event updated successfully!"); }
    else { addConcert(cForm); showToast("✅ New event added successfully!"); }
    setCForm(null); setCEditId(null);
  };

  const saveNews = () => {
    if (!nForm || !nForm.title.trim()) return;
    if (nEditId) { updateNews({ ...nForm, id: nEditId }); showToast("✅ Article updated successfully!"); }
    else { addNews(nForm); showToast("✅ New article added successfully!"); }
    setNForm(null); setNEditId(null);
  };

  const tabs: { id: Tab; label: string; Icon: typeof Music }[] = [
    { id: "concerts", label: "Events", Icon: Music },
    { id: "news", label: "News Articles", Icon: Newspaper },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[var(--brand-hover)] text-white px-6 py-5 shadow-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">🏛️ Admin Panel</h1>
            <p className="text-[var(--brand-border)] text-lg">Thomastown Community Centre</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-2 bg-[var(--brand)] text-white border-2 border-white/30 px-5 py-3 rounded-xl text-lg font-semibold hover:bg-[var(--brand-mid)] transition-colors"
            >
              <Home className="w-5 h-5" />
              View Website
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-[var(--brand)] px-5 py-3 rounded-xl text-lg font-semibold hover:bg-[var(--brand-lighter)] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {toast && (
          <div className="flex items-center gap-3 bg-green-100 border-2 border-green-400 text-green-800 px-6 py-4 rounded-xl text-xl font-medium mb-6 shadow">
            <CheckCircle className="w-7 h-7 flex-shrink-0" />
            {toast}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => switchTab(id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-xl font-semibold transition-all border-2 ${
                tab === id
                  ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[var(--brand-mid)] hover:shadow"
              }`}
            >
              <Icon className="w-6 h-6" />
              {label}
            </button>
          ))}
        </div>

        {tab === "concerts" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Manage Events</h2>
                <p className="text-gray-500 text-lg mt-1">
                  Add, edit or remove events shown on the Events page
                </p>
              </div>
              {!cForm && (
                <button
                  onClick={() => { setCForm(emptyConcert); setCEditId(null); }}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                  Add New Event
                </button>
              )}
            </div>

            {cForm && (
              <div className="bg-[var(--brand-lighter)] border-2 border-[var(--brand-soft)] rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-[var(--brand-dark)] mb-4">
                  {cEditId ? "✏️ Edit Event" : "➕ Add New Event"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <div>
                    <label className={labelCls}>Event Title *</label>
                    <input className={inputCls} value={cForm.title} onChange={(e) => setCForm({ ...cForm, title: e.target.value })} placeholder="e.g. Summer Jazz Night" />
                  </div>
                  <div>
                    <label className={labelCls}>Artist / Performer Name</label>
                    <input className={inputCls} value={cForm.artist} onChange={(e) => setCForm({ ...cForm, artist: e.target.value })} placeholder="e.g. The Kilkenny Folk Ensemble" />
                  </div>
                  <div>
                    <label className={labelCls}>Date</label>
                    <input className={inputCls} value={cForm.date} onChange={(e) => setCForm({ ...cForm, date: e.target.value })} placeholder="e.g. June 15, 2026" />
                  </div>
                  <div>
                    <label className={labelCls}>Start Time</label>
                    <input className={inputCls} value={cForm.time} onChange={(e) => setCForm({ ...cForm, time: e.target.value })} placeholder="e.g. 8:00 PM" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Address / Venue</label>
                    <input className={inputCls} value={cForm.address ?? ""} onChange={(e) => setCForm({ ...cForm, address: e.target.value })} placeholder="e.g. Thomastown Community Centre, Low Street" />
                  </div>
                  <div>
                    <label className={labelCls}>Ticket Price</label>
                    <input className={inputCls} value={cForm.price} onChange={(e) => setCForm({ ...cForm, price: e.target.value })} placeholder="e.g. €15" />
                  </div>
                  <div>
                    <label className={labelCls}>Event Type</label>
                    <select className={inputCls} value={cForm.eventType ?? "Concert"} onChange={(e) => setCForm({ ...cForm, eventType: e.target.value })}>
                      <option>Concert</option>
                      <option>Play</option>
                      <option>Musical</option>
                      <option>Festival</option>
                      <option>Workshop</option>
                      <option>Exhibition</option>
                      <option>Event</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Event Photo</label>
                    <ImageField value={cForm.image} onChange={(url) => setCForm({ ...cForm, image: url })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Description</label>
                    <textarea className={inputCls} rows={3} value={cForm.description} onChange={(e) => setCForm({ ...cForm, description: e.target.value })} placeholder="Short description of the concert..." />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3 mt-4 bg-white border-2 border-gray-200 rounded-xl p-4">
                    <input
                      type="checkbox"
                      id="cIsPast"
                      checked={cForm.isPast}
                      onChange={(e) => setCForm({ ...cForm, isPast: e.target.checked })}
                      className="w-6 h-6 accent-[var(--brand)] cursor-pointer"
                    />
                    <label htmlFor="cIsPast" className="text-lg font-semibold text-gray-700 cursor-pointer">
                      This is a past event (it will appear in the "Past Performances" section)
                    </label>
                  </div>

                  {cForm.isPast && (
                    <div className="md:col-span-2 bg-white border-2 border-[var(--brand-border)] rounded-xl p-5">
                      <label className="block text-lg font-semibold text-gray-700 mb-1">
                        📸 Event Flyers &amp; Photos
                      </label>
                      <p className="text-base text-gray-500 mb-4">
                        Upload flyer photos or event images. You can add as many as you like — select multiple at once.
                      </p>

                      {(cForm.flyers || []).length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-5">
                          {(cForm.flyers || []).map((flyer, i) => (
                            <div key={i} className="relative group">
                              <img
                                src={flyer}
                                alt={`Flyer ${i + 1}`}
                                className="w-full h-20 object-cover rounded-lg border-2 border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setCForm({
                                    ...cForm,
                                    flyers: (cForm.flyers || []).filter((_, j) => j !== i),
                                  })
                                }
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-base font-bold hover:bg-red-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <FlyerUploadButton
                        onUploaded={(urls) =>
                          setCForm({ ...cForm, flyers: [...(cForm.flyers || []), ...urls] })
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button onClick={saveConcert} className="flex items-center gap-2 bg-[var(--brand)] text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-[var(--brand-hover)] transition-colors">
                    <Save className="w-5 h-5" /> Save Event
                  </button>
                  <button onClick={() => { setCForm(null); setCEditId(null); }} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-300 transition-colors">
                    <X className="w-5 h-5" /> Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {concerts.length === 0 && (
                <p className="text-xl text-gray-400 text-center py-12">No events yet. Click "Add New Event" to get started.</p>
              )}
              {concerts.map((c, cIdx) => (
                <div key={c.id} className="border-2 border-gray-200 rounded-xl p-5 bg-gray-50">
                  {cDelId === c.id ? (
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-xl font-semibold text-red-700">⚠️ Are you sure you want to delete "{c.title}"?</span>
                      <button onClick={() => { deleteConcert(c.id); setCDelId(null); showToast("Event deleted."); }} className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-bold hover:bg-red-700">
                        Yes, Delete It
                      </button>
                      <button onClick={() => setCDelId(null)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl text-lg font-bold hover:bg-gray-300">
                        No, Keep It
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{c.title}</h4>
                        <p className="text-lg text-gray-500">
                          {c.artist} — {c.date}
                          {c.isPast && <span className="ml-2 text-[var(--brand)] font-medium">(Past · {c.eventType ?? "Concert"})</span>}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => reorderConcerts(moveItem(concerts, cIdx, cIdx - 1))} disabled={cIdx === 0} className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Move up">
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button onClick={() => reorderConcerts(moveItem(concerts, cIdx, cIdx + 1))} disabled={cIdx === concerts.length - 1} className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Move down">
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        <button onClick={() => { const { id, ...rest } = c; setCForm({ ...rest, flyers: rest.flyers || [] }); setCEditId(id); }} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-3 rounded-xl text-lg font-semibold hover:bg-blue-200 transition-colors">
                          <Pencil className="w-5 h-5" /> Edit
                        </button>
                        <button onClick={() => setCDelId(c.id)} className="flex items-center gap-2 bg-red-100 text-red-700 px-5 py-3 rounded-xl text-lg font-semibold hover:bg-red-200 transition-colors">
                          <Trash2 className="w-5 h-5" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "news" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Manage News Articles</h2>
                <p className="text-gray-500 text-lg mt-1">
                  Add, edit or remove news articles shown on the News page and Home page
                </p>
              </div>
              {!nForm && (
                <button
                  onClick={() => { setNForm(emptyNews); setNEditId(null); }}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-6 h-6" />
                  Add New Article
                </button>
              )}
            </div>

            {nForm && (
              <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-green-800 mb-4">
                  {nEditId ? "✏️ Edit Article" : "➕ Add New Article"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <div className="md:col-span-2">
                    <label className={labelCls}>Article Title *</label>
                    <input className={inputCls} value={nForm.title} onChange={(e) => setNForm({ ...nForm, title: e.target.value })} placeholder="e.g. New Summer Programs Announced" />
                  </div>
                  <div>
                    <label className={labelCls}>Date</label>
                    <input className={inputCls} value={nForm.date} onChange={(e) => setNForm({ ...nForm, date: e.target.value })} placeholder="e.g. May 10, 2026" />
                  </div>
                  <div>
                    <label className={labelCls}>Category</label>
                    <select className={inputCls} value={nForm.category} onChange={(e) => setNForm({ ...nForm, category: e.target.value })}>
                      <option>Programs</option>
                      <option>Events</option>
                      <option>Heritage</option>
                      <option>Achievement</option>
                      <option>Awards</option>
                      <option>Community</option>
                      <option>Announcement</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Article Photo</label>
                    <ImageField value={nForm.image} onChange={(url) => setNForm({ ...nForm, image: url })} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelCls}>Article Summary</label>
                    <textarea className={inputCls} rows={4} value={nForm.excerpt} onChange={(e) => setNForm({ ...nForm, excerpt: e.target.value })} placeholder="Write a short summary of the news story..." />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  <button onClick={saveNews} className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:bg-green-700 transition-colors">
                    <Save className="w-5 h-5" /> Save Article
                  </button>
                  <button onClick={() => { setNForm(null); setNEditId(null); }} className="flex items-center gap-2 bg-gray-200 text-gray-700 px-8 py-4 rounded-xl text-xl font-bold hover:bg-gray-300 transition-colors">
                    <X className="w-5 h-5" /> Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {news.length === 0 && (
                <p className="text-xl text-gray-400 text-center py-12">No articles yet. Click "Add New Article" to get started.</p>
              )}
              {news.map((n, nIdx) => (
                <div key={n.id} className="border-2 border-gray-200 rounded-xl p-5 bg-gray-50">
                  {nDelId === n.id ? (
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-xl font-semibold text-red-700">⚠️ Are you sure you want to delete "{n.title}"?</span>
                      <button onClick={() => { deleteNews(n.id); setNDelId(null); showToast("Article deleted."); }} className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-bold hover:bg-red-700">
                        Yes, Delete It
                      </button>
                      <button onClick={() => setNDelId(null)} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl text-lg font-bold hover:bg-gray-300">
                        No, Keep It
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{n.title}</h4>
                        <p className="text-lg text-gray-500">
                          {n.date} —{" "}
                          <span className="text-green-600 font-medium">{n.category}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => reorderNews(moveItem(news, nIdx, nIdx - 1))} disabled={nIdx === 0} className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Move up">
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button onClick={() => reorderNews(moveItem(news, nIdx, nIdx + 1))} disabled={nIdx === news.length - 1} className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" title="Move down">
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        <button onClick={() => { const { id, ...rest } = n; setNForm(rest); setNEditId(id); }} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-3 rounded-xl text-lg font-semibold hover:bg-blue-200 transition-colors">
                          <Pencil className="w-5 h-5" /> Edit
                        </button>
                        <button onClick={() => setNDelId(n.id)} className="flex items-center gap-2 bg-red-100 text-red-700 px-5 py-3 rounded-xl text-lg font-semibold hover:bg-red-200 transition-colors">
                          <Trash2 className="w-5 h-5" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
