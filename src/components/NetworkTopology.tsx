import React, { useState, useEffect } from "react";
import { 
  Globe, Shield, Cpu, Server, Laptop, Play, Terminal, 
  CheckCircle2, AlertTriangle, RefreshCw, Layers, Wifi 
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "internet" | "firewall" | "router" | "server" | "client";
  ip: string;
  status: "Online" | "Offline" | "Filtering" | "Scanning";
  details: string;
  projectLink: number; // associated portfolioData project id
}

export default function NetworkTopology() {
  const [activeNode, setActiveNode] = useState<string>("router");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Network Topology Engine Initialized...",
    "[STATUS] OPNsense firewall actively filtering port scans",
    "[STATUS] MikroTik gateway routing traffic with NAT enabled",
    "Click on any network element to inspect device details and issue terminal diagnostics."
  ]);

  const nodes: Node[] = [
    {
      id: "internet",
      label: "WAN (Internet)",
      type: "internet",
      ip: "182.253.111.45",
      status: "Online",
      details: "Inbound WAN link from ISP. Connected to public web servers and AWS cloud deployments.",
      projectLink: 4,
    },
    {
      id: "firewall",
      label: "OPNsense NG Firewall",
      type: "firewall",
      ip: "192.168.100.1",
      status: "Filtering",
      details: "Running next-generation packet inspection with Zenarmor plugin, blocking brute-force attacks and logging telemetry.",
      projectLink: 5,
    },
    {
      id: "router",
      label: "MikroTik Gateway / Cisco Router",
      type: "router",
      ip: "192.168.1.1",
      status: "Online",
      details: "Core edge router dividing traffic into inter-VLAN segments. Enforcing Queue Simple limits and routing trunks.",
      projectLink: 3,
    },
    {
      id: "server",
      label: "Superlab Ubuntu Server",
      type: "server",
      ip: "192.168.1.250",
      status: "Online",
      details: "Custom Linux VM hosting Apache local site, Bind9 nameserver, and MySQL WordPress databases.",
      projectLink: 2,
    },
    {
      id: "client",
      label: "Lab Client (Windows 10)",
      type: "client",
      ip: "192.168.1.15",
      status: "Online",
      details: "Authorized student workstation for practicing diagnostics, packet traces, and penetration testing.",
      projectLink: 1,
    }
  ];

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-15), msg]);
  };

  const selectedNode = nodes.find(n => n.id === activeNode) || nodes[2];

  const handleRunDiagnostics = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);
    setLogs([]);
    
    // Step 1: Pinging Router
    setTimeout(() => {
      addLog(`[STUNT] CMD: ping -c 3 ${nodes[2].ip}`);
      addLog(`64 bytes from ${nodes[2].ip}: icmp_seq=1 ttl=64 time=1.45 ms`);
      addLog(`64 bytes from ${nodes[2].ip}: icmp_seq=2 ttl=64 time=1.12 ms`);
      addLog(`64 bytes from ${nodes[2].ip}: icmp_seq=3 ttl=64 time=1.28 ms`);
      addLog(`--- ${nodes[2].ip} ping statistics ---`);
      addLog(`3 packets transmitted, 3 received, 0% packet loss, rtt min/avg/max = 1.12/1.28/1.45 ms`);
      setSimStep(2);
    }, 800);

    // Step 2: Querying Firewall (Security check)
    setTimeout(() => {
      addLog(`[STUNT] CMD: nmap -p 22,80,443 ${nodes[1].ip}`);
      addLog(`Scanning target (${nodes[1].ip})...`);
      addLog(`PORT    STATE    SERVICE`);
      addLog(`22/tcp  filtered ssh (Zenarmor enforced)`);
      addLog(`80/tcp  closed   http`);
      addLog(`443/tcp closed   https`);
      addLog(`Nmap scan report: Host is up. Intrusion rules verified protective.`);
      setSimStep(3);
    }, 2400);

    // Step 3: Server DNS lookup and site response
    setTimeout(() => {
      addLog(`[STUNT] CMD: nslookup superlab.internal`);
      addLog(`Server:  192.168.1.250 (Bind9 DNS Server)`);
      addLog(`Address: 192.168.1.250#53`);
      addLog(`Name:    superlab.internal`);
      addLog(`Address: ${nodes[3].ip}`);
      addLog(`[STUNT] CMD: curl -Is http://superlab.internal`);
      addLog(`HTTP/1.1 200 OK (Apache Server - Powered by Ubuntu)`);
      addLog(`X-Powered-By: PHP/8.2`);
      addLog(`[SUCCESS] Diagnostics Completed successfully! All nodes responsive.`);
      setIsSimulating(false);
      setSimStep(4);
    }, 4200);
  };

  return (
    <div className="bg-[#0b0b0b] border border-white/10 rounded-none overflow-hidden shadow-2xl transition hover:border-[#10b981]/30">
      {/* Topology Header */}
      <div className="bg-black/60 border-b border-white/10 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-display font-black text-white uppercase tracking-tight text-sm">
              Lab Network Simulation & Topology Map
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-light">
            Real-time packet router simulator representing Andika&apos;s physical and virtual test setups.
          </p>
        </div>
        <button
          onClick={handleRunDiagnostics}
          disabled={isSimulating}
          className={`flex items-center gap-2 px-5 py-2.5 font-mono uppercase text-xs tracking-wider font-bold transition duration-300 ${
            isSimulating 
              ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 cursor-not-allowed" 
              : "bg-white hover:bg-emerald-500 text-black hover:text-black shadow-lg"
          }`}
        >
          {isSimulating ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Diagnosing...
            </>
          ) : (
            <>
              <Play className="h-3.5 w-3.5" />
              RUN DIAGNOSTICS
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Interactive SVG Diagram Stage (Left Side) */}
        <div className="lg:col-span-7 bg-black/40 p-6 flex flex-col justify-between min-h-[380px] relative">
          
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

          {/* Interactive Topology Nodes Layer */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-2">
            
            {/* Row 1: Internet WAN */}
            <div className="flex justify-center w-full">
              <button
                onClick={() => { setActiveNode("internet"); addLog("[INFO] Selected WAN Link interface. Target: public gateways."); }}
                className={`relative px-5 py-3 rounded-none border transition-all duration-300 flex flex-col items-center justify-center min-w-[140px] ${
                  activeNode === "internet" 
                    ? "bg-[#111111] border-emerald-500 shadow-lg text-white scale-105" 
                    : "bg-black/60 border-white/10 text-slate-400 hover:border-white/25"
                }`}
              >
                <div className={`p-2 rounded-none mb-1.5 ${activeNode === "internet" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.03] text-slate-500"}`}>
                  <Globe className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-medium">WAN (Internet)</span>
                <span className="text-[10px] text-slate-500 mt-0.5 select-all">182.253.111.45</span>
              </button>
            </div>

            {/* Connecting line SVG Overlay */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full text-[#1c1c1c] stroke-current opacity-60" fill="none" strokeWidth="2">
                {/* WAN to Firewall */}
                <line x1="50%" y1="12%" x2="50%" y2="28%" strokeDasharray={activeNode === "internet" ? "4" : "0"} className={isSimulating ? "stroke-emerald-500 animate-[dash_2s_linear_infinite]" : ""} />
                {/* Firewall to Router */}
                <line x1="50%" y1="40%" x2="50%" y2="52%" strokeDasharray={activeNode === "firewall" ? "4" : "0"} className={isSimulating ? "stroke-emerald-500 animate-[dash_2s_linear_infinite]" : ""} />
                {/* Router to Server (Left) */}
                <path d="M 50% 64% L 30% 64% L 30% 82%" strokeDasharray={activeNode === "router" ? "4" : "0"} className={isSimulating ? "stroke-emerald-500 animate-[dash_1.5s_linear_infinite]" : ""} />
                {/* Router to Client (Right) */}
                <path d="M 50% 64% L 70% 64% L 70% 82%" strokeDasharray={simStep >= 2 ? "4" : "0"} className={isSimulating ? "stroke-emerald-400 animate-[dash_1.5s_linear_infinite]" : ""} />
              </svg>
            </div>

            {/* Row 2: Firewall */}
            <div className="flex justify-center w-full mt-2">
              <button
                onClick={() => { setActiveNode("firewall"); addLog("[INFO] Selected OPNsense Firewall. Active filter policies: WAN <-> LAN."); }}
                className={`relative px-5 py-3 rounded-none border transition-all duration-300 flex flex-col items-center justify-center min-w-[140px] ${
                  activeNode === "firewall" 
                    ? "bg-[#111111] border-red-500 shadow-lg text-white scale-105" 
                    : "bg-black/60 border-white/10 text-slate-400 hover:border-white/25"
                }`}
              >
                <div className={`p-2 rounded-none mb-1.5 ${activeNode === "firewall" ? "bg-red-500/10 text-red-500" : "bg-white/[0.03] text-slate-500"}`}>
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-medium">OPNsense Firewall</span>
                <span className="text-[10px] text-slate-500 mt-0.5">192.168.100.1</span>
                
                {/* Status dot */}
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
              </button>
            </div>

            {/* Row 3: Router */}
            <div className="flex justify-center w-full mt-2">
              <button
                onClick={() => { setActiveNode("router"); addLog("[INFO] Selected MikroTik Core Gateway. Static & dynamic tables active."); }}
                className={`relative px-5 py-3 rounded-none border transition-all duration-300 flex flex-col items-center justify-center min-w-[140px] ${
                  activeNode === "router" 
                    ? "bg-[#111111] border-emerald-500 shadow-lg text-white scale-105" 
                    : "bg-black/60 border-white/10 text-slate-400 hover:border-white/25"
                }`}
              >
                <div className={`p-2 rounded-none mb-1.5 ${activeNode === "router" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.03] text-slate-500"}`}>
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-medium">MikroTik RB / Cisco</span>
                <span className="text-[10px] text-slate-500 mt-0.5">192.168.1.1</span>
              </button>
            </div>

            {/* Row 4: Endpoints */}
            <div className="flex gap-4 sm:gap-16 justify-center w-full mt-2">
              
              {/* Server Node */}
              <button
                onClick={() => { setActiveNode("server"); addLog("[INFO] Selected Linux Superlab server instance. Web/DNS services online."); }}
                className={`relative px-4 py-3 rounded-none border transition-all duration-300 flex flex-col items-center justify-center min-w-[120px] ${
                  activeNode === "server" 
                    ? "bg-[#111111] border-amber-500 shadow-lg text-white scale-105" 
                    : "bg-black/60 border-white/10 text-slate-400 hover:border-white/25"
                }`}
              >
                <div className={`p-2 rounded-none mb-1.5 ${activeNode === "server" ? "bg-amber-500/10 text-amber-500" : "bg-white/[0.03] text-slate-500"}`}>
                  <Server className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-medium">Debian Server</span>
                <span className="text-[10px] text-slate-500 mt-0.5">192.168.1.250</span>
              </button>

              {/* Client Workstation */}
              <button
                onClick={() => { setActiveNode("client"); addLog("[INFO] Selected Client Laptop. Initiating ICMP tests."); }}
                className={`relative px-4 py-3 rounded-none border transition-all duration-300 flex flex-col items-center justify-center min-w-[120px] ${
                  activeNode === "client" 
                    ? "bg-[#111111] border-purple-500 shadow-lg  text-white scale-105" 
                    : "bg-black/60 border-white/10 text-slate-400 hover:border-white/25"
                }`}
              >
                <div className={`p-2 rounded-none mb-1.5 ${activeNode === "client" ? "bg-purple-500/10 text-purple-400" : "bg-white/[0.03] text-slate-500"}`}>
                  <Laptop className="h-5 w-5" />
                </div>
                <span className="text-xs font-mono font-medium">Workstation OS</span>
                <span className="text-[10px] text-slate-500 mt-0.5">192.168.1.15</span>
              </button>

            </div>
          </div>

          <div className="mt-4 text-[10px] text-slate-500 font-mono flex items-center justify-between z-10">
            <span>PACKET PROTOCOL: TCP/IP VLAN-TRUNK</span>
            <span>SIMULATION SPEED: 1.0Gbps</span>
          </div>
        </div>

        {/* Real-time Diagnostics Terminal Log / Device Monitor (Right Side) */}
        <div className="lg:col-span-5 bg-black/30 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col h-full min-h-[380px]">
          
          {/* Active Device Info Panel */}
          <div className="p-5 border-b border-white/10 bg-[#0c0c0c]/90 flex-none">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                Device Monitor
              </span>
              <span className={`px-2.5 py-0.5 text-[9px] font-mono tracking-wider uppercase ${
                selectedNode.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                selectedNode.status === 'Filtering' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {selectedNode.status}
              </span>
            </div>
            <h4 className="font-display font-black text-white text-base mt-2 uppercase tracking-tight">
              {selectedNode.label}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
              <span className="font-mono bg-white/5 border border-white/5 px-2 py-0.5 text-white text-[10px]">
                IP: {selectedNode.ip}
              </span>
              <span>•</span>
              <span>MTU 1500</span>
            </div>
            <p className="text-xs mt-3 leading-relaxed text-slate-400 font-light">
              {selectedNode.details}
            </p>
          </div>

          {/* Interactive Shell / Console Feed */}
          <div className="p-4 flex-1 bg-black font-mono text-xs flex flex-col justify-end text-slate-300 gap-2 overflow-y-auto no-scrollbar select-none">
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between text-slate-650 text-[9px] pb-2 border-b border-white/5 mb-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-3 w-3" />
                <span>DIAGNOSTIC ENGINE v2.1</span>
              </div>
              <span>UTC-8</span>
            </div>

            {/* Displaying logs dynamically */}
            <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[160px] scrollbar-thin">
              {logs.map((log, index) => {
                let colorClass = "text-slate-300";
                if (log.startsWith("[SYSTEM]")) colorClass = "text-emerald-500 font-semibold";
                else if (log.startsWith("[STATUS]")) colorClass = "text-slate-500";
                else if (log.startsWith("[STUNT]")) colorClass = "text-cyan-400 font-semibold";
                else if (log.startsWith("[SUCCESS]")) colorClass = "text-emerald-400 font-bold";
                else if (log.startsWith("[INFO]")) colorClass = "text-amber-400";
                
                return (
                  <div key={index} className={`leading-relaxed break-all ${colorClass}`}>
                    {log}
                  </div>
                );
              })}
            </div>

            {/* Input prompt simulator */}
            <div className="flex items-center gap-1 text-[11px] text-slate-400 border-t border-white/5 pt-2 mt-1">
              <span className="text-emerald-400 font-bold">andika@wikrama-gate:~$</span>
              <span className="bg-emerald-500 h-3.5 w-1.5 animate-[ping_1.5s_infinite]"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
