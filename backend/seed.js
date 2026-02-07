require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Question = require('./models/Question');

const seedQuestions = [
  // Question 1: Matching the PDF "Two Sum" exactly 
  {
    title: "Two Sum with Sorted Array",
    difficulty: "Beginner",
    topic: "Array",
    timeToSolve: "15-20 min",
    xp: 20,
    problemStatement: "Given a sorted array of integers and a target sum, find two numbers that add up to the target. Return the indices of these two numbers (1-indexed).",
    
    // Top-level sample for cards
    sampleInput: "array = [1,3,5,7,11], target = 8",
    sampleOutput: "[2, 3]",
    
    // The 3 sets required by the frontend [cite: 196, 203, 206]
    examples: [
      {
        input: "array = [1,3,5,7,11], target = 8",
        output: "[2, 3]",
        explanation: "array[2] + array[3] = 3 + 5 = 8"
      },
      {
        input: "array = [2,4,6,8], target = 10",
        output: "[2, 4]",
        explanation: "array[2] + array[4] = 4 + 6 = 10"
      },
      {
        input: "array = [-1,0,3,5,9,12], target = 4",
        output: "[2, 4]",
        explanation: "array[2] + array[4] = 0 + 4 = 4"
      }
    ],
    
    expectedOutput: "[2, 3]",
    hints: ["Use two pointers starting from left and right.", "If sum is greater than target, decrease right pointer."],
    constraints: ["2 <= array.length <= 10^4", "-10^9 <= array[i] <= 10^9", "Array is sorted in ascending order"],
    
    testCases: [
        { input: "1 3 5 7 11 8", output: "[2, 3]" }, // Format depends on your runner logic
        { input: "2 4 6 8 10", output: "[2, 4]" }
    ],
    solution: {
      python: `def twoSum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        curSum = numbers[l] + numbers[r]
        if curSum > target:
            r -= 1
        elif curSum < target:
            l += 1
        else:
            return str([l + 1, r + 1])
    return "[]"`,
      java: `public class Solution {
    public static String solve(int[] numbers, int target) {
        int l = 0, r = numbers.length - 1;
        while (l < r) {
            int sum = numbers[l] + numbers[r];
            if (sum == target) return "[" + (l + 1) + ", " + (r + 1) + "]";
            else if (sum < target) l++;
            else r--;
        }
        return "[]";
    }
}`
    }
  },

  // Question 2: Intermediate
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Intermediate",
    topic: "Sliding Window",
    timeToSolve: "25-30 min",
    xp: 30,
    problemStatement: "Given a string s, find the length of the longest substring without repeating characters.",
    
    sampleInput: "s = \"abcabcbb\"",
    sampleOutput: "3",
    
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      },
      {
        input: "s = \"bbbbb\"",
        output: "1",
        explanation: "The answer is 'b', with the length of 1."
      },
      {
        input: "s = \"pwwkew\"",
        output: "3",
        explanation: "The answer is 'wke', with the length of 3. Note that the answer must be a substring, 'pwke' is a subsequence and not a substring."
      }
    ],

    expectedOutput: "3",
    hints: ["Keep a sliding window.", "Use a set to store characters in the current window."],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    
    testCases: [
        { input: "abcabcbb", output: "3" },
        { input: "bbbbb", output: "1" }
    ],
    solution: {
      python: `def lengthOfLongestSubstring(s):
    charSet = set()
    l = 0
    res = 0
    for r in range(len(s)):
        while s[r] in charSet:
            charSet.remove(s[l])
            l += 1
        charSet.add(s[r])
        res = max(res, r - l + 1)
    return str(res)`,
      java: `import java.util.HashSet;
public class Solution {
    public static String solve(String s) {
        HashSet<Character> set = new HashSet<>();
        int l = 0, res = 0;
        for (int r = 0; r < s.length(); r++) {
            while (set.contains(s.charAt(r))) {
                set.remove(s.charAt(l));
                l++;
            }
            set.add(s.charAt(r));
            res = Math.max(res, r - l + 1);
        }
        return String.valueOf(res);
    }
}`
    }
  },

  // Question 3: Advanced
  {
    title: "Trapping Rain Water",
    difficulty: "Advanced",
    topic: "Two Pointers",
    timeToSolve: "40-45 min",
    xp: 40,
    problemStatement: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    
    sampleInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
    sampleOutput: "6",
    
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "The water trapped is bounded by the heights 4 and 5."
      },
      {
        input: "height = [4,2,3]",
        output: "1",
        explanation: "One unit of water is trapped between 4 and 3 on top of the bar of height 2."
      }
    ],

    expectedOutput: "6",
    hints: ["Try to pre-compute max height to the left and right of index i.", "Use two pointers to optimize space."],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    
    testCases: [
        { input: "0 1 0 2 1 0 1 3 2 1 2 1", output: "6" },
        { input: "4 2 0 3 2 5", output: "9" }
    ],
    solution: {
      python: `def trap(height):
    if not height: return "0"
    l, r = 0, len(height) - 1
    leftMax, rightMax = height[l], height[r]
    res = 0
    while l < r:
        if leftMax < rightMax:
            l += 1
            leftMax = max(leftMax, height[l])
            res += leftMax - height[l]
        else:
            r -= 1
            rightMax = max(rightMax, height[r])
            res += rightMax - height[r]
    return str(res)`,
      java: `public class Solution {
    public static String solve(int[] height) {
        if (height == null || height.length == 0) return "0";
        int l = 0, r = height.length - 1;
        int leftMax = height[l], rightMax = height[r];
        int res = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                res += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                res += rightMax - height[r];
            }
        }
        return String.valueOf(res);
    }
}`
    }
  }
];

const seedDB = async () => {
  await connectDB();
  try {
    // Force delete to ensure schema changes apply cleanly
    await Question.deleteMany(); 
    console.log('Old Data destroyed...');

    await Question.insertMany(seedQuestions);
    console.log('New Team Data (v3) Imported!');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();