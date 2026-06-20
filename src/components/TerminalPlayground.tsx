import React, { useState, useRef, useEffect } from "react";
import { Terminal, Command, BookOpen, Trash2, ShieldAlert } from "lucide-react";
import { portfolioData } from "../data";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "ascii" | "success";
}

export default function TerminalPlayground() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "   ______ _____  _   _ _____ _   _     ___ ", type: "ascii" },
    { text: "  |  ____|  __ \\| \\ | |_   _| | | |   /   \\", type: "ascii" },
    { text: "  | |__  | |  | |  \\| | | | | |_| |  /  _  \\", type: "ascii" },
    { text: "  |  __| | |  | | . ` | | | |  _  |  | |_| |", type: "ascii" },
    { text: "  | |____| |__| | |\\  |_| |_| | | |  \\  _  /", type: "ascii" },
    { text: "  |______|_____/|_| \\_|_____|_| |_|   \\/ \\/ ", type: "ascii" },
    { text: "", type: "output" },
    { text: `Welcome to Andika Marvelino's Systems Shell (v4.19-LTS)`, type: "success" },
    { text: "Type 'help' to view all custom administrative terminal operations, or click the query badges below.", type: "output" },
    { text: "", type: "output" }
  ]);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  const commandBadges = [
    { cmd: "help", label: "📋 Help Info" },
    { cmd: "neofetch", label: "📟 Sysinfo" },
    { cmd: "profil", label: "👤 Profile Summary" },
    { cmd: "skills", label: "📊 Tech Matrix" },
    { cmd: "projects", label: "📂 Lab Projects" },
    { cmd: "cert", label: "🥇 Certifications" },
    { cmd: "clear", label: "🧹 Clean Screen" }
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let responseLines: TerminalLine[] = [
      { text: `andika@marvelino-node:~$ ${cmdStr}`, type: "input" }
    ];

    switch (trimmed) {
      case "help":
        responseLines.push(
          { text: "Available System Administration Commands:", type: "success" },
          { text: "  profil     - Display personal background, SMK training & goals.", type: "output" },
          { text: "  skills     - View server administration & routing skill bars.", type: "output" },
          { text: "  projects   - Print 5 completed labs, AWS cloud, & monitoring projects.", type: "output" },
          { text: "  cert       - Inspect active Cisco Certificates & Aguna credentials.", type: "output" },
          { text: "  neofetch   - Display beautiful host computer details and metadata.", type: "output" },
          { text: "  contact    - Print personal phone, email, location & socials.", type: "output" },
          { text: "  clear      - Purge current dashboard console logging parameters.", type: "output" }
        );
        break;

      case "profil":
        responseLines.push(
          { text: `--- ${portfolioData.profile.name} ---`, type: "success" },
          { text: portfolioData.profile.role, type: "output" },
          { text: `Siswa di ${portfolioData.education.school} (${portfolioData.education.period})`, type: "output" },
          { text: portfolioData.profile.aboutText, type: "output" }
        );
        break;

      case "skills":
        responseLines.push(
          { text: "--- TECHNICAL COMPETENCY MATRIX ---", type: "success" }
        );
        portfolioData.skills.forEach(skill => {
          const barLength = Math.round(skill.level / 10);
          const bar = "█".repeat(barLength) + "░".repeat(10 - barLength);
          responseLines.push({
            text: `  ${skill.name.padEnd(35)} [${bar}] ${skill.level}%`,
            type: "output"
          });
        });
        break;

      case "projects":
        responseLines.push(
          { text: "--- DETECTED DEPLOYMENT LABS ---", type: "success" }
        );
        portfolioData.projects.forEach(p => {
          responseLines.push(
            { text: `[Lab-${p.id}] ${p.title} (${p.category})`, type: "success" },
            { text: `      Tech Matrix: ${p.tech.join(" | ")}`, type: "output" },
            { text: `      Insight:     ${p.description}`, type: "output" }
          );
        });
        break;

      case "cert":
        responseLines.push(
          { text: "--- CERTIFICATION CREDENTIALS ---", type: "success" }
        );
        portfolioData.certifications.forEach(c => {
          responseLines.push({
            text: `🎓 [${c.provider}] ${c.title} -> Skills: ${c.skillsCovered.join(", ")}`,
            type: "output"
          });
        });
        break;

      case " neofetch":
      case "neofetch":
        responseLines.push(
          { text: "           .,-:;//;:=,         andika@marvelino-node", type: "success" },
          { text: "       . :H@@@MM@M#H/.,+-      ---------------------", type: "success" },
          { text: "     +X@@MM@@@MS++-   .        OS: Custom Linux Mint v21.2 (Wilma)", type: "output" },
          { text: "   /E@@MM@@@MS             .   Host: SMK Wikrama Lab Gateway PC", type: "output" },
          { text: "  /M@@MM@@@MS                  Kernel: 5.15.0-88-generic x86_64", type: "output" },
          { text: "  H@@M@@M#H/                   Uptime: 2 days, 14 hours", type: "output" },
          { text: "  H@@M@@M#H/                   Resolution: Fluid 1920x1080 Interactive", type: "output" },
          { text: "  /M@@MM@@@MS                  Shell: andika-ssh-playground v4.19", type: "output" },
          { text: "   /E@@MM@@@MS             .   CPU: Intel Core i5-11400 (12) @ 4.4GHz", type: "output" },
          { text: "     +X@@MM@@@MS++-   .        GPU: Intel CometLake-S GT2", type: "output" },
          { text: "       . :H@@@MM@M#H/.,+-      Memory: 8192MiB / 16384MiB (Active Lab)", type: "output" },
          { text: "           .,-:;//;:=,         IP Gateway: 192.168.1.1 (NAT-Active)", type: "output" }
        );
        break;

      case "contact":
        responseLines.push(
          { text: "--- COMMUNICATIONS SECURE LINK ---", type: "success" },
          { text: `  Email:    ${portfolioData.profile.email}`, type: "output" },
          { text: `  Telegram: t.me/andikamarvelino`, type: "output" },
          { text: `  Phone:    ${portfolioData.profile.phone}`, type: "output" },
          { text: `  LinkedIn: ${portfolioData.profile.linkedin}`, type: "output" },
          { text: `  Location: ${portfolioData.profile.address}`, type: "output" }
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        responseLines.push({
          text: `Command not found: '${cmdStr}'. Type 'help' to show all diagnostic tasks.`,
          type: "error"
        });
    }

    setHistory(prev => [...prev, ...responseLines, { text: "", type: "output" }]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-none overflow-hidden shadow-xl flex flex-col h-[480px]">
      {/* Terminal Title Bar */}
      <div className="bg-black/40 px-4 py-4 flex items-center justify-between border-b border-white/10 flex-none select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/80 inline-block" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 ml-2 flex items-center gap-1">
            <Terminal className="h-3 w-3 text-emerald-400" />
            ANDIKA-SYSTEM-CONSOLE ~ bash
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/40 font-mono uppercase tracking-widest">
          <span className="hidden sm:inline">SECURE SHELL ACTIVE</span>
          <Command className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* Suggestion Quick Badges */}
      <div className="p-3 bg-black/20 border-b border-white/10 flex flex-wrap items-center gap-2 flex-none select-none">
        <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider flex items-center gap-1 font-bold">
          <BookOpen className="h-3 w-3" /> Quick Command:
        </span>
        {commandBadges.map((badge, i) => (
          <button
            key={i}
            onClick={() => handleCommand(badge.cmd)}
            className="px-3 py-1 font-mono text-xs rounded-none bg-white/[0.02] border border-white/10 hover:border-emerald-500 text-slate-300 hover:text-white transition"
          >
            {badge.label}
          </button>
        ))}
      </div>

      {/* Terminal Lines Content Area */}
      <div 
        ref={terminalRef} 
        className="flex-1 p-5 overflow-y-auto font-mono text-xs text-slate-300 space-y-1.5 custom-scroll select-text bg-black/60 selection:bg-emerald-500 selection:text-black"
      >
        {history.map((line, index) => {
          let color = "text-slate-300 font-light";
          if (line.type === "input") color = "text-white font-semibold";
          else if (line.type === "error") color = "text-red-400 font-semibold";
          else if (line.type === "ascii") color = "text-emerald-500 font-bold leading-none whitespace-pre opacity-90";
          else if (line.type === "success") color = "text-emerald-400 font-bold";

          return (
            <div key={index} className={`break-words tracking-wide leading-relaxed ${color}`}>
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Interactive Command Input Box */}
      <div className="p-4 bg-black border-t border-white/10 flex items-center gap-2 flex-none">
        <span className="text-emerald-400 font-mono text-xs select-none font-bold">andika@marvelino-node:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type command (e.g. help, skills, neofetch)..."
          className="flex-1 bg-transparent font-mono text-xs text-white focus:outline-none placeholder-slate-600 border-none outline-none p-0"
        />
        <button
          onClick={() => handleCommand(input)}
          className="px-4 py-1.5 font-mono text-xs bg-white text-black font-bold hover:bg-emerald-500 hover:text-black transition"
        >
          SEND
        </button>
        <button
          onClick={() => { setHistory([]); }}
          title="Clear logs"
          className="p-1.5 text-slate-500 hover:text-red-500 transition"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
