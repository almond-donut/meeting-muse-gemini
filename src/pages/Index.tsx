import { useState } from 'react';
import Header from '@/components/meeting/Header';
import InputForm from '@/components/meeting/InputForm';
import OutputDisplay, { OutputData } from '@/components/meeting/OutputDisplay';
import { Skeleton } from "@/components/ui/skeleton";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput(null);

    // Simulate API call
    console.log("Selected meeting type:", meetingType);
    setTimeout(() => {
      setOutput(mockOutput);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main className="grid md:grid-cols-2 md:gap-12 mt-8">
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
