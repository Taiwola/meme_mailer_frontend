"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

interface BodyItem {
  id: string | undefined;
  cells: number[];
  columns: {
    contents: {
      type: string;
      values: {
        text: string;
        textColor: string;
        fontSize: number;
        lineHeight: number;
        textAlign: string;
      };
    }[]; // Array of contents
  }[]; // Array of columns
}

interface TemplateBody {
  id: string | undefined;  // Make id optional here, but include it
  rows: BodyItem[];  // Array of BodyItem objects
  headers: BodyItem[];  // Array of BodyItem objects
  footers: BodyItem[];  // Array of BodyItem objects
  values: Record<string, unknown>;  // A dictionary of dynamic values
}

interface Template {
  counters: Record<string, number>;
  body: TemplateBody;  // The body now contains TemplateBody with id
}

const initialTemplate: Template = {
  counters: {},
  body: {
    id: "1", // Optional id within body, can be set to string or undefined
    rows: [
      {
        id: "row1",
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
    headers: [],  // Provide an empty array or specific header items
    footers: [],  // Provide an empty array or specific footer items
    values: {},   // Add dynamic values if required
  },
};







export default function Emaileditor({ subjectTitle }: { subjectTitle: string }) {
  const [jsonData, setJsonData] = useState<Template>(initialTemplate);
  const [loading, setLoading] = useState(true); // Start loading as true by default
  const emailEditorRef = useRef<EditorRef>(null);
  const router = useRouter();

  // Fetch email data using React Query
  const fetchEmail = async () => {
    const token = localStorage.getItem("token");
    const newsletterId = localStorage.getItem('newsletterId');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!newsletterId || !token) {
      setLoading(false);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/newsletter/${newsletterId}`, {
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
  const {isLoading } = useQuery("fetchEmail", fetchEmail, {
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

  const sendMail = async (content: typeof initialTemplate) => {

    const token = localStorage.getItem("token");
    const newsletterId = localStorage.getItem('newsletterId');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    if (!newsletterId || !token) {
      toast.error("Error sending mail, newsletter needs to be saved or user needs to be logged in")
      return null;
    }
    const option = {
      content: JSON.stringify(content)
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/mail/${newsletterId}`, {
        method: "POST",
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
        localStorage.removeItem("newsletterId")
        toast.success("Mail sent successfully");
      }
    } catch (error) {
      toast.error("An error occurred while sending the mail.");
      console.error("Error sending mail:", error);
    }
  }


  // Function to export HTML and JSON from the editor
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log("Exported HTML:", html);
      console.log("Exported Design JSON:", design);
      setJsonData(design); // Save design JSON to state if needed
      sendMail(design);
    });
  };

  const onReady: EmailEditorProps["onReady"] = () => {
    console.log("Editor is ready!");
    const unlayer = emailEditorRef.current?.editor;

 // @ts-expect-error: Suppress type error due to dynamic content loading
// eslint-disable-next-line: Ignore ESLint check for this line
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
      const newsletterId = localStorage.getItem('newsletterId');
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
      if (!token) {
        toast.error("No authorization token found.");
        return;
      }
  
      try {
        const res = update ? await fetch(`${API_BASE_URL}/api/newsletter/${newsletterId}`, {
          method: update ? "PATCH" : "POST", // Use PUT for updates
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(option),
        }) :  await fetch(`http://localhost:5000/api/newsletter`, {
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
          localStorage.removeItem("newsletterId")
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
