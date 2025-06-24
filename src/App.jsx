import { useState, useEffect } from "react";
import {
  CheckCircle,
  Coffee,
  Heart,
  Brain,
  BookOpen,
  PenTool,
  Globe,
  Music,
  Smile,
  Calendar,
  BedDouble,
  Folder,
} from "lucide-react";

const defaultHabits = [
  { text: "Ritual base: cama, agua, respirar", iconName: "BedDouble" },
  { text: "Trabajar con Brolsac", iconName: "Folder" },
  { text: "Trabajar con webs", iconName: "Globe" },
  { text: "Aplicar proyectos nuevos", iconName: "CheckCircle" },
  { text: "Practicar inglés (hablar, leer o escribir)", iconName: "BookOpen" },
  { text: "Leer (libro, blog, artículo)", iconName: "BookOpen" },
  { text: "Escribir (diario, ideas, griterío)", iconName: "PenTool" },
  { text: "Disfrutar algo en inglés", iconName: "Music" },
  { text: "Estudiar (curso o avance)", iconName: "Brain" },
  { text: "Ritual de cierre: agradecer, ordenar", iconName: "Smile" },
];

const iconMap = {
  CheckCircle,
  Coffee,
  Heart,
  Brain,
  BookOpen,
  PenTool,
  Globe,
  Music,
  Smile,
  Calendar,
  BedDouble,
  Folder,
};

function getIcon(iconName, done) {
  const IconComponent = iconMap[iconName] || CheckCircle;
  const colorClass = done ? "text-[#5a4a3b]" : "text-[#e5c07b]";
  const glowClass = done
    ? "" 
    : "filter drop-shadow-[0_0_6px_rgba(229,192,123,0.8)] animate-pulse";
  return (
    <IconComponent
      size={20}
      className={`mr-2 ${colorClass} ${glowClass}`}
    />
  );
}

const motivationQuotes = [
  "Cada paso cuenta, incluso los invisibles.",
  "Hoy es un buen día para brillar sin permiso.",
  "Tu magia está en lo que haces cada día.",
  "Los rituales crean tu realidad.",
  "Respira, fluye y avanza.",
];

export default function App() {
  const [habits, setHabits] = useState([]);
  const [quote, setQuote] = useState("");
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("myNotes") || "[]");
    } catch {
      return [];
    }
  });
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myDailyHabits") || "[]");
    if (Array.isArray(stored) && stored.length === defaultHabits.length) {
      setHabits(stored.map((h) => ({ ...h, done: !!h.done })));
    } else {
      setHabits(defaultHabits.map((h) => ({ ...h, done: false })));
    }
    const pool = [...motivationQuotes, ...notes];
    if (pool.length) setQuote(pool[Math.floor(Math.random() * pool.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem("myDailyHabits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("myNotes", JSON.stringify(notes));
    const pool = [...motivationQuotes, ...notes];
    setQuote(pool[Math.floor(Math.random() * pool.length)]);
  }, [notes]);

  const toggleHabit = (idx) =>
    setHabits(habits.map((h, i) => (i === idx ? { ...h, done: !h.done } : h)));
  const resetHabits = () => setHabits(habits.map((h) => ({ ...h, done: false })));
  const addNote = () => {
    const t = noteInput.trim();
    if (!t) return;
    setNotes((prev) => [...prev, t]);
    setNoteInput("");
  };

  const completed = habits.filter((h) => h.done).length;
  const total = habits.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <main className="min-h-screen px-6 py-8 bg-gradient-to-br from-[#0d0221] via-[#1b0424] to-[#12081c] text-[#e5c07b] font-sans flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <header className="mb-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif mb-1 text-[#e5c07b] drop-shadow-lg animate-pulse">
              🌙 Mis Rituales Diarios
            </h1>
            <p className="italic text-[#c1a66b] text-base sm:text-lg animate-fade-in">
              ✨ {quote}
            </p>
          </header>

          <div className="mb-6">
            <p className="text-sm font-medium mb-1 text-[#c1a66b]">
              Rituales completados: {completed} de {total}
            </p>
            <div className="w-full h-2 bg-[#331a3a] rounded-full overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-2 bg-[#e5c07b] transition-all duration-500"
              />
            </div>
          </div>

          <ul className="space-y-3">
            {habits.map((h, i) => (
              <li
                key={i}
                className="flex items-center p-3 bg-[#1b0424] bg-opacity-70 rounded-2xl shadow-md hover:shadow-lg transition backdrop-blur-sm border border-[#331a3a] hover:scale-[1.02] transform"
              >
                <input
                  type="checkbox"
                  checked={h.done}
                  onChange={() => toggleHabit(i)}
                  className="mr-3 w-5 h-5 accent-[#e5c07b] hover:accent-[#d4b56d] transition"
                />
                {getIcon(h.iconName, h.done)}
                <span
                  className={
                    h.done
                      ? "line-through opacity-50 text-[#5a4a3b]"
                      : "text-base font-medium text-[#e5c07b] animate-pulse"
                  }
                >
                  {h.text}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={resetHabits}
            className="mt-6 w-full bg-gradient-to-r from-[#e5c07b] to-[#d4b56d] text-[#12081c] font-bold py-2.5 rounded-2xl shadow-[0_0_8px_rgba(229,192,123,0.8)] hover:shadow-[0_0_12px_rgba(229,192,123,1)] transform hover:scale-105 transition"
          >
            Reiniciar el día ✨
          </button>
        </div>

        <aside className="md:sticky md:top-12 self-start bg-[#1b0424] bg-opacity-60 p-4 rounded-2xl shadow-md border border-[#331a3a]">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#e5c07b] mb-3 font-serif drop-shadow-md animate-pulse">
            📖 Mi primer griterío
          </h2>
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Escribe algo que quieras gritar, soltar, o recordar..."
            className="w-full p-2.5 bg-[#12081c] bg-opacity-70 border border-[#e5c07b] rounded-lg text-[#e5c07b] placeholder-[#c1a66b] focus:outline-none focus:ring-2 focus:ring-[#e5c07b] text-sm font-mono transition hover:shadow-[0_0_6px_rgba(229,192,123,0.8)]"
            rows={4}
          />
          <button
            onClick={addNote}
            className="mt-3 w-full bg-gradient-to-r from-[#e5c07b] to-[#d4b56d] text-[#12081c] py-1.5 rounded-lg font-semibold shadow-[0_0_6px_rgba(229,192,123,0.8)] hover:shadow-[0_0_10px_rgba(229,192,123,1)] hover:scale-105 transform transition"
          >
            Guardar frase
          </button>
        </aside>
      </div>
    </main>
  );
}
