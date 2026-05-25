import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, VolumeX, Sliders, ChevronRight, Play, Sparkles, 
  Heart, Compass, ArrowRight, Check, Eye
} from 'lucide-react';
import { sound } from '@/lib/sound';
import { CinematicCanvas } from '@/components/layout/CinematicCanvas';
import { chapters, Chapter } from '@/config/chapters';

export default function Home() {
  // Experience lifecycle state
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  
  // Chapter & Narration state
  const [chapterIdx, setChapterIdx] = useState<number>(0);
  const [verseIdx, setVerseIdx] = useState<number>(0);
  const [showInteraction, setShowInteraction] = useState<boolean>(false);
  
  // Interactive Controls
  const [resonance, setResonance] = useState<number>(30);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [isTimeDilated, setIsTimeDilated] = useState<boolean>(false);
  const [palette, setPalette] = useState<'original' | 'sunset' | 'aurora' | 'eclipse'>('original');
  const [signature, setSignature] = useState<string>('');
  const [submittedSignature, setSubmittedSignature] = useState<boolean>(false);
  
  // UI Panels state
  const [isDirectorOpen, setIsDirectorOpen] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);

  const activeChapter: Chapter = chapters[chapterIdx];

  // Sync volume state with sound manager
  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  // Start the journey (unlock audio context)
  const handleEnter = () => {
    sound.init();
    sound.setMute(false);
    setIsMuted(false);
    setHasEntered(true);
  };

  // Proceed to next verse of the narrative
  const handleNextVerse = () => {
    if (verseIdx < activeChapter.narration.length - 1) {
      setVerseIdx(prev => prev + 1);
      // Play soft chime response
      sound.playChime(verseIdx + 1);
    } else {
      setShowInteraction(true);
    }
  };

  // Change chapter index
  const handleSelectChapter = (idx: number) => {
    setChapterIdx(idx);
    setVerseIdx(0);
    setShowInteraction(false);
    setSubmittedSignature(false);
    if (idx === 3) {
      setResonance(30); // reset resonance for chapter 3 task
    }
  };

  // Render narrative verses text dynamically
  const renderVerses = () => {
    return (
      <div className="flex flex-col space-y-4 max-w-2xl px-4 text-center">
        <span className="text-rose-500/80 font-semibold tracking-widest text-xs uppercase mb-1 font-outfit">
          {activeChapter.subtitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 font-outfit drop-shadow-md">
          {activeChapter.title}
        </h2>
        
        <div className="min-h-[120px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${chapterIdx}-${verseIdx}`}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="text-lg md:text-2xl text-slate-200/90 leading-relaxed font-light font-sans tracking-wide drop-shadow"
            >
              "{activeChapter.narration[verseIdx]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Verse progress controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <div className="flex gap-1.5 mr-4">
            {activeChapter.narration.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === verseIdx ? 'bg-rose-500 w-4' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNextVerse}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-sm font-semibold tracking-wider text-white backdrop-blur-md"
          >
            {verseIdx < activeChapter.narration.length - 1 ? (
              <>
                <span>Continue</span>
                <ChevronRight size={16} />
              </>
            ) : (
              <>
                <span>Interact</span>
                <Sparkles size={14} className="text-rose-400" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Render chapter interaction task overlay
  const renderInteraction = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center shadow-2xl backdrop-blur-2xl mx-4 select-none relative overflow-hidden"
      >
        {/* Glow ambient circle */}
        <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-rose-500/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl pointer-events-none" />

        <h3 className="text-xl font-bold font-outfit mb-2 text-white">
          {activeChapter.title}
        </h3>
        <p className="text-sm text-slate-300 font-sans font-light mb-6">
          {activeChapter.description}
        </p>

        {/* Dynamic controls based on interactiveType */}
        <div className="w-full mb-6 py-4 flex flex-col items-center">
          {activeChapter.interactiveType === 'explore' && (
            <div className="flex flex-col items-center animate-pulse text-xs text-rose-300 tracking-wide font-light gap-2">
              <Compass className="animate-spin text-rose-500" style={{ animationDuration: '6s' }} size={24} />
              <span>{activeChapter.interactiveLabel}</span>
            </div>
          )}

          {activeChapter.interactiveType === 'time' && (
            <div className="flex flex-col items-center w-full gap-4">
              <button
                onMouseDown={() => setIsTimeDilated(true)}
                onMouseUp={() => setIsTimeDilated(false)}
                onMouseLeave={() => setIsTimeDilated(false)}
                onTouchStart={() => setIsTimeDilated(true)}
                onTouchEnd={() => setIsTimeDilated(false)}
                className={`w-28 h-28 rounded-full border border-white/20 flex flex-col items-center justify-center gap-1 cursor-pointer select-none transition-all duration-300 relative ${
                  isTimeDilated 
                    ? 'bg-rose-500/20 border-rose-500/50 scale-95 shadow-lg shadow-rose-500/20' 
                    : 'bg-white/5 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-500 ${isTimeDilated ? 'scale-150 bg-rose-400 animate-ping' : ''}`} />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 mt-2">
                  {isTimeDilated ? "Slowing..." : "HOLD"}
                </span>
              </button>
              <span className="text-xs text-slate-400 font-light italic">
                {activeChapter.interactiveLabel}
              </span>
            </div>
          )}

          {activeChapter.interactiveType === 'resonance' && (
            <div className="w-full flex flex-col items-center">
              <div className="flex justify-between w-full text-xs text-slate-400 mb-2 font-mono">
                <span>Separate</span>
                <span className={resonance > 90 ? "text-purple-400 font-bold animate-pulse" : ""}>
                  Resonance: {resonance}%
                </span>
                <span>Converged</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={resonance}
                onChange={(e) => setResonance(Number(e.target.value))}
                className="w-full accent-rose-500 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-300 font-light">
                <Heart className={`text-rose-500 ${resonance > 95 ? 'animate-bounce' : resonance > 50 ? 'animate-pulse' : ''}`} size={16} />
                <span>{activeChapter.interactiveLabel}</span>
              </div>
            </div>
          )}

          {activeChapter.interactiveType === 'constellation' && (
            <div className="w-full flex flex-col items-center gap-3">
              {!submittedSignature ? (
                <div className="w-full flex flex-col gap-2">
                  <input
                    type="text"
                    maxLength={15}
                    placeholder="Enter your initials (e.g. L + M)"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 px-4 py-2 rounded-xl text-center text-sm font-semibold tracking-wide text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/50 transition-colors"
                  />
                  <button
                    disabled={!signature.trim()}
                    onClick={() => setSubmittedSignature(true)}
                    className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:hover:bg-rose-600 text-white rounded-xl py-2 text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    Cast into Stars
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-300 font-outfit uppercase tracking-widest">
                    Signature Written: "{signature}"
                  </span>
                  <span className="text-[10px] text-slate-500 font-light italic">
                    {activeChapter.interactiveLabel}
                  </span>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Next Chapter Button */}
        {chapterIdx < chapters.length - 1 && (
          <button 
            disabled={activeChapter.interactiveType === 'resonance' && resonance < 90}
            onClick={() => handleSelectChapter(chapterIdx + 1)}
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs uppercase font-bold tracking-widest transition-all duration-300 ${
              activeChapter.interactiveType === 'resonance' && resonance < 90
                ? 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                : 'bg-white text-black hover:bg-slate-200 active:scale-98 shadow-md'
            }`}
          >
            <span>Proceed to Next Chapter</span>
            <ArrowRight size={14} />
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-screen bg-[#07070d] text-slate-100 overflow-hidden font-sans select-none">
      
      {/* ── Atmospheric Particle Canvas ── */}
      <CinematicCanvas
        chapter={chapterIdx}
        resonance={resonance}
        speedMultiplier={speedMultiplier}
        isTimeDilated={isTimeDilated}
        palette={palette}
      />

      {/* ── Immersive Cinematic Gradients & Shadows ── */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07070d]/20 to-[#07070d]/80 pointer-events-none z-10" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#07070d]/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#07070d]/90 to-transparent pointer-events-none z-10" />

      {/* ── Floating Interactive HUD Header ── */}
      <header className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
          <span className="font-outfit font-extrabold tracking-widest text-sm text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400">
            LOVESTORY
          </span>
          <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase ml-2 hidden sm:inline">
            A Cinematic Digital Journey
          </span>
        </div>

        {/* Audio Mute & Director toggles */}
        <div className="flex items-center gap-2">
          {hasEntered && (
            <>
              <button
                onClick={handleToggleMute}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 active:scale-95 transition-all"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX size={16} className="text-rose-400" /> : <Volume2 size={16} className="text-cyan-400" />}
              </button>
              
              <button
                onClick={() => setIsDirectorOpen(!isDirectorOpen)}
                className={`p-2 rounded-full border active:scale-95 transition-all ${
                  isDirectorOpen 
                    ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-500/20' 
                    : 'bg-white/5 hover:bg-white/15 border-white/10 text-white'
                }`}
                title="Director Controls"
              >
                <Sliders size={16} />
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── Main Narrative Stage ── */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pt-16 pb-24">
        {hasEntered ? (
          <div className="w-full flex justify-center">
            {!showInteraction ? renderVerses() : renderInteraction()}
          </div>
        ) : (
          /* ── Intro Curtain / Welcome screen ── */
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center max-w-xl px-6 relative"
          >
            {/* Visual ambient stardust flare */}
            <div className="absolute w-64 h-64 rounded-full bg-rose-500/5 blur-3xl -top-24 pointer-events-none" />
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-outfit text-white mb-6 drop-shadow-md">
              LOVESTORY
            </h1>
            <p className="text-sm md:text-base font-light text-slate-300 leading-relaxed font-sans mb-8 tracking-wide">
              An immersive interactive digital experience representing the convergence of two isolated souls in an infinite universe. 
              <span className="block mt-2 text-rose-400/80 text-xs tracking-wider uppercase font-semibold">
                Atmospheric audio synth & physics engine simulation
              </span>
            </p>
            
            <button
              onClick={handleEnter}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold tracking-widest text-xs uppercase shadow-xl hover:shadow-2xl shadow-rose-500/10 active:scale-95 transition-all border border-white/10 group"
            >
              <Play size={14} className="fill-white" />
              <span>Begin Experience</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* ── Signature Floating Watermark (Chapter 4) ── */}
      {hasEntered && submittedSignature && signature && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          className="absolute bottom-20 left-6 z-20 pointer-events-none flex flex-col font-mono"
        >
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Constellation Node</span>
          <span className="text-sm font-semibold text-rose-300 tracking-wide font-outfit uppercase">"{signature}"</span>
        </motion.div>
      )}

      {/* ── Timeline Navigator (Progress Dots) ── */}
      {hasEntered && (
        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center gap-2 z-20">
          <div className="flex items-center gap-4 px-4 py-2.5 rounded-full bg-[#07070d]/40 border border-white/5 backdrop-blur-lg">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(idx)}
                className="group relative p-1.5 focus:outline-none"
              >
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  idx === chapterIdx
                    ? 'bg-rose-500 scale-125 shadow-lg shadow-rose-500/50'
                    : 'bg-white/20 hover:bg-white/40'
                }`} />
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 border border-white/10 rounded text-[9px] uppercase tracking-widest text-slate-200 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap font-mono">
                  {ch.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── COLLAPSIBLE FILM DIRECTOR DRAWER ── */}
      <AnimatePresence>
        {isDirectorOpen && (
          <motion.div
            initial={{ y: 280 }}
            animate={{ y: 0 }}
            exit={{ y: 280 }}
            transition={{ type: 'spring', damping: 20 }}
            className="absolute bottom-0 inset-x-0 h-72 bg-[#090910]/95 border-t border-white/10 backdrop-blur-2xl z-30 p-6 flex flex-col select-none"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sliders className="text-rose-500" size={16} />
                <span className="font-outfit font-extrabold text-sm uppercase tracking-widest text-white">
                  FILM DIRECTOR CONTROL BOARD
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest ml-2">
                  v4.0 engine
                </span>
              </div>
              <button 
                onClick={() => setIsDirectorOpen(false)}
                className="text-xs text-slate-400 hover:text-white uppercase font-bold tracking-widest border border-white/10 px-3 py-1 rounded-full bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-start">
              {/* 1. Physics Speed Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-slate-300 font-mono">
                  <span>Particle Velocity</span>
                  <span>{speedMultiplier.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                  className="w-full accent-rose-500 bg-white/10 h-1 rounded-lg appearance-none cursor-pointer focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 leading-normal font-light">
                  Alters the speed of Leo & Maya's orbit, reflecting the kinetic tension of the narration scene.
                </p>
              </div>

              {/* 2. Film Color Palette Select */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-300 font-mono">Film Filter / Palette</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'original', name: 'Standard (Rose/Cyan)' },
                    { id: 'sunset', name: 'Sunset (Gold/Pink)' },
                    { id: 'aurora', name: 'Aurora (Emerald/Purple)' },
                    { id: 'eclipse', name: 'Eclipse (Gold/Blue)' }
                  ].map(pal => (
                    <button
                      key={pal.id}
                      onClick={() => setPalette(pal.id as any)}
                      className={`text-[10px] py-2 px-3 rounded-lg border font-medium text-left transition-all ${
                        palette === pal.id 
                          ? 'bg-rose-500/10 border-rose-500/50 text-rose-300' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pal.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Audio Synth Visualizer */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-slate-300 font-mono">Ambient Audio Waveform</span>
                <div className="w-full h-14 bg-black/35 rounded-lg border border-white/5 flex items-center justify-center p-2 relative overflow-hidden">
                  <div className="flex items-end gap-[3px] w-full h-full justify-center">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const seed = Math.sin(i * 0.5 + Date.now() * 0.05);
                      // Calculate height based on resonance and random hum
                      const randHeight = (seed + 1.2) * 15 * (isMuted ? 0.08 : 1) + 2;
                      return (
                        <div 
                          key={i} 
                          className={`w-[3px] rounded-full transition-all duration-300 ${
                            isMuted ? 'bg-slate-700' : 'bg-gradient-to-t from-rose-500 to-cyan-400'
                          }`}
                          style={{ 
                            height: `${randHeight}px`,
                            animation: isMuted ? 'none' : `soundWaveAnimation 1.5s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.04}s`
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal font-light">
                  Web Audio synthesis engine reflecting atmospheric hum. Click space/chimes to inject frequencies.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* soundWave animation definitions */}
      <style>{`
        @keyframes soundWaveAnimation {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.75); }
        }
      `}</style>
    </div>
  );
}