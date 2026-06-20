import React, { useState } from "react";
import { Award, ArrowLeft, ExternalLink, ShieldCheck, Search, Filter, Calendar, FolderOpen } from "lucide-react";
import { portfolioData, Certification } from "../data";

interface CertificatesViewerProps {
  onBack: () => void;
}

export default function CertificatesViewer({ onBack }: CertificatesViewerProps) {
  const [selectedProvider, setSelectedProvider] = useState<"All" | "Cisco Certified" | "Aguna Course">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const providers: ("All" | "Cisco Certified" | "Aguna Course")[] = ["All", "Cisco Certified", "Aguna Course"];

  const filteredCerts = portfolioData.certifications.filter((cert) => {
    const matchesProvider = selectedProvider === "All" || cert.provider === selectedProvider;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cert.skillsCovered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesProvider && matchesSearch;
  });

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "Cisco Certified":
        return <ShieldCheck className="h-4 w-4 text-emerald-400" />;
      default:
        return <Award className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div id="certificates-viewer" className="min-h-screen py-10 px-6 md:px-12 space-y-12 animate-fade-in select-none">
      
      {/* Top Breadcrumb/Back Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-500 hover:text-white transition duration-300"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition duration-300" />
            <span>[ESC] Back to Labs Core</span>
          </button>
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block">Verification Core</span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
              Verified Certificates Cabinet
            </h1>
          </div>
        </div>

        {/* Big Action drive link button */}
        <a 
          href="https://drive.google.com/drive/folders/1SIRxWOyVPTstPk7donI9wbQGHOe4jQ88?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-emerald-500 text-black px-6 py-3 font-sans font-black uppercase tracking-tight text-xs flex items-center gap-2.5 transition duration-300 self-start sm:self-center shadow-lg"
        >
          <FolderOpen className="h-4 w-4 shrink-0" />
          <span>Akses Google Drive Resmi</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Primary Highlight Google Drive Banner (Highly visual & anti-gimmick) */}
      <div className="bg-[#0c0c0c] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-500/30 transition duration-300">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[#10b981] text-[9px] font-mono uppercase tracking-wider font-extrabold">
            EXTERNAL DATABASE CONNECT
          </div>
          <h3 className="font-display font-black text-white uppercase tracking-tight text-lg">
            Google Drive Certificate Directory
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            Seluruh berkas dokumen cetak fisik, transkrip nilai, bukti kelulusan program Competence Based Training (CBT), serta file verifikasi PDF resolusi tinggi tersimpan secara aman dan publik pada direktori Google Drive Andika.
          </p>
        </div>
        <a 
          href="https://drive.google.com/drive/folders/1SIRxWOyVPTstPk7donI9wbQGHOe4jQ88?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-white/20 hover:border-emerald-500 text-slate-350 hover:text-white px-5 py-3 font-mono uppercase tracking-widest text-xs flex items-center gap-2.5 transition duration-300 w-full md:w-auto justify-center bg-white/[0.01]"
        >
          <span>Open Drive Cabinet</span>
          <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition duration-300" />
        </a>
      </div>

      {/* Explorer Panel with Search & Filter Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          {/* Tabs Filter Provider */}
          <div className="flex flex-wrap items-center gap-2">
            {providers.map((prov, index) => (
              <button 
                key={index}
                onClick={() => setSelectedProvider(prov)}
                className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition duration-300 ${
                  selectedProvider === prov 
                    ? "bg-[#10b981] text-black font-black"
                    : "bg-black/40 border border-white/10 text-slate-450 hover:text-white hover:border-white/20"
                }`}
              >
                {prov === "All" ? "All Credentials" : prov}
              </button>
            ))}
          </div>

          {/* Minimal Search box input */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi / nama sertifikat..."
              className="w-full bg-black border border-white/10 focus:border-emerald-500 rounded-none pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none transition font-sans placeholder-white/30 font-light"
            />
          </div>
        </div>

        {/* Certificates Grid Showcase */}
        {filteredCerts.length === 0 ? (
          <div className="h-48 border border-white/5 bg-[#0a0a0a]/30 flex flex-col items-center justify-center text-center p-6">
            <Award className="h-10 w-10 text-white/25 mb-3 animate-pulse" />
            <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">Tidak ada sertifikat yang cocok dengan pencarian Anda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCerts.map((cert, index) => (
              <div 
                key={index}
                className="bg-[#0c0c0c] border border-white/10 p-6 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between space-y-6 relative group"
              >
                {/* Accent Corner bar */}
                <div className="absolute top-0 right-0 w-8 h-[1px] bg-white/10 group-hover:bg-emerald-500 transition duration-300" />
                <div className="absolute top-0 right-0 w-[1px] h-8 bg-white/10 group-hover:bg-emerald-500 transition duration-300" />

                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-2.5 py-1 border border-emerald-500/10 font-bold flex items-center gap-1.5">
                      {getProviderIcon(cert.provider)}
                      {cert.provider}
                    </span>
                    <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                      ID-REF: 0{index + 1} // SECURE
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-display font-black text-lg text-white group-hover:text-emerald-400 transition tracking-tight uppercase leading-tight">
                    {cert.title}
                  </h4>

                  {/* Skills Covered Tags */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block font-bold">Materi Terakreditasi:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsCovered.map((skill, skIdx) => (
                        <span 
                          key={skIdx}
                          className="px-2.5 py-1 text-[10px] font-mono uppercase bg-black hover:bg-emerald-500/10 border border-white/10 text-slate-300 transition duration-150"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card footer verification line */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span className="flex items-center gap-1.5 text-emerald-500/80 font-semibold tracking-wider uppercase">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    Verified Genuine
                  </span>
                  <a 
                    href="https://drive.google.com/drive/folders/1SIRxWOyVPTstPk7donI9wbQGHOe4jQ88?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-emerald-400 transition flex items-center gap-1 font-bold underline decoration-white/25 hover:decoration-emerald-550"
                  >
                    View File
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Page bottom action */}
      <div className="flex flex-col items-center justify-center pt-8 border-t border-white/10">
        <button 
          onClick={onBack}
          className="border border-white/15 hover:border-emerald-500 text-slate-400 hover:text-white px-8 py-3.5 font-mono uppercase tracking-widest text-xs transition duration-300 bg-white/[0.01]"
        >
          [ESC] Return to System Portfolio
        </button>
      </div>

    </div>
  );
}
