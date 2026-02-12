function classifyTask(prompt) {
  const text = prompt.toLowerCase();

  // --- Keyword buckets ---
  const writingKeywords = ["email", "write", "summary", "grammar", "paragraph"];
  const codingKeywords = ["code","coding", "function", "bug", "api", "react", "javascript"];
  const researchKeywords = ["research", "compare", "study", "analyze", "report"];
  const reasoningKeywords = ["explain", "why", "reason", "logic", "proof"];

  let intent = "General";
  let complexity = "High";
  let estimatedTokens = 1500;
  let matchedKeywords = [];

  // --- Detect intent ---

  if (reasoningKeywords.some(k => text.includes(k))) {
    intent = "Reasoning";
    matchedKeywords = reasoningKeywords.filter(k => text.includes(k));
  } else if (researchKeywords.some(k => text.includes(k))) {
    intent = "Research";
    matchedKeywords = researchKeywords.filter(k => text.includes(k));
  } else if (codingKeywords.some(k => text.includes(k))) {
    intent = "Coding";
    matchedKeywords = codingKeywords.filter(k => text.includes(k));
  } else if (writingKeywords.some(k => text.includes(k))) {
    intent = "Writing";
    matchedKeywords = writingKeywords.filter(k => text.includes(k));
  }


  // if (writingKeywords.some(k => text.includes(k))) {
  //   intent = "Writing";
  //   matchedKeywords = writingKeywords.filter(k => text.includes(k));
  // } else if (codingKeywords.some(k => text.includes(k))) {
  //   intent = "Coding";
  //   matchedKeywords = codingKeywords.filter(k => text.includes(k));
  // } else if (researchKeywords.some(k => text.includes(k))) {
  //   intent = "Research";
  //   matchedKeywords = researchKeywords.filter(k => text.includes(k));
  // } else if (reasoningKeywords.some(k => text.includes(k))) {
  //   intent = "Reasoning";
  //   matchedKeywords = reasoningKeywords.filter(k => text.includes(k));
  // }

  // --- Determine complexity & token estimate ---
  switch (intent) {
    case "Writing":
      complexity = "Low";
      estimatedTokens = 300;
      break;

    case "Coding":
      complexity = "Medium";
      estimatedTokens = 800;
      break;

    case "Research":
      complexity = "High";
      estimatedTokens = 1500;
      break;

    case "Reasoning":
      complexity = "Medium";
      estimatedTokens = 900;
      break;

    default:
      complexity = "High";
      estimatedTokens = 1200;
  }

  // --- Explanation ---
  const explanation =
    matchedKeywords.length > 0
      ? `Detected a ${complexity.toLowerCase()} ${intent.toLowerCase()} task based on keywords like '${matchedKeywords.join(", ")}'`
      : `Detected a ${complexity.toLowerCase()} general task based on prompt structure`;

  return {
    intent,
    complexity,
    estimatedTokens,
    matchedKeywords,
    explanation
  };
}

module.exports = classifyTask;
