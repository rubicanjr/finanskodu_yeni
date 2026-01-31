// src/utils/AudioManager.ts
// Mobile Audio Playback Fix - iOS/Android Autoplay Policy Bypass
// Uses "Silent Unlock" strategy to enable audio playback after user gesture

class AudioManager {
  private audioContext: AudioContext | null = null;
  private isUnlocked: boolean = false;

  getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    return this.audioContext;
  }

  async unlockAudio(): Promise<void> {
    const ctx = this.getAudioContext();
    
    // Resume suspended context (required for iOS Safari)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    
    // Play silent buffer to "unlock" audio playback
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    
    this.isUnlocked = true;
    console.log("🔓 Audio Context Unlocked & Resumed");
  }

  async playAudioBlob(blob: Blob): Promise<void> {
    const ctx = this.getAudioContext();
    
    try {
      // Primary method: Use Web Audio API for better mobile compatibility
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start(0);
      
      return new Promise((resolve) => {
        source.onended = () => {
          resolve();
        };
      });
    } catch (error) {
      console.error("Audio Playback Error (Buffer):", error);
      
      // Fallback: Use HTML5 Audio element
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
        audio.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(e);
        };
        audio.play().catch(reject);
      });
    }
  }

  get unlocked(): boolean {
    return this.isUnlocked;
  }
}

export const audioManager = new AudioManager();
