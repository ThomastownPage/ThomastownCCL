import { useTheme, type Theme } from "../context/ThemeContext";

const themes: { id: Theme; color: string; label: string }[] = [
  { id: "blue",     color: "#19668c",                                          label: "Blue"     },
  { id: "orange",   color: "#d97706",                                          label: "Orange"   },
  { id: "green",    color: "#15803d",                                          label: "Green"    },
  { id: "gradient", color: "linear-gradient(135deg, #19668c 0%, #d97706 100%)", label: "Gradient" },
];

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5" title="Switch colour theme">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          style={{ background: t.color }}
          className={`w-5 h-5 rounded-full transition-all duration-200 ${
            theme === t.id
              ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
              : "opacity-60 hover:opacity-100 hover:scale-110"
          }`}
          aria-label={`Switch to ${t.label} theme`}
        />
      ))}
    </div>
  );
}
