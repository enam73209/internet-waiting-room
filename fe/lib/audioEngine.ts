"use client";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private droneNodes: { osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null = null;
  private rainNodes: { noise: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  private fireNodes: { noise: ScriptProcessorNode; gain: GainNode; osc: OscillatorNode } | null = null;
  private chimesInterval: NodeJS.Timeout | null = null;

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

  public playDoorOpen() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Creaking friction sound (staccato low-pitch pulse sequence)
      const tickCount = 16;
      for (let i = 0; i < tickCount; i++) {
        // Accelerating creak using exponent
        const timeOffset = Math.pow(i / tickCount, 1.8) * 0.6;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = "triangle";
        // Low creaky pitch
        osc.frequency.setValueAtTime(70 + Math.random() * 30, now + timeOffset);

        gain.gain.setValueAtTime(0, now + timeOffset);
        gain.gain.linearRampToValueAtTime(0.06, now + timeOffset + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.035);

        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.04);
      }

      // 2. Low wind gust as door swings open (lowpass filtered white noise)
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(280, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(90, now + 1.4);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0, now);
      noiseGain.gain.linearRampToValueAtTime(0.1, now + 0.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      noiseNode.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + 1.5);

      // 3. Ambient golden chord swell (sine wave drone)
      const chord = [220, 275, 330, 440]; // A minor add9 feel
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + 0.15);

        gain.gain.setValueAtTime(0, now + 0.15);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.5 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + 0.15);
        osc.stop(now + 1.9);
      });
    } catch (e) {
      console.warn("AudioEngine: Door open synth failed:", e);
    }
  }

  public playChimeNode(pitchFreq: number = 700 + Math.random() * 400) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Combine fundamental chime frequency with sharp overtone nodes
      const ratios = [1.0, 1.4, 2.0, 2.7, 3.6];
      ratios.forEach((ratio, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(pitchFreq * ratio, now);

        gain.gain.setValueAtTime(0, now);
        const peak = 0.04 / (idx + 1);
        gain.gain.linearRampToValueAtTime(peak, now + 0.015);
        // Overtones decay rapidly, leaving fundamental to sustain
        const decayTime = 2.2 / (idx * 0.6 + 1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 3.0);
      });
    } catch (e) {
      console.warn("AudioEngine: Chime play failed:", e);
    }
  }

  public startChimes() {
    this.stopChimes();
    this.playChimeNode();
    this.chimesInterval = setInterval(() => {
      this.playChimeNode();
    }, 5000);
  }

  public stopChimes() {
    if (this.chimesInterval) {
      clearInterval(this.chimesInterval);
      this.chimesInterval = null;
    }
  }

  public startDrone() {
    try {
      this.initCtx();
      if (!this.ctx || this.droneNodes) return;
      const now = this.ctx.currentTime;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(110.0, now); // A2 fundamental

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(110.4, now); // slightly detuned for binaural beating

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 2.5); // very smooth fade-in

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.droneNodes = { osc1, osc2, gain };
    } catch (e) {
      console.warn("AudioEngine: Drone start failed:", e);
    }
  }

  public stopDrone() {
    if (this.droneNodes) {
      try {
        const { osc1, osc2, gain } = this.droneNodes;
        if (this.ctx) {
          const now = this.ctx.currentTime;
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.linearRampToValueAtTime(0, now + 1.5); // slow fade-out
          setTimeout(() => {
            try {
              osc1.stop();
              osc2.stop();
            } catch {}
          }, 1600);
        }
      } catch {}
      this.droneNodes = null;
    }
  }

  public startRain() {
    try {
      this.initCtx();
      if (!this.ctx || this.rainNodes) return;
      const now = this.ctx.currentTime;

      // 2 seconds loopable noise buffer
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
      filter.frequency.setValueAtTime(850, now);
      filter.Q.setValueAtTime(0.7, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 2.0);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);

      this.rainNodes = { noise, filter, gain };
    } catch (e) {
      console.warn("AudioEngine: Rain start failed:", e);
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
          gain.gain.linearRampToValueAtTime(0, now + 1.2);
          setTimeout(() => {
            try {
              noise.stop();
            } catch {}
          }, 1300);
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

      // 1. Low frequency rumble
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(45, now);
      oscGain.gain.setValueAtTime(0.03, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 1.5);

      osc.connect(oscGain);
      oscGain.connect(gain);
      osc.start(now);

      // 2. High-pass random impulse clicks (crackle)
      const bufferSize = 4096;
      const scriptNode = this.ctx.createScriptProcessor(bufferSize, 0, 1);
      scriptNode.onaudioprocess = (e) => {
        const outputBuffer = e.outputBuffer.getChannelData(0);
        for (let i = 0; i < outputBuffer.length; i++) {
          let sample = (Math.random() * 2 - 1) * 0.015; // low rumble background
          if (Math.random() < 0.00075) {
            // Crackle spike!
            sample += (Math.random() > 0.5 ? 1 : -1) * 0.5;
          }
          outputBuffer[i] = sample;
        }
      };

      scriptNode.connect(gain);
      gain.connect(this.ctx.destination);

      this.fireNodes = { noise: scriptNode, gain, osc };
    } catch (e) {
      console.warn("AudioEngine: Fire start failed:", e);
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
          gain.gain.linearRampToValueAtTime(0, now + 1.2);
          setTimeout(() => {
            try {
              noise.disconnect();
              osc.stop();
            } catch {}
          }, 1300);
        }
      } catch {}
      this.fireNodes = null;
    }
  }
}

export const audioEngine = typeof window !== "undefined" ? new AudioEngine() : null;
