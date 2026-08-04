"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private droneNodes: { 
    osc1: OscillatorNode; 
    osc2: OscillatorNode; 
    osc3: OscillatorNode; 
    gain: GainNode; 
    windSource: AudioBufferSourceNode; 
    windFilter: BiquadFilterNode; 
    windGain: GainNode; 
    lfo: OscillatorNode;
  } | null = null;
  private rainNodes: { noise: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  private fireNodes: { noise: ScriptProcessorNode; gain: GainNode; osc: OscillatorNode } | null = null;
  private chimesInterval: NodeJS.Timeout | null = null;
  private birdsInterval: NodeJS.Timeout | null = null;

  private initCtx() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // 1. Prominent, optimistic door opening sound (wood creak + wind + bright major chord swell)
  public playDoorOpen() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Creaking wood sound (accelerating triangle wave pulses)
      const tickCount = 18;
      for (let i = 0; i < tickCount; i++) {
        const timeOffset = Math.pow(i / tickCount, 1.6) * 0.75;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(65 + Math.random() * 25, now + timeOffset);

        gain.gain.setValueAtTime(0, now + timeOffset);
        // Slightly higher gain to make it prominent
        gain.gain.linearRampToValueAtTime(0.14, now + timeOffset + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.045);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.05);
      }

      // Wind gust sweep as door swings open (lowpass filtered white noise)
      const bufferSize = this.ctx.sampleRate * 2.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.5);
      filter.frequency.exponentialRampToValueAtTime(95, now + 1.6);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0, now);
      // Increased gain for prominent breeze
      noiseGain.gain.linearRampToValueAtTime(0.16, now + 0.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      noiseNode.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + 1.8);

      // Bright, welcoming G major add9 chord swell (G3, B3, D4, G4, A4)
      const chord = [196.00, 246.94, 293.66, 392.00, 440.00]; 
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const feltFilter = this.ctx!.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + 0.1);

        feltFilter.type = "lowpass";
        feltFilter.frequency.setValueAtTime(500, now + 0.1);

        gain.gain.setValueAtTime(0, now + 0.1);
        // Rich warm chord swell volume
        gain.gain.linearRampToValueAtTime(0.07, now + 0.6 + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(feltFilter);
        feltFilter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + 0.1);
        osc.stop(now + 2.6);
      });
    } catch (e) {
      console.warn("AudioEngine: Door open synth failed:", e);
    }
  }

  // 2. Door hover creak - quiet and brief
  public playDoorHoverCreak() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const ticks = 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < ticks; i++) {
        const timeOffset = i * 0.05 + Math.random() * 0.015;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(60 + Math.random() * 20, now + timeOffset);

        gain.gain.setValueAtTime(0, now + timeOffset);
        gain.gain.linearRampToValueAtTime(0.015, now + timeOffset + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + timeOffset + 0.045);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.05);
      }
    } catch (e) {
      console.warn("AudioEngine: Door hover creak failed:", e);
    }
  }

  // 3. Brass handle click
  public playHandleClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // High frequency metallic latch release
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1850, now);
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.02, now + 0.002);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Mid frequency spring thud
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(290, now);
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.03, now + 0.004);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.08);
    } catch (e) {
      console.warn("AudioEngine: Handle click failed:", e);
    }
  }

  // 4. Soft warm felt piano note chimes (optimistic pentatonic melody)
  public playChimeNode(pitchFreq?: number) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Major pentatonic notes: C4 (261.63), D4 (293.66), E4 (329.63), G4 (392.00), A4 (440.00), C5 (523.25), E5 (659.25)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      const freq = pitchFreq || scale[Math.floor(Math.random() * scale.length)];

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Fundamental warm sine
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, now);

      // Second harmonic (very quiet triangle for body)
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, now);
      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.04, now);
      osc2.connect(gain2);
      gain2.connect(filter);

      osc1.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      // Lowpass filter to make it sound "felted" and soft
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, now);

      // Soft felt piano envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.05); // 50ms slow attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0); // smooth long decay

      osc1.start(now);
      osc2.start(now);
      
      osc1.stop(now + 2.1);
      osc2.stop(now + 2.1);
    } catch (e) {
      console.warn("AudioEngine: Felt piano chime play failed:", e);
    }
  }

  // 5. Cozy room pad & LFO wind breeze & random bird chirps
  public startDrone() {
    try {
      this.initCtx();
      if (!this.ctx || this.droneNodes) return;
      const now = this.ctx.currentTime;

      // Soft Pad Chord (C major add9 feeling: C3, G3, D4)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const osc3 = this.ctx.createOscillator();
      const padGain = this.ctx.createGain();
      const padFilter = this.ctx.createBiquadFilter();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(130.81, now); // C3
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(196.00, now); // G3

      osc3.type = "sine";
      osc3.frequency.setValueAtTime(293.66, now); // D4

      padFilter.type = "lowpass";
      padFilter.frequency.setValueAtTime(220, now);

      padGain.gain.setValueAtTime(0, now);
      padGain.gain.linearRampToValueAtTime(0.02, now + 3.0); // very smooth fade-in

      osc1.connect(padFilter);
      osc2.connect(padFilter);
      osc3.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      // Gentle wind breeze (LFO modulated bandpass white noise)
      const bufferSize = this.ctx.sampleRate * 4.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const windSource = this.ctx.createBufferSource();
      windSource.buffer = buffer;
      windSource.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = "bandpass";
      windFilter.Q.setValueAtTime(0.9, now);
      windFilter.frequency.setValueAtTime(240, now);

      // LFO Lull (Slow modulation of wind frequency)
      const lfo = this.ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.setValueAtTime(0.08, now); // slow cycle
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(70, now); // range
      
      lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);

      const windGain = this.ctx.createGain();
      windGain.gain.setValueAtTime(0, now);
      windGain.gain.linearRampToValueAtTime(0.015, now + 3.0); // extremely quiet breeze

      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(this.ctx.destination);

      lfo.start(now);
      windSource.start(now);

      this.droneNodes = { 
        osc1, 
        osc2, 
        osc3, 
        gain: padGain, 
        windSource, 
        windFilter, 
        windGain, 
        lfo 
      };

      // Periodic birds chirping in background (every 18-28 seconds)
      this.startBirds();
    } catch (e) {
      console.warn("AudioEngine: Sunday drone start failed:", e);
    }
  }

  public stopDrone() {
    this.stopBirds();
    if (this.droneNodes) {
      try {
        const { osc1, osc2, osc3, gain, windSource, windGain, lfo } = this.droneNodes;
        if (this.ctx) {
          const now = this.ctx.currentTime;
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 2.0); // slow pad fade

          windGain.gain.cancelScheduledValues(now);
          windGain.gain.setValueAtTime(windGain.gain.value, now);
          windGain.gain.linearRampToValueAtTime(0, now + 2.0); // slow wind fade

          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
              osc3.stop();
              windSource.stop();
              lfo.stop();
            } catch {}
          }, 2200);
        }
      } catch {}
      this.droneNodes = null;
    }
  }

  // 6. Synthesize bird chirping (quick high-pitch sweeps, very gentle)
  public playBirdChirp() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 2-3 chirps sequence
      const chirps = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < chirps; i++) {
        const timeOffset = i * 0.12 + Math.random() * 0.02;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "sine";
        const startFreq = 2900 + Math.random() * 200;
        const peakFreq = startFreq + 500 + Math.random() * 100;

        // Fast frequency sweep
        osc.frequency.setValueAtTime(startFreq, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(peakFreq, now + timeOffset + 0.025);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 150, now + timeOffset + 0.06);

        gain.gain.setValueAtTime(0, now + timeOffset);
        // Very low volume, background birds
        gain.gain.linearRampToValueAtTime(0.005, now + timeOffset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + 0.06);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.07);
      }
    } catch (e) {
      console.warn("AudioEngine: Bird chirp failed:", e);
    }
  }

  private startBirds() {
    this.stopBirds();
    // Play a chirp occasionally
    const playRandomBird = () => {
      this.playBirdChirp();
      const nextDelay = 18000 + Math.random() * 12000; // 18-30s
      this.birdsInterval = setTimeout(playRandomBird, nextDelay);
    };
    // First chirp delayed by 5-10s
    this.birdsInterval = setTimeout(playRandomBird, 6000 + Math.random() * 4000);
  }

  private stopBirds() {
    if (this.birdsInterval) {
      clearTimeout(this.birdsInterval);
      this.birdsInterval = null;
    }
  }

  public startChimes() {
    this.stopChimes();
    // Warm felt piano note every 7 seconds
    this.playChimeNode();
    this.chimesInterval = setInterval(() => {
      this.playChimeNode();
    }, 7000);
  }

  public stopChimes() {
    if (this.chimesInterval) {
      clearInterval(this.chimesInterval);
      this.chimesInterval = null;
    }
  }

  // Room sound layers (rain and fire) - simplified to standard gentle filters
  public startRain() {
    try {
      this.initCtx();
      if (!this.ctx || this.rainNodes) return;
      const now = this.ctx.currentTime;

      const bufferSize = this.ctx.sampleRate * 2.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(0.6, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 2.0);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);

      this.rainNodes = { noise, filter, gain };
    } catch (e) {
      console.warn("AudioEngine: Rain failed:", e);
    }
  }

  public stopRain() {
    if (this.rainNodes) {
      try {
        const { noise, gain } = this.rainNodes;
        if (this.ctx) {
          const now = this.ctx.currentTime;
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 1.0);
          setTimeout(() => {
            try {
              noise.stop();
            } catch {}
          }, 1100);
        }
      } catch {}
      this.rainNodes = null;
    }
  }

  public startFire() {
    try {
      this.initCtx();
      if (!this.ctx || this.fireNodes) return;
      const now = this.ctx.currentTime;

      // Cozy fireplace crackling rumble (very low frequency sine + random clicks)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(48, now);
      oscGain.gain.setValueAtTime(0.015, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 1.5);

      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start(now);

      const bufferSize = 4096;
      const scriptNode = this.ctx.createScriptProcessor(bufferSize, 0, 1);
      scriptNode.onaudioprocess = (e) => {
        const outputBuffer = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < outputBuffer.length; i++) {
          let sample = 0;
          if (Math.random() < 0.0006) {
            sample += (Math.random() > 0.5 ? 1 : -1) * 0.25;
          }
          outputBuffer[i] = sample;
        }
      };

      scriptNode.connect(gain);
      gain.connect(this.ctx.destination);

      this.fireNodes = { noise: scriptNode, gain, osc };
    } catch (e) {
      console.warn("AudioEngine: Fire failed:", e);
    }
  }

  public stopFire() {
    if (this.fireNodes) {
      try {
        const { noise, gain, osc } = this.fireNodes;
        if (this.ctx) {
          const now = this.ctx.currentTime;
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 1.0);
          setTimeout(() => {
            try {
              noise.disconnect();
              osc.stop();
            } catch {}
          }, 1100);
        }
      } catch {}
      this.fireNodes = null;
    }
  }
}

export const audioEngine = typeof window !== "undefined" ? new AudioEngine() : null;
