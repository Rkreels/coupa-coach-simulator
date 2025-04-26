
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type TutorialDetailLevel = 'beginner' | 'intermediate' | 'advanced';

type VoiceTutorialContextProps = {
  isPlaying: boolean;
  currentScript: string | null;
  detailLevel: TutorialDetailLevel;
  playScript: (script: string) => void;
  pauseTutorial: () => void;
  repeatLastScript: () => void;
  setDetailLevel: (level: TutorialDetailLevel) => void;
};

const VoiceTutorialContext = createContext<VoiceTutorialContextProps | undefined>(undefined);

export const VoiceTutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScript, setCurrentScript] = useState<string | null>(null);
  const [detailLevel, setDetailLevel] = useState<TutorialDetailLevel>('beginner');
  const lastScript = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // This would be replaced with actual text-to-speech in a production app
  const synthesizeSpeech = (text: string): string => {
    // In a real implementation, this would call a TTS service like AWS Polly
    // For demo purposes, we'll just return a dummy audio URL
    console.log("Synthesizing speech:", text);
    return "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA";
  };

  const playScript = (script: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentScript(script);
    lastScript.current = script;
    setIsPlaying(true);
    
    // In a real implementation, we would get the audio URL from a TTS service
    const audioUrl = synthesizeSpeech(script);
    
    // Simulate playing audio with a timeout
    console.log("Playing script:", script);
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000); // Simulate 5 seconds of audio
  };

  const pauseTutorial = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const repeatLastScript = () => {
    if (lastScript.current) {
      playScript(lastScript.current);
    }
  };

  const value = {
    isPlaying,
    currentScript,
    detailLevel,
    playScript,
    pauseTutorial,
    repeatLastScript,
    setDetailLevel,
  };

  return (
    <VoiceTutorialContext.Provider value={value}>
      {children}
    </VoiceTutorialContext.Provider>
  );
};

export const useVoiceTutorial = () => {
  const context = useContext(VoiceTutorialContext);
  if (context === undefined) {
    throw new Error('useVoiceTutorial must be used within a VoiceTutorialProvider');
  }
  return context;
};
