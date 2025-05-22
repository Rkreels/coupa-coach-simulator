
import React from 'react';
import { useVoiceTutorial } from '../contexts/VoiceTutorialContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Pause, Play, RefreshCw, Volume2, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

export const VoiceTutorialControls: React.FC = () => {
  const { 
    isPlaying, 
    pauseTutorial, 
    repeatLastScript, 
    detailLevel, 
    setDetailLevel,
    currentScript,
    enabled,
    setEnabled
  } = useVoiceTutorial();

  // Don't render if not enabled
  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="text-coupa-blue w-5 h-5" />
          <h3 className="font-medium text-gray-800">Voice Tutorial Controls</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => setEnabled(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={pauseTutorial}
            disabled={!isPlaying}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Paused'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={repeatLastScript}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Repeat
          </Button>
          
          <div className="flex-1">
            <Select
              value={detailLevel}
              onValueChange={(value) => setDetailLevel(value as any)}
            >
              <SelectTrigger className="w-full text-sm h-9">
                <SelectValue placeholder="Detail Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {currentScript && (
          <div className="bg-coupa-lightgray p-2 rounded text-sm text-gray-700 max-h-20 overflow-y-auto">
            <p className="text-xs text-coupa-blue font-medium mb-1">Current Instruction:</p>
            {currentScript}
          </div>
        )}
      </div>
    </div>
  );
};
