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
  title: string;
  description: string;
  type: 'text' | 'select' | 'multiselect' | 'style';
  options?: { id: string; name: string; description?: string }[];
}

const questions: Record<string, Question[]> = {
  business: [
    {
      id: 'description',
      title: 'What does your business do?',
      description: 'Describe your business in a few words',
      type: 'text',
    },
    {
      id: 'industry',
      title: 'Select your industry',
      description: 'Choose the industry that best matches your business',
      type: 'select',
      options: [
        { id: 'tech', name: 'Technology' },
        { id: 'retail', name: 'Retail' },
        { id: 'health', name: 'Healthcare' },
        { id: 'finance', name: 'Finance' },
        { id: 'creative', name: 'Creative' },
        { id: 'food', name: 'Food & Restaurant' },
        { id: 'education', name: 'Education' },
        { id: 'entertainment', name: 'Entertainment' },
      ],
    },
    {
      id: 'style',
      title: 'Choose your preferred name style',
      description: 'Select the style that best represents your brand',
      type: 'style',
      options: [
        { id: 'brandable', name: 'Brandable', description: 'Made-up words that sound memorable (e.g., Spotify, Zillow)' },
        { id: 'compound', name: 'Compound', description: 'Two words combined (e.g., Facebook, YouTube)' },
        { id: 'playful', name: 'Playful', description: 'Fun and energetic names (e.g., Google, Yahoo)' },
        { id: 'traditional', name: 'Traditional', description: 'Classic and timeless names' },
      ],
    },
  ],
  baby: [
    {
      id: 'gender',
      title: 'Choose the gender',
      description: 'Select the gender for the baby name',
      type: 'select',
      options: [
        { id: 'male', name: 'Boy' },
        { id: 'female', name: 'Girl' },
      ],
    },
    {
      id: 'startsWith',
      title: 'Starting letter (optional)',
      description: 'Choose a letter the name should start with',
      type: 'text',
    },
    {
      id: 'endsWith',
      title: 'Ending letter (optional)',
      description: 'Choose a letter the name should end with',
      type: 'text',
    },
  ],
  hashtag: [
    {
      id: 'word1',
      title: 'Enter your first keyword',
      description: 'What is the main topic or brand name?',
      type: 'text',
    },
    {
      id: 'word2',
      title: 'Enter your second keyword',
      description: 'What is the secondary topic or descriptor?',
      type: 'text',
    },
  ],
  pet: [
    {
      id: 'petType',
      title: 'What type of pet do you have?',
      description: 'Select your pet type',
      type: 'select',
      options: [
        { id: 'dog', name: 'Dog' },
        { id: 'cat', name: 'Cat' },
        { id: 'bird', name: 'Bird' },
        { id: 'other', name: 'Other' },
      ],
    },
    {
      id: 'characteristics',
      title: 'Describe your pet',
      description: 'Enter some characteristics of your pet (personality, appearance)',
      type: 'text',
    },
  ],
};

export default function NameGeneratorQuestionnaire({ isOpen, onClose, type, onComplete, initialKeywords }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    if (initialKeywords && isOpen) {
      setAnswers(prev => ({ ...prev, description: initialKeywords }));
    }
  }, [initialKeywords, isOpen]);

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

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <Input
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder="Type your answer..."
            maxLength={currentQuestion.id.includes('With') ? 1 : undefined}
            className="w-full text-lg h-12 rounded-xl border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <Select value={answers[currentQuestion.id]} onValueChange={updateAnswer}>
            <SelectTrigger className="w-full h-12 text-left">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem 
                  key={option.id} 
                  value={option.id}
                  className="cursor-pointer"
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'style':
        return (
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options?.map((style) => (
              <Card
                key={style.id}
                className={`cursor-pointer transition-all ${
                  answers[currentQuestion.id] === style.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:bg-gray-50 border border-gray-200'
                }`}
                onClick={() => updateAnswer(style.id)}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-semibold">{style.name}</CardTitle>
                  <CardDescription className="text-gray-600">{style.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-0 gap-0 rounded-2xl">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
          <DialogTitle className="text-2xl font-bold text-white">{currentQuestion?.title}</DialogTitle>
          <DialogDescription className="text-white/90 text-base">{currentQuestion?.description}</DialogDescription>
        </DialogHeader>

        <div className="p-6">{renderQuestion()}</div>

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