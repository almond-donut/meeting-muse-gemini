import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/meeting/Header';
import InputForm from '@/components/meeting/InputForm';
import OutputDisplay, { OutputData } from '@/components/meeting/OutputDisplay';
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { UserNav } from '@/components/meeting/UserNav';

const mockOutput: OutputData = {
  summary: "The team reviewed the Q2 project plan and discussed the new marketing strategy. A decision was made to increase the budget for social media advertising by 15%. The launch date is confirmed for July 15th.",
  actionItems: [
    "John: Update the budget spreadsheet with the new 15% increase by Friday.",
    "Jane: Prepare the final draft of the marketing campaign for review by next Wednesday.",
    "Alex: Coordinate with the design team to get the new ad creatives ready before June 30th."
  ],
  docEdits: "In 'Q2 Project Plan,' update Section 3.2 'Budget Allocation' with the new figures. In 'Marketing Strategy Q2,' add a paragraph under 'Social Media' detailing the new targeted ad approach.",
  email: `Subject: Meeting Recap: Q2 Project Plan & Marketing Strategy

Hi Team,

Here's a quick summary of our meeting today:

**Key Points:**
- Reviewed and finalized the Q2 project plan.
- Approved a 15% budget increase for social media advertising.
- Confirmed project launch date for July 15th.

**Action Items:**
- **John:** Update the budget spreadsheet by Friday.
- **Jane:** Prepare the final marketing campaign draft by next Wednesday.
- **Alex:** Coordinate with design for new ad creatives by June 30th.

**Document Updates:**
- The 'Q2 Project Plan' and 'Marketing Strategy Q2' documents will be updated with the discussed changes.

Best,
MeetingMind`
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-64 w-full" />
  </div>
);

const Index = () => {
  const [transcript, setTranscript] = useState('');
  const [participants, setParticipants] = useState('');
  const [docs, setDocs] = useState('');
  const [meetingType, setMeetingType] = useState('general');
  const [output, setOutput] = useState<OutputData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { session, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/auth');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to generate a recap.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setOutput(null);

    try {
      const { data, error } = await supabase.functions.invoke('gemini-process', {
        body: {
          transcript,
          participants,
          docs,
          meetingType,
          userId: user.id, // Pass user id
        },
      });

      if (error) {
        throw error;
      }
      
      setOutput(data);
      
    } catch (error: any) {
      console.error('Error calling gemini-process function:', error);
      toast({
        title: "Error Generating Recap",
        description: `${error.message}. Please ensure you have set the GEMINI_API_KEY in your Supabase project secrets and that it is correct.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Header />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
      <main className="grid md:grid-cols-2 md:gap-12">
        <div className="mb-12 md:mb-0">
          <InputForm
            transcript={transcript}
            setTranscript={setTranscript}
            participants={participants}
            setParticipants={setParticipants}
            docs={docs}
            setDocs={setDocs}
            meetingType={meetingType}
            setMeetingType={setMeetingType}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        <div>
          {isLoading && <LoadingSkeleton />}
          {output && <OutputDisplay data={output} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
