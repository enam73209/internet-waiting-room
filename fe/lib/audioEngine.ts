"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private droneNodes: { 
    oscs: OscillatorNode[]; 
    gains: GainNode[]; 
    lfos: OscillatorNode[]; 
    lfoGains: GainNode[]; 
    filterLfo: OscillatorNode; 
    filterLfoGain: GainNode; 
    padFilter: BiquadFilterNode; 
    gain: GainNode; 
  } | null = null;
  private rainNodes: { noise: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  private fireNodes: { noise: AudioBufferSourceNode; gain: GainNode } | null = null;
  private chimesInterval: NodeJS.Timeout | null = null;
  private birdsInterval: NodeJS.Timeout | null = null;
  private rainDropletsInterval: NodeJS.Timeout | null = null;
  private fireCracklesInterval: NodeJS.Timeout | null = null;
  private activeMusicNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private musicInterval: NodeJS.Timeout | null = null;

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
      gain.gain.linearRampToValueAtTime(0.06, now + 0.05); // 50ms slow attack
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
  // 5. Play beautiful, slow-evolving ambient chord progression in a higher register (no motor engine hum)
  private playAmbientMusicChord(chordIndex: number) {
    try {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Define 4 beautiful chords in C major / A pentatonic (pure, warm, relaxing)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
        [349.23, 440.00, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
        [293.66, 349.23, 440.00, 587.33], // Dm7 (D4, F4, A4, D5)
        [392.00, 493.88, 587.33, 783.99]  // G7 / G6 (G4, B4, D5, G5)
      ];

      const pitches = chords[chordIndex % chords.length];

      pitches.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(600, now); // soft, warm filter

        gainNode.gain.setValueAtTime(0, now);
        const noteVolume = 0.035; 
        gainNode.gain.linearRampToValueAtTime(noteVolume, now + 2.0); // 2-second slow attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 9.5); // long decay

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 9.6);

        const nodePair = { osc, gain: gainNode };
        this.activeMusicNodes.push(nodePair);

        // Cleanup node references after playing
        setTimeout(() => {
          this.activeMusicNodes = this.activeMusicNodes.filter((n) => n !== nodePair);
        }, 10000);
      });
    } catch {}
  }

  public startDrone() {
    try {
      this.initCtx();
      if (!this.ctx || this.musicInterval) return;

      let chordIndex = 0;
      this.playAmbientMusicChord(chordIndex++);

      this.musicInterval = setInterval(() => {
        this.playAmbientMusicChord(chordIndex++);
      }, 8000);

      // Start ambient wind chimes too
      this.startAmbientChimes();
    } catch (e) {
      console.warn("AudioEngine: Ambient music start failed:", e);
    }
  }

  public stopDrone() {
    this.stopAmbientChimes();
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    
    // Quick fade out of all active playing music notes
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeMusicNodes.forEach(({ osc, gain }) => {
      try {
        if (this.ctx) {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 1.0); // 1-second fade out
          setTimeout(() => {
            try {
              osc.stop();
            } catch {}
          }, 1100);
        }
      } catch {}
    });
    this.activeMusicNodes = [];
  }

  // 6. Synthesize soft wind chimes in background (highly relaxing glass/metal tinkles)
  public playAmbientChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Higher-octave pentatonic pitches (G5, A5, C6, D6, E6)
      const scale = [783.99, 880.00, 1046.50, 1174.66, 1318.51];
      const freq = scale[Math.floor(Math.random() * scale.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);

      gain.gain.setValueAtTime(0, now);
      const volume = 0.006 + Math.random() * 0.002;
      gain.gain.linearRampToValueAtTime(volume, now + 0.1); // Slow 100ms attack
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0 + Math.random() * 1.5); // long decay

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 5.0);
    } catch (e) {
      console.warn("AudioEngine: Ambient chime play failed:", e);
    }
  }

  private startAmbientChimes() {
    this.stopAmbientChimes();
    const playRandomChime = () => {
      this.playAmbientChime();
      const nextDelay = 15000 + Math.random() * 10000; // 15-25s
      this.birdsInterval = setTimeout(playRandomChime, nextDelay);
    };
    this.birdsInterval = setTimeout(playRandomChime, 6000 + Math.random() * 4000);
  }

  private stopAmbientChimes() {
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

      // Cascaded warm rumble rain (heavily filtered white noise, no low hiss)
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
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, now); // Raised cutoff to prevent motor hum
      filter.Q.setValueAtTime(0.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 2.0); // Quiet wind/rain rustle

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);

      this.rainNodes = { noise, filter, gain };

      // Droplets scheduler
      const playDroplet = () => {
        try {
          if (!this.ctx || !this.rainNodes) return;
          const dropletNow = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const dropletGain = this.ctx.createGain();
          const dropletFilter = this.ctx.createBiquadFilter();

          osc.type = "sine";
          const freq = 400 + Math.random() * 500;
          osc.frequency.setValueAtTime(freq, dropletNow);

          dropletFilter.type = "lowpass";
          dropletFilter.frequency.setValueAtTime(800, dropletNow);

          dropletGain.gain.setValueAtTime(0, dropletNow);
          const maxGain = 0.002 + Math.random() * 0.003;
          dropletGain.gain.linearRampToValueAtTime(maxGain, dropletNow + 0.002);
          dropletGain.gain.exponentialRampToValueAtTime(0.0001, dropletNow + 0.02 + Math.random() * 0.03);

          osc.connect(dropletFilter);
          dropletFilter.connect(dropletGain);
          dropletGain.connect(this.ctx.destination);

          osc.start(dropletNow);
          osc.stop(dropletNow + 0.1);
        } catch {}
      };

      const scheduleNextDroplet = () => {
        if (!this.rainNodes) return;
        const delay = 50 + Math.random() * 200;
        this.rainDropletsInterval = setTimeout(() => {
          playDroplet();
          scheduleNextDroplet();
        }, delay);
      };
      scheduleNextDroplet();
    } catch (e) {
      console.warn("AudioEngine: Rain failed:", e);
    }
  }

  public stopRain() {
    if (this.rainDropletsInterval) {
      clearTimeout(this.rainDropletsInterval);
      this.rainDropletsInterval = null;
    }
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

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 1.5);

      // Cozy atmospheric roar (low-passed white noise at 200Hz, very quiet, no low hum)
      const bufferSize = this.ctx.sampleRate * 2.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const roarNoise = this.ctx.createBufferSource();
      roarNoise.buffer = buffer;
      roarNoise.loop = true;

      const roarFilter = this.ctx.createBiquadFilter();
      roarFilter.type = "lowpass";
      roarFilter.frequency.setValueAtTime(200, now);

      const roarGain = this.ctx.createGain();
      roarGain.gain.setValueAtTime(0, now);
      roarGain.gain.linearRampToValueAtTime(0.008, now + 1.5); // extremely soft draft

      roarNoise.connect(roarFilter);
      roarFilter.connect(roarGain);
      roarGain.connect(gain);
      roarNoise.start(now);

      gain.connect(this.ctx.destination);

      this.fireNodes = { noise: roarNoise, gain };

      // Wood crackles scheduler (warm triangle pops with low-pass filtering)
      const playCrackle = () => {
        try {
          if (!this.ctx || !this.fireNodes) return;
          const crackleNow = this.ctx.currentTime;
          const crackleOsc = this.ctx.createOscillator();
          const popGain = this.ctx.createGain();
          const popFilter = this.ctx.createBiquadFilter();

          crackleOsc.type = "triangle";
          const freq = 120 + Math.random() * 160;
          crackleOsc.frequency.setValueAtTime(freq, crackleNow);

          popFilter.type = "lowpass";
          popFilter.frequency.setValueAtTime(350, crackleNow);

          popGain.gain.setValueAtTime(0, crackleNow);
          const maxGain = 0.005 + Math.random() * 0.007;
          popGain.gain.linearRampToValueAtTime(maxGain, crackleNow + 0.001);
          popGain.gain.exponentialRampToValueAtTime(0.0001, crackleNow + 0.01 + Math.random() * 0.015);

          crackleOsc.connect(popFilter);
          popFilter.connect(popGain);
          popGain.connect(this.ctx.destination);

          crackleOsc.start(crackleNow);
          crackleOsc.stop(crackleNow + 0.05);
        } catch {}
      };

      const scheduleNextCrackle = () => {
        if (!this.fireNodes) return;
        const delay = 150 + Math.random() * 800;
        this.fireCracklesInterval = setTimeout(() => {
          playCrackle();
          scheduleNextCrackle();
        }, delay);
      };
      scheduleNextCrackle();
    } catch (e) {
      console.warn("AudioEngine: Fire failed:", e);
    }
  }

  public stopFire() {
    if (this.fireCracklesInterval) {
      clearTimeout(this.fireCracklesInterval);
      this.fireCracklesInterval = null;
    }
    if (this.fireNodes) {
      try {
        const { noise, gain } = this.fireNodes;
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
      this.fireNodes = null;
    }
  }
}

export const audioEngine = typeof window !== "undefined" ? new AudioEngine() : null;
