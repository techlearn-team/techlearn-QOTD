import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import QuestionCard from './components/QuestionCard';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import Stats from './components/Stats';
import Hint from './components/Hint';
import Leaderboard from './components/Leaderboard';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';
import { questionData } from './data/questionData';
import { leaderboardData } from './data/leaderboardData';

function App() {
  const [output, setOutput] = useState(null);

  const handleRunCode = (code, language) => {
    // Mock run functionality - would call API in real app
    console.log('Running code:', { code, language });
    setOutput({
      status: 'running',
      message: 'Executing your code...',
    });

    // Simulate async execution
    setTimeout(() => {
      setOutput({
        status: 'success',
        message: 'Test cases passed!',
        details: `Input: [2,7,11,15], target = 9\nOutput: [0,1]\nExpected: [0,1]\n\n✓ Test case 1 passed\n✓ Test case 2 passed`,
      });
    }, 2000);
  };

  const handleSubmit = (code, language) => {
    // Mock submit functionality
    console.log('Submitting code:', { code, language });
    setOutput({
      status: 'success',
      message: 'Solution submitted successfully! 🎉',
      details: 'Your solution has been accepted.\nRuntime: 68ms (Beats 87.5%)\nMemory: 42.1MB (Beats 91.2%)',
    });
  };

  // Stagger animation for components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Main container with max-width constraint for readability */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>
        <motion.div variants={itemVariants}>
          <QuestionCard question={questionData} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <CodeEditor 
            starterCode={questionData.starterCode}
            onRunCode={handleRunCode}
            onSubmit={handleSubmit}
          />
        </motion.div>
        {output && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <OutputPanel output={output} />
          </motion.div>
        )}
        <motion.div variants={itemVariants}>
          <Stats />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Hint hint={questionData.hint} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Leaderboard leaders={leaderboardData} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Subscribe />
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  )
}

export default App
