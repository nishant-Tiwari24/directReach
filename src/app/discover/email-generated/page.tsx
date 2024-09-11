"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EmailGenerated = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [referral, setReferral] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState<string | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("generatedEmail");
    const storedReferral = localStorage.getItem("generatedReferral");
    const storedCompanyName = localStorage.getItem("companyName");
    const storedEmployeeName = localStorage.getItem("employeeName");

    if (storedEmail) setEmail(storedEmail);
    if (storedReferral) setReferral(storedReferral);
    if (storedCompanyName) setCompanyName(storedCompanyName);
    if (storedEmployeeName) setEmployeeName(storedEmployeeName);

    // Delay to simulate AI text generation
    setTimeout(() => {
      setIsTextVisible(true);
    }, 1000); // Adjust the delay as needed
  }, []);

  const handleLinkedInSearch = () => {
    const linkedInSearchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
      `${employeeName} ${companyName}`
    )}`;
    window.open(linkedInSearchUrl, "_blank");
  };

  const handleCompanyLinkedInJobs = () => {
    const companyJobsUrl = `https://www.linkedin.com/search/results/people/?currentCompany=${encodeURIComponent(
      companyName || ""
    )}`;
    window.open(companyJobsUrl, "_blank");
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-left mb-2">Email Generated</h1>

        {email ? (
          isTextVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-4 border border-zinc-500 rounded-md mb-4"
            >
              <ReactMarkdown className="prose prose-lg text-left break-words">
                {email}
              </ReactMarkdown>
            </motion.div>
          )
        ) : (
          <p className="text-lg text-left mb-4">No email generated yet.</p>
        )}

        {email && isTextVisible && (
          <div className="flex justify-end mt-2">
            <Button variant="white" className="mt-4 cursor-pointer" asChild>
              <Link
                href={`mailto:${email}?subject= Application for Software Developer Intern Position &body=${encodeURIComponent(
                  email
                )}`}
              >
                Send mail to the Recipient
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-left mb-2">Referral Generated</h1>

        {referral ? (
          isTextVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-4 border border-zinc-500 rounded-md mb-4"
            >
              <ReactMarkdown className="prose prose-lg text-left break-words">
                {referral}
              </ReactMarkdown>
            </motion.div>
          )
        ) : (
          <p className="text-lg text-left mb-4">No referral generated yet.</p>
        )}

        {employeeName && companyName && (
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handleLinkedInSearch}>Find {employeeName} on LinkedIn</Button>
            <Button onClick={handleCompanyLinkedInJobs}>
              View {companyName} Jobs on LinkedIn
            </Button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default EmailGenerated;
