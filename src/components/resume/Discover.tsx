"use client";

import { Container, Wrapper } from "@/components";
import HunterEmailFinder from "@/components/email/HunterEmail";
import MultiInputForm from "@/components/resume/ResumeForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Discover = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <Wrapper className="flex flex-col items-center justify-center py-12 relative">
      <Container>
        <div className="flex flex-col items-center justify-center relative w-full text-center">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl lg:!leading-snug font-semibold mt-8">
            Find the Email of any Company's Employee <br /> Send a 10x Better
            Personalized Cold Email
          </h2>

          <div className="w-full max-w-lg mt-6">
            <div className="h-1 w-full bg-gray-200 relative">
              <motion.div
                className="h-full bg-blue-500 absolute"
                initial={{ width: step === 1 ? "50%" : "0%" }}
                animate={{ width: step === 2 ? "100%" : "50%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="w-full flex justify-center mt-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center w-full max-w-lg"
                >
                  <HunterEmailFinder />
                  <Button
                    onClick={nextStep}
                    className="mt-4 flex items-center gap-2"
                  >
                    Next Step
                    <ArrowRight />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center w-full max-w-lg"
                >
                  <MultiInputForm />
                  <Button
                    onClick={prevStep}
                    className="mt-4 flex items-center gap-2"
                  >
                    Previous Step
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Discover;
