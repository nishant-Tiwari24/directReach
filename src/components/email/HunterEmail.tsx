"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "react-select";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const HunterEmailFinder = () => {
  const [companyName, setCompanyName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [purpose, setPurpose] = useState<string | null>("interview");
  const [jobRole, setJobRole] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createDocument = useMutation(api.emailMutation.createEmailSearch);

  const handleFindEmail = async () => {
    if (!companyName || !employeeName || !jobTitle || !jobRole || !purpose) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    const [firstName, ...lastNameArray] = employeeName.split(" ");
    const lastName = lastNameArray.join(" ");

    try {
      const apiKey = process.env.HUNTER_APIKEY;
      const response = await fetch(
        `https://api.hunter.io/v2/email-finder?domain=${companyName}.com&first_name=${firstName}&last_name=${lastName}&api_key=${apiKey}`
      );
      const data = await response.json();

      if (data.data && data.data.email) {
        setEmail(data.data.email);
        localStorage.setItem("companyName", companyName);
        localStorage.setItem("employeeName", employeeName);
        const referralResponse = await axios.post("/api/generate-referral", {
          companyName,
          employeeName: { firstName, lastName },
          jobTitle,
          jobRole,
          purpose,
        });
        const generatedReferral = referralResponse.data.generatedReferral;
        localStorage.setItem("generatedReferral", generatedReferral);

        await createDocument({
          companyName,
          employeeName: { firstName, lastName },
          jobTitle,
          jobRole,
          purpose,
          email: data.data.email,
          generatedReferral,
        });
      } else {
        setError("Email not found for this employee.");
      }
    } catch (err) {
      setError("An error occurred while fetching the email.");
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#000",
      borderColor: "#101D33",
      color: "#03060E",
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#004BE1" : "#03060E",
      color: "#7E8493",
      "&:hover": {
        backgroundColor: "#004BE1",
        color: "#7E8493",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#7E8493",
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#fff",
      color: "#7E8493",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#7E8493",
    }),
  };

  const options = [
    { value: "interview", label: "I want an Interview" },
    { value: "networking", label: "I want Industry connections" },
    { value: "job-application", label: "I want to apply for a job" },
    { value: "follow-up", label: "I want to send a follow-up message" },
  ];

  return (
    <section className="w-full max-w-2xl mx-auto py-8">
      <div className="flex flex-col space-y-4">
        <Select
          required
          name="purpose"
          options={options}
          value={options.find((option) => option.value === purpose)}
          className="basic-single-select text-left"
          classNamePrefix="select"
          placeholder="Select your purpose"
          styles={customStyles}
          onChange={(selectedOption: any) =>
            setPurpose(selectedOption?.value ?? null)
          }
        />

        <Input
          type="text"
          placeholder="Enter Company Domain (e.g., reddit.com)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Enter Job Title (e.g., Software Engineer)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Enter Job Role (e.g., Internship, SDE1)"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
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
