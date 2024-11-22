"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

// Define the type for fetching email data (Optional)
type EmailData = {
  email: {
    content: string;
  };
};

const initialTemplate = {
  counters: {},
  body: {
    rows: [
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: "text",
                values: {
                  text: "Welcome to our newsletter!",
                  textColor: "#333333",
                  fontSize: 18,
                  lineHeight: 1.6,
                  textAlign: "center",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

export default function Emaileditor({ subjectTitle }: { subjectTitle: string }) {
  const [jsonData, setJsonData] = useState<any | null>(initialTemplate);
  const [loading, setLoading] = useState(true); // Start loading as true by default
  const emailEditorRef = useRef<EditorRef>(null);
  const router = useRouter();

  // Fetch email data using React Query
  const fetchEmail = async () => {
    const token = localStorage.getItem("token");
    const newsletterId = localStorage.getItem('newsletterId');
    
    if (!newsletterId || !token) {
      toast.error("Authorization token or newsletter ID missing.");
      return null;
    }

    const res = await fetch(`http://localhost:5000/api/newsletter/${newsletterId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast.error("Failed to fetch email data.");
      return null;
    }

    const response = await res.json();
    return response.email?.content;
  };

  // Use React Query's useQuery hook to fetch the email data
  const { data, error, isLoading } = useQuery("fetchEmail", fetchEmail, {
    onSuccess: (data) => {
      if (data) {
        setJsonData(JSON.parse(data)); // Update the template with the fetched design
        setLoading(false); // Set loading to false after data is fetched
      }
    },
    onError: () => {
      toast.error("Failed to fetch email content.");
      setLoading(false);
    },
  });

  // Function to export HTML and JSON from the editor
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("Exported HTML:", html);
      console.log("Exported Design JSON:", design);
      setJsonData(design); // Save design JSON to state if needed
    });
  };

  const onReady: EmailEditorProps["onReady"] = () => {
    console.log("Editor is ready!");
    const unlayer = emailEditorRef.current?.editor;

    // Load the initial template
    unlayer?.loadDesign(jsonData);
  };

  // Function to save the draft
  const saveDraft = async (update: boolean) => {
    const unlayer = emailEditorRef.current?.editor;
    
    unlayer?.exportHtml(async (data) => {
      const { design } = data;
      const option = {
        title: subjectTitle,
        content: JSON.stringify(design),
      };
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast.error("No authorization token found.");
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:5000/api/newsletter`, {
          method: update ? "PATCH" : "POST", // Use PUT for updates
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(option),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.message || res.statusText);
        } else {
          router.replace("/dashboard/write");
          toast.success(update ? "Draft updated successfully" : "Draft saved successfully");
        }
      } catch (error) {
        toast.error("An error occurred while saving the draft.");
        console.error("Save draft error:", error);
      }
    });
  };

  // Button handler for update and save drafts
  const handleSaveClick = () => saveDraft(false); // Save Draft
  const handleUpdateClick = () => saveDraft(true); // Update Draft

  if (isLoading || loading) return <div>Loading...</div>; // Render loading state

  return (
    <div>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3 ">
        <Button className="bg-transparent cursor-pointer items-center gap-1 text-black" onClick={handleSaveClick}>
          <span className="opacity-[.7]">Save Draft</span>
        </Button>
        <Button className="bg-transparent cursor-pointer items-center gap-1 text-black" onClick={handleUpdateClick}>
          <span className="opacity-[.7]">Update Draft</span>
        </Button>
        <Button color="primary" className="cursor-pointer flex items-center gap-1" onClick={exportHtml}>
          <span>Send</span>
        </Button>
      </div>
    </div>
  );
}
