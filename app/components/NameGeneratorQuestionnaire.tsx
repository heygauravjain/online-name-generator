import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  onComplete: (data: any) => void;
  initialKeywords?: string;
}

interface Question {
  id: string;
  label: string;
  type: 'text' | 'select';
  description?: string;
  options?: { 
    value: string; 
    label: string;
    description?: string;
  }[];
  placeholder?: string;
}

const questions: Record<string, Question[]> = {
  business: [
    {
      id: 'description',
      label: 'Describe your business',
      type: 'text',
      description: 'What does your business do? What industry are you in?',
      placeholder: 'e.g., tech startup, coffee shop, consulting firm'
    },
    {
      id: 'style',
      label: 'Choose a naming style',
      type: 'select',
      description: 'What kind of name are you looking for?',
      options: [
        { value: 'brandable', label: 'Brandable (e.g., Spotify, Google)' },
        { value: 'compound', label: 'Compound (e.g., Facebook, WordPress)' },
        { value: 'playful', label: 'Playful (e.g., Slack, Twitter)' }
      ]
    }
  ],
  baby: [
    {
      id: 'gender',
      label: 'Choose gender',
      type: 'select',
      options: [
        { value: 'any', label: 'Any' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    }
  ],
  pet: [
    {
      id: 'petType',
      label: 'What type of pet do you have?',
      type: 'select',
      options: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'bird', label: 'Bird' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'description',
      label: 'Describe your pet\'s personality',
      type: 'text',
      description: 'Enter some characteristics of your pet',
      placeholder: 'e.g., playful, energetic, friendly'
    }
  ],
  hashtag: [
    {
      id: 'description',
      label: 'Enter keywords for your hashtag',
      type: 'text',
      description: 'What is your hashtag about?',
      placeholder: 'e.g., fitness motivation'
    }
  ]
};

export default function NameGeneratorQuestionnaire({ isOpen, onClose, type, onComplete, initialKeywords }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    if (isOpen && initialKeywords && type) {
      setAnswers(prev => ({
        ...prev,
        description: initialKeywords
      }));
    }
  }, [isOpen, initialKeywords, type]);

  const currentQuestions = questions[type] || [];
  const currentQuestion = currentQuestions[currentStep];
  const isLastStep = currentStep === currentQuestions.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(answers);
      onClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onClose();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const isNextDisabled = () => {
    const currentAnswer = answers[currentQuestion.id];
    if (currentQuestion.id === 'startsWith' || currentQuestion.id === 'endsWith') {
      return false; // These are optional
    }
    return !currentAnswer || (typeof currentAnswer === 'string' && !currentAnswer.trim());
  };

  const renderQuestion = (currentQuestion: Question) => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'text':
        return (
          <Input
            type="text"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder || "Type your answer..."}
            className="w-full text-lg h-12 rounded-xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <Select
            value={answers[currentQuestion.id] || ''}
            onValueChange={(value) => updateAnswer(value)}
          >
            <SelectTrigger className="w-full text-lg h-12 rounded-xl">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="cursor-pointer"
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-gray-500">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-0 gap-0 rounded-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
          <DialogTitle className="text-2xl font-bold text-white">{currentQuestion?.label}</DialogTitle>
          <DialogDescription className="text-white/90 text-base">{currentQuestion?.description}</DialogDescription>
        </DialogHeader>

        <div className="p-6">{renderQuestion(currentQuestion)}</div>

        <DialogFooter className="p-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between w-full items-center">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="border-gray-200 hover:bg-gray-50"
            >
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {currentQuestions.length}
              </span>
              <Button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
              >
                {isLastStep ? 'Generate Names' : 'Next'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 