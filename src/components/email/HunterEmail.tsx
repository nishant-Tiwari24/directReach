"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const HunterEmailFinder = () => {
  const [companyName, setCompanyName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [JobRole, SetJobRole] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFindEmail = async () => {
    if (!companyName || !employeeName) {
      setError("Please provide both company and employee names.");
      return;
    }

    setError(null);
    const [firstName, ...lastNameArray] = employeeName.split(" ");
    const lastName = lastNameArray.join(" ");

    try {
      const apiKey = "2301d3179995a5872ac5ad81bd7081056a31ecb8";
      const response = await fetch(
        `https://api.hunter.io/v2/email-finder?domain=${companyName}&first_name=${firstName}&last_name=${lastName}&api_key=${apiKey}`
      );

      const data = await response.json();

      if (data.data && data.data.email) {
        setEmail(data.data.email);
      } else {
        setError("Email not found for this employee.");
      }
    } catch (err) {
      setError("An error occurred while fetching the email.");
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto py-8">
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Enter Company Domain (e.g., reddit.com)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Enter Job Title (e.g., Software engineer)"
          value={employeeName}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Enter Job Role (e.g., Internship, SDE1)"
          value={employeeName}
          onChange={(e) => SetJobRole(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Enter Employee Name (e.g., Alexis Ohanian)"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />

        <Button
          onClick={handleFindEmail}
          type="submit"
          size="lg"
          variant="secondary"
        >
          Find Email
        </Button>
      </div>

      {email && (
        <div className="mt-4 p-4 border border-green-500 rounded-md">
          <p className="text-green-600">Email Found: {email}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border border-red-500 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </section>
  );
};

export default HunterEmailFinder;
