import { useState } from 'react';

interface AudioPlayerButtonProps {
  /** Okunacak metin */
  text: string;
  /** Süre etiketi, örn: "~3 dk" */
  duration?: string;
  /** Dil kodu, varsayılan tr-TR */
  lang?: string;
}

/**
 * Play/Pause + waveform animasyonlu sesli dinle butonu.
 * Web Speech API (SpeechSynthesis) kullanır.
 */
export default function AudioPlayerButton({
  text,
  duration = '~2 dk',
  lang = 'tr-TR',
}: AudioPlayerButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Tarayıcınız sesli okuma özelliğini desteklemiyor.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.25;
    utterance.pitch = 1;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isPlaying ? 'Sesi durdur' : 'Sesli dinle'}
      className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full border transition-all duration-200 ${
        isPlaying
          ? 'bg-cyan-500/14 border-cyan-500/50 shadow-[0_0_20px_rgba(0,212,255,0.25)]'
          : 'bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/16 hover:border-cyan-500/40 hover:shadow-[0_0_16px_rgba(0,212,255,0.15)]'
      }`}
    >
      {/* Play/Pause circle */}
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
          isPlaying ? 'scale-105' : ''
        }`}
        style={{ background: 'var(--cyan, #00D4FF)' }}
      >
        {isPlaying ? (
          <div className="flex gap-0.5">
            <div className="w-1.5 h-2.5 bg-card rounded-sm" />
            <div className="w-1.5 h-2.5 bg-card rounded-sm" />
          </div>
        ) : (
          <div
            style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '5px 0 5px 9px',
              borderColor: 'transparent transparent transparent #0D1117',
              marginLeft: '2px',
            }}
          />
        )}
      </div>

      {/* Waveform bars */}
      <div className="flex items-center gap-0.5 h-3.5">
        {[4, 10, 14, 8, 12, 6, 10].map((h, i) => (
          <div
            key={i}
            className={`w-0.5 rounded-sm bg-cyan-400 transition-all ${
              isPlaying ? 'animate-pulse' : 'opacity-60'
            }`}
            style={{
              height: `${h}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <span className="font-mono text-[11px] font-semibold tracking-wide text-cyan-400">
        {isPlaying ? 'Duraksatıldı' : 'Sesli Dinle'}
      </span>

      {/* Duration */}
      <span className="font-mono text-[10px] text-slate-500">{duration}</span>
    </button>
  );
}
