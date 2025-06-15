
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  NotebookPen,
  ListChecks,
  FilePenLine,
  Mail,
  Copy,
} from "lucide-react";

export interface OutputData {
  summary: string;
  actionItems: string[];
  docEdits: string;
  email: string;
}

interface OutputDisplayProps {
  data: OutputData;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ data }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: `${type} has been copied.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <NotebookPen className="mr-3 h-7 w-7 text-primary" />
            📝 Summary
          </CardTitle>
          <CardDescription>A concise overview of the meeting.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base whitespace-pre-wrap">{data.summary}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ListChecks className="mr-3 h-7 w-7 text-primary" />
            ✅ Action Items
          </CardTitle>
          <CardDescription>Specific tasks assigned to participants.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 list-disc pl-5">
            {data.actionItems.map((item, index) => (
              <li key={index} className="text-base">{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <FilePenLine className="mr-3 h-7 w-7 text-primary" />
            📄 Suggested Doc Edits
          </CardTitle>
          <CardDescription>Proposed changes for the referenced documents.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base whitespace-pre-wrap">{data.docEdits}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Mail className="mr-3 h-7 w-7 text-primary" />
            📬 Follow-up Email
          </CardTitle>
          <CardDescription>A ready-to-send recap email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border text-base whitespace-pre-wrap">
            {data.email}
          </div>
          <Button
            onClick={() => copyToClipboard(data.email, "Email content")}
            variant="outline"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OutputDisplay;

