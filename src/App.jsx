import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QuestionCard from './components/QuestionCard';
import CodeEditor from './components/CodeEditor';
import { questionData } from './data/questionData';

function App() {
  const [output, setOutput] = useState(null);

  const handleRunCode = (code, language) => {
    // Mock run functionality - would call API in real app
    console.log('Running code:', { code, language });
    setOutput({
      status: 'running',
      message: 'Executing your code...',
    });
  };

  const handleSubmit = (code, language) => {
    // Mock submit functionality
    console.log('Submitting code:', { code, language });
    setOutput({
      status: 'success',
      message: 'Code submitted successfully!',
    });
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Main container with max-width constraint for readability */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <Hero />
        <QuestionCard question={questionData} />
        <CodeEditor 
          starterCode={questionData.starterCode}
          onRunCode={handleRunCode}
          onSubmit={handleSubmit}
        />
        
        {/* Page content will go here */}
        <div className="space-y-8">
          <p className="text-center text-neutral-500">More components coming next...</p>
        </div>
      </div>
    </div>
  )
}

export default App
