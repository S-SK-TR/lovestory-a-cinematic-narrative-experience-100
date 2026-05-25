class CinematicSound {
  private ctx: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private ambientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public init() {
    if (this.isInitialized) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      this.masterVolume = this.ctx.createGain();
      this.masterVolume.gain.setValueAtTime(0.0, this.ctx.currentTime);
      this.masterVolume.connect(this.ctx.destination);

      this.isInitialized = true;
      this.startAmbientPad();
    } catch (e) {
      console.warn("Web Audio API is not supported or failed to initialize", e);
    }
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (!this.isInitialized) {
      this.init();
    }
    
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.masterVolume && this.ctx) {
      const targetGain = mute ? 0.0 : 0.45;
      this.masterVolume.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 1.2);
    }
  }

  public toggleMute(): boolean {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  public getMuteState(): boolean {
    return this.isMuted;
  }

  private startAmbientPad() {
    if (!this.ctx || !this.masterVolume) return;

    // We create three low oscillators to create a rich warm pad chord (C major / C9 vibe)
    const baseFreqs = [130.81, 164.81, 196.00, 293.66]; // C3, E3, G3, D4
    
    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterVolume) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Triangle and sine waves blend for smooth warm sound
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Detune slightly for lush chorus effect
      osc.detune.setValueAtTime((idx - 1.5) * 8, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      
      osc.connect(gain);
      // Lowpass filter to keep it dark and atmospheric
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.0, this.ctx.currentTime);
      
      gain.connect(filter);
      filter.connect(this.masterVolume);
      
      osc.start();
      
      // Fade in the chord notes gradually
      const individualVolume = [0.12, 0.08, 0.1, 0.06][idx];
      gain.gain.linearRampToValueAtTime(individualVolume, this.ctx.currentTime + 4 + idx * 2);
      
      this.ambientOscs.push({ osc, gain });
    });
  }

  public playChime(pitchIndex: number = 0) {
    if (this.isMuted || !this.ctx || !this.masterVolume) return;
    
    const now = this.ctx.currentTime;
    
    // Pentatonic scale notes to guarantee harmony (C major pentatonic: C, D, E, G, A)
    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5 to C6
    const freq = scale[pitchIndex % scale.length];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    // Frequency slide for a magical sweeping effect
    osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + 0.15);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    
    osc.connect(gain);
    
    // Add delay/reverb emulation using feedback gain and delay
    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.35, now);
    
    const delayGain = this.ctx.createGain();
    delayGain.gain.setValueAtTime(0.35, now);
    
    gain.connect(this.masterVolume);
    
    // Delay feedback loop
    gain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay); // Feedback
    delayGain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 2.0);
  }

  public playTransition() {
    if (this.isMuted || !this.ctx || !this.masterVolume) return;
    
    const now = this.ctx.currentTime;
    
    // A soft sweeps / filter change to mark transitions
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 1.5);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
    
    osc.connect(gain);
    gain.connect(this.masterVolume);
    
    osc.start(now);
    osc.stop(now + 1.8);
  }

  public updateChapterFrequency(chapter: number) {
    if (!this.ctx || this.ambientOscs.length === 0) return;
    
    const now = this.ctx.currentTime;
    
    // Shift base chord according to the chapter to change emotional mood
    // Chapter 0: C major triad (130.81, 164.81, 196.00, 293.66)
    // Chapter 1: F major 7 vibe (138.59, 174.61, 220.00, 349.23)
    // Chapter 2: A minor 7 vibe (110.00, 130.81, 164.81, 220.00)
    // Chapter 3: G major suspended (146.83, 196.00, 220.00, 293.66)
    // Chapter 4: Beautiful resolved C major 9 (130.81, 196.00, 261.63, 392.00)
    
    const chords = [
      [130.81, 164.81, 196.00, 293.66], // Proloque: Chaos & Cosmos
      [130.81, 174.61, 220.00, 329.63], // Chapter 1: Separate
      [110.00, 130.81, 164.81, 220.00], // Chapter 2: Echo / Rain
      [146.83, 196.00, 246.94, 293.66], // Chapter 3: Resonance
      [130.81, 196.00, 261.63, 392.00]  // Epilogue: Convergence
    ];
    
    const targetChord = chords[chapter % chords.length];
    
    this.ambientOscs.forEach((item, idx) => {
      const targetFreq = targetChord[idx % targetChord.length];
      item.osc.frequency.exponentialRampToValueAtTime(targetFreq, now + 2.5);
    });
  }
}

export const sound = new CinematicSound();
