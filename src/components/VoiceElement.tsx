
import React, { useRef, useState, useEffect } from 'react';
import { useVoiceTutorial } from '../contexts/VoiceTutorialContext';

interface VoiceElementProps {
  children: React.ReactNode;
  whatScript?: string;
  howScript?: string;
  decisionScript?: string;
  className?: string;
  triggerOn?: 'hover' | 'click' | 'load';
  hoverDelay?: number; // in ms
  forcePlay?: boolean;
}

export const VoiceElement: React.FC<VoiceElementProps> = ({
  children,
  whatScript,
  howScript,
  decisionScript,
  className,
  triggerOn = 'hover',
  hoverDelay = 2000, // default 2 seconds
  forcePlay = false,
}) => {
  const { playScript, detailLevel, enabled } = useVoiceTutorial();
  const [isHovering, setIsHovering] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Logic to determine which script to play based on detail level
  const getAppropriateScript = () => {
    if (detailLevel === 'beginner') {
      return whatScript || howScript || decisionScript;
    } else if (detailLevel === 'intermediate') {
      return howScript || decisionScript;
    } else {
      return decisionScript;
    }
  };

  const handleMouseEnter = () => {
    if (!enabled || triggerOn !== 'hover' || !getAppropriateScript()) return;
    
    setIsHovering(true);
    hoverTimerRef.current = setTimeout(() => {
      const script = getAppropriateScript();
      if (script) {
        playScript(script);
      }
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleClick = () => {
    if (!enabled || triggerOn !== 'click') return;
    
    const script = getAppropriateScript();
    if (script) {
      playScript(script);
    }
  };

  // Handle load trigger
  useEffect(() => {
    if (!enabled) return;
    
    if (triggerOn === 'load' && !hasPlayed && getAppropriateScript()) {
      const script = getAppropriateScript();
      if (script) {
        playScript(script);
        setHasPlayed(true);
      }
    }
  }, [triggerOn, hasPlayed, enabled]);

  // Handle force play
  useEffect(() => {
    if (!enabled) return;
    
    if (forcePlay && getAppropriateScript()) {
      const script = getAppropriateScript();
      if (script) {
        playScript(script);
      }
    }
  }, [forcePlay, enabled]);

  // The outline should only be visible when enabled and hovering
  const outlineClass = enabled && isHovering ? 'outline outline-1 outline-offset-2 outline-coupa-blue/30' : '';

  return (
    <div
      ref={elementRef}
      className={`${className || ''} ${outlineClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
