"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import Select from "react-select";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const MultiInputForm = () => {
  const [formData, setFormData] = useState({
    education: "",
    skills: [],
    experience: "",
    interests: "",
    location: "",
    githubUsername: "",
    leetcodeUsername: "",
    projects: [],
  });

  const createDocument = useMutation(api.documents.createProfile)

  const [loading, setLoading] = useState(false);
  const [collegeOptions, setCollegeOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get(
          "http://universities.hipolabs.com/search?country=India"
        );
        const collegeNames = response.data.map((college: any) => ({
          value: college.name,
          label: college.name,
        }));
        setCollegeOptions(collegeNames);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };
    fetchColleges();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formData.githubUsername) {
        handleGitHubScrape(formData.githubUsername);
      }
      if (formData.leetcodeUsername) {
        handleLeetCodeScrape(formData.leetcodeUsername);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.githubUsername, formData.leetcodeUsername]);

  const handleSkillsChange = (selectedOptions: any) => {
    const selectedSkills = selectedOptions.map((option: any) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedSkills,
    }));
  };

  const handleProjectsChange = (selectedOptions: any) => {
    const selectedProjects = selectedOptions.map((option: any) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      projects: selectedProjects,
    }));
  };

  const handleCollegeChange = (selectedOption: any) => {
    setFormData((prevData) => ({
      ...prevData,
      education: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleGitHubScrape = async (githubUsername: string) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${githubUsername}/repos`
      );
      const repos = response.data;

      if (repos.message) {
        console.error("Invalid GitHub username");
        return;
      }

      const languages = repos
        .map((repo: any) => repo.language)
        .filter(Boolean)
        .join(", ");

      const projectOptions = repos.map((repo: any) => ({
        value: repo.name,
        label: `${repo.name} 
    `,
      }));

      setProjectOptions(projectOptions);
      //@ts-ignore
      setFormData((prevData) => ({
        ...prevData,
        experience: `${repos.length} repositories`,
        skills: [...prevData.skills, ...languages.split(", ")],
      }));
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  const handleLeetCodeScrape = async (leetcodeUsername: string) => {
    try {
      const response = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`
      );
      const leetcodeData = response.data;

      if (leetcodeData.message) {
        console.error("Invalid LeetCode username");
        return;
      }

      setFormData((prevData) => ({
        ...prevData,
        interests: `Solved ${leetcodeData.totalSolved} problems, Ranking: ${leetcodeData.ranking}`,
        mediumQuestionsSolved: leetcodeData.mediumSolved,
        hardQuestionsSolved: leetcodeData.hardSolved,
      }));
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDocument({
        education: formData.education,
        skills: formData.skills,
        experience: formData.experience,
        interests: formData.interests,
        location: formData.location,
        githubUsername: formData.githubUsername,
        leetcodeUsername: formData.leetcodeUsername,
        projects: formData.projects,
      });
      const response = await axios.post("/api/generate-email", formData);
      const generatedEmail = response.data.generatedEmail;
      localStorage.setItem("generatedEmail", generatedEmail);
      router.push(`/discover/email-generated`);
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const skillsOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Java", label: "Java" },
  ];

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

  return (
    <Container className="relative z-0 flex justify-center mt-14">
      <div className="w-full max-w-2xl px-4 py-6 rounded-2xl border border-border/100 shadow-md">
        <div className="flex flex-col items-start gap-4 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <Select
              required
              name="education"
              options={collegeOptions}
              value={collegeOptions.find(
                //@ts-ignore
                (option) => option.value === formData.education
              )}
              onChange={handleCollegeChange}
              className="basic-single-select text-left"
              classNamePrefix="select"
              placeholder="Select your college"
              styles={customStyles}
            />

            <Select
              isMulti
              name="skills"
              options={skillsOptions}
              className="basic-multi-select text-left"
              classNamePrefix="select"
              onChange={handleSkillsChange}
              placeholder="Select your technical skills"
              styles={customStyles}
            />

            <Input
              required
              type="text"
              name="githubUsername"
              placeholder="Enter your GitHub username"
              value={formData.githubUsername}
              onChange={handleChange}
            />

            <Select
              isMulti
              name="projects"
              options={projectOptions}
              className="basic-multi-select text-left"
              classNamePrefix="select"
              onChange={handleProjectsChange}
              placeholder="Select your GitHub projects"
              styles={customStyles}
            />

            <Input
              required
              type="text"
              name="leetcodeUsername"
              placeholder="Enter your LeetCode username"
              value={formData.leetcodeUsername}
              onChange={handleChange}
            />

            <Input
              required
              type="text"
              name="experience"
              placeholder="Enter your experience"
              value={formData.experience}
              onChange={handleChange}
            />

            <Input
              required
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
            />

            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="w-full py-4"
            >
              {loading ? "Generating..." : "Generate the Roadmap"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            By submitting, you agree with our{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default MultiInputForm;
