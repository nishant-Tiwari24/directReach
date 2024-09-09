"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Container } from "..";

const EmailGenerated = () => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    // Check if window and localStorage are available
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedEmails = localStorage.getItem("emails");
      if (storedEmails) {
        setEmails(JSON.parse(storedEmails));
      }
    }
  }, []);

  return (
    <div className="max-w-2xl">
      {emails.length > 0 ? (
        emails.map((email, index) => (
          <Container className="relative z-0 flex justify-center mt-14">
            <div className="w-full max-w-xl px-4 py-6 rounded-2xl border border-border/100 shadow-md">
              <div key={index}>
                <ReactMarkdown>{email}</ReactMarkdown>
              </div>
            </div>
          </Container>
        ))
      ) : (
        <p>No emails available</p>
      )}
    </div>
  );
};

export default EmailGenerated;
