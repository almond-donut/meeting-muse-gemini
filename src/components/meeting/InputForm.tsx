
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Zap } from "lucide-react";

interface InputFormProps {
  transcript: string;
  setTranscript: (value: string) => void;
  participants: string;
  setParticipants: (value: string) => void;
  docs: string;
  setDocs: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  transcript,
  setTranscript,
  participants,
  setParticipants,
  docs,
  setDocs,
  handleSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="transcript" className="text-lg font-semibold">Meeting Transcript</Label>
        <Textarea
          id="transcript"
          placeholder="Paste the full meeting transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="min-h-[200px] text-base"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="participants" className="text-lg font-semibold">Participants</Label>
        <Input
          id="participants"
          placeholder="e.g., John Doe, Jane Smith"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          className="text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="docs" className="text-lg font-semibold">Referenced Google Docs</Label>
        <Input
          id="docs"
          placeholder="Paste links to docs, separated by commas"
          value={docs}
          onChange={(e) => setDocs(e.target.value)}
          className="text-base"
        />
      </div>
      <Button type="submit" className="w-full text-lg py-6" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        ) : (
          <Zap className="mr-2 h-6 w-6" />
        )}
        {isLoading ? 'Generating...' : 'Generate Recap'}
      </Button>
    </form>
  );
};

export default InputForm;
