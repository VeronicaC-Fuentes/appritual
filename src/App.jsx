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
  { text: "🌅 Ritual base: cama, agua, respirar", iconName: "BedDouble" },
  { text: "💼 Trabajar con Brolsac", iconName: "Folder" },
  { text: "💻 Trabajar con webs", iconName: "Globe" },
  { text: "🚀 Aplicar proyectos nuevos", iconName: "CheckCircle" },
  { text: "🗣️ Practicar inglés (hablar, leer o escribir)", iconName: "BookOpen" },
  { text: "📚 Leer (libro, blog, artículo)", iconName: "BookOpen" },
  { text: "📝 Escribir (diario, ideas, griterío)", iconName: "PenTool" },
  { text: "🎧 Disfrutar algo en inglés", iconName: "Music" },
  { text: "🎓 Estudiar (curso o avance)", iconName: "Brain" },
  { text: "🌙 Ritual de cierre: agradecer, ordenar", iconName: "Smile" },
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
      setHabits(stored.map(h => ({ ...h, done: !!h.done })));
    } else {
      setHabits(defaultHabits.map(h => ({ ...h, done: false })));
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

  const toggleHabit = idx =>
    setHabits(habits.map((h, i) => (i === idx ? { ...h, done: !h.done } : h)));
  const resetHabits = () =>
    setHabits(habits.map(h => ({ ...h, done: false })));
  const addNote = () => {
    const t = noteInput.trim();
    if (!t) return;
    setNotes(prev => [...prev, t]);
    setNoteInput("");
  };

  const completed = habits.filter(h => h.done).length;
  const total = habits.length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <main className="
      min-h-screen 
      bg-gradient-to-br from-[#0d0221] via-[#1b0424] to-[#12081c] 
      text-[#e5c07b] font-sans flex flex-col items-center
      px-4 py-6       /* móvil */
      md:px-6 md:py-8 /* desktop original */
    ">
      <div className="
        w-full 
        max-w-md        /* móvil */
        md:max-w-6xl    /* desktop original */
        grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6
      ">
        {/* --- Contenido principal --- */}
        <div className="md:col-span-2">
          <header className="mb-6 text-center">
            <h1 className="
              font-extrabold font-serif mb-1 text-[#e5c07b] drop-shadow-lg
              text-3xl      /* móvil */
              sm:text-4xl   /* tablets */
              md:text-5xl  /* desktop original */
            ">
              🌙 Mis Rituales Diarios
            </h1>
            <p className="
              italic text-[#c1a66b]
              text-sm       /* móvil */
              sm:text-base  /* tablets */
              md:text-lg    /* desktop */
            ">
              ✨ {quote}
            </p>
          </header>

          <div className="mb-6">
            <p className="
              font-medium mb-1 text-[#c1a66b]
              text-xs       /* móvil */
              sm:text-sm    /* tablets */
              md:text-base  /* desktop */
            ">
              Rituales completados: {completed} de {total}
            </p>
            <div className="w-full rounded-full overflow-hidden bg-[#331a3a] h-1.5 md:h-2">
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-[#e5c07b] transition-all duration-500"
              />
            </div>
          </div>

          <ul className="space-y-2 md:space-y-3">
            {habits.map((h, i) => (
              <li
                key={i}
                className="
                  flex items-center 
                  bg-[#1b0424] bg-opacity-70 
                  rounded-2xl 
                  shadow-md hover:shadow-lg 
                  transition 
                  backdrop-blur-sm 
                  border border-[#331a3a]
                  p-2       /* móvil */
                  md:p-3    /* desktop */
                "
              >
                <input
                  type="checkbox"
                  checked={h.done}
                  onChange={() => toggleHabit(i)}
                  className="
                    accent-[#e5c07b] transition
                    w-4 h-4 /* móvil */
                    md:w-5 md:h-5 /* desktop */
                    mr-2 md:mr-3
                  "
                />
                {getIcon(h.iconName, h.done)}
                <span className={h.done 
                  ? "line-through opacity-50 text-[#5a4a3b] text-sm md:text-base"
                  : "text-[#e5c07b] font-medium text-sm md:text-base animate-pulse"
                }>
                  {h.text}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={resetHabits}
            className="
              mt-4 md:mt-6 
              w-full 
              bg-gradient-to-r from-[#e5c07b] to-[#d4b56d] 
              text-[#12081c] font-bold 
              rounded-2xl 
              shadow-[0_0_8px_rgba(229,192,123,0.8)] 
              hover:shadow-[0_0_12px_rgba(229,192,123,1)] 
              transition 
              py-2    /* móvil */
              md:py-2.5 /* desktop */
            "
          >
            Reiniciar el día ✨
          </button>
        </div>

        {/* --- Aside --- */}
        <aside className="
          bg-[#1b0424] bg-opacity-60 
          rounded-2xl 
          shadow-md 
          border border-[#331a3a]
          p-3      /* móvil */
          md:p-4   /* desktop */
          mt-6 md:mt-0 
          self-start md:sticky md:top-12
        ">
          <h2 className="
            font-extrabold font-serif mb-2 text-[#e5c07b]
            text-lg     /* móvil */
            sm:text-xl  /* tablets */
            md:text-2xl /* desktop */
          ">
            📖 Mi primer griterío
          </h2>
          <textarea
            value={noteInput}
            onChange={e => setNoteInput(e.target.value)}
            placeholder="Escribe algo que quieras gritar, soltar, o recordar..."
            className="
              w-full 
              bg-[#12081c] bg-opacity-70 
              border border-[#e5c07b] 
              rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#e5c07b]
              placeholder-[#c1a66b]
              text-xs    /* móvil */
              sm:text-sm /* tablets */
              md:text-sm
              font-mono
              p-2      /* móvil */
              md:p-2.5 /* desktop */
            "
            rows={3}
          />
          <button
            onClick={addNote}
            className="
              mt-3 
              w-full 
              bg-gradient-to-r from-[#e5c07b] to-[#d4b56d] 
              text-[#12081c] 
              font-semibold 
              rounded-lg 
              shadow-[0_0_6px_rgba(229,192,123,0.8)] 
              hover:shadow-[0_0_10px_rgba(229,192,123,1)] 
              transition 
              py-1.5   /* móvil */
              md:py-1.5 /* desktop */
            "
          >
            Guardar frase
          </button>
        </aside>
      </div>
    </main>
  );
}
