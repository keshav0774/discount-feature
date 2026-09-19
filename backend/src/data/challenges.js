const starter = '// Write your solution here\n';
const topics = [
  ['array', ['Two Sum', 'Best Time to Buy and Sell Stock', 'Product of Array Except Self']],
  ['string', ['Valid Anagram', 'Longest Substring Without Repeating Characters', 'Longest Palindromic Substring']],
  ['linked-list', ['Reverse Linked List', 'Merge Two Sorted Lists', 'Linked List Cycle']],
  ['stack', ['Valid Parentheses', 'Min Stack', 'Daily Temperatures']],
  ['queue', ['Implement Queue using Stacks', 'Design Circular Queue', 'First Unique Character in a Stream']],
  ['tree', ['Maximum Depth of Binary Tree', 'Binary Tree Level Order Traversal', 'Diameter of Binary Tree']],
  ['bst', ['Validate Binary Search Tree', 'Kth Smallest Element in a BST', 'Lowest Common Ancestor of a BST']],
  ['heap', ['Kth Largest Element in an Array', 'Top K Frequent Elements', 'Find Median from Data Stream']],
  ['graph', ['Number of Islands', 'Clone Graph', 'Course Schedule']],
  ['dp', ['Climbing Stairs', 'House Robber', 'Coin Change']]
];


export const dsaChallenges = topics.flatMap(([topic, titles], group) => titles.map((title, index) => ({
  id: String(group * 3 + index + 1), topic, title,
  statement: `Solve the ${title} problem using an efficient ${topic} approach. Explain assumptions in your submission.`,
  starterCode: starter
})));
export const promptChallenges = [{ id: 'prompt-1', title: 'Support reply prompt', description: 'Write a prompt that turns a support issue into a concise, empathetic response.' }];
export const debugChallenges = [{ id: 'debug-1', title: 'Async response bug', description: 'Identify why an API response can be sent twice in the provided sample.' }];
export const vulnerabilityChallenges = [{ id: 'vuln-1', title: 'IDOR check', description: 'Find the authorization weakness in a resource lookup endpoint.' }];
export const challengeData = { 'solve-ptod': dsaChallenges, 'write-prompt': promptChallenges, 'debug-backend': debugChallenges, 'find-vulnerability': vulnerabilityChallenges };
