"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const EmailGenerated = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("generatedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleCopy = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-left">Email Generated</h1>
        {email && (
          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Copy Email
          </button>
        )}
      </div>

      {email ? (
        <div className="p-4 border border-zinc-500 rounded-md">
          <ReactMarkdown className="prose prose-lg text-left break-words">
            {email}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="text-lg text-left">No email generated yet.</p>
      )}

      <div className="mt-6 self-center">
        {email && (
          <Button variant="white" className="mt-6 cursor-pointer" asChild>
            <Link
              href={`mailto:nishanttiwarii320@gmail.com?subject=Your Personalized Cold Email&body=${encodeURIComponent(
                email
              )}`}
            >
              Send mail to the Recipient
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default EmailGenerated;
