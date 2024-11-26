import { User } from "@/types/user.types";


export const generatePromptForGemini = (
  userDetails: User,
  userSpecifications: string
): string => {
  // Static part: Roadmap schema definition
  const staticPrompt = `
### Instructions:

You are tasked with creating a roadmap for a user based on the strict structure outlined below. This structure must be followed **exactly** as specified, regardless of the user’s preferences. The content of the roadmap (task titles, subtopics, resources, etc.) should be customized based on the user’s details and specifications, but the schema itself must remain unchanged.

---

### **Roadmap Structure (Static Schema)**:
The roadmap must be structured into an array of tasks. Each task should include the following fields:

- **title**: (String) A descriptive title for the task. Example: "Learn JavaScript Basics."
- **duration**: (Number) Estimated time to complete the task, in days. Example: 10.
- **subtopics**: (Array of Objects) Each subtopic includes:
  - **title**: (String) Name of the subtopic. Example: "What are Variables?"
  - **resources**: (String) A resource link to learn the subtopic. Example: "https://developer.mozilla.org".
- **is_completed**: (Boolean) Whether the task has been completed. Default: false.
- **prerequisites**: (Array of Strings) Any tasks or topics that should be completed before starting this task. Example: ["Basic HTML", "Basic CSS"].

You must not deviate from this structure under any circumstances. Any additional details must fit into the fields outlined above.
`;

  // Dynamic part: User details
  const userDetailsPrompt = `
---

### **User Details**:
The following are details about the user:
- **Name**: ${userDetails.username}
- **Goal**: ${userDetails.goal}
- **Current Status**: ${userDetails.current_status || "Not specified"}
- **Other Information**: ${userDetails.other_details || "Not provided"}
`;

  // Dynamic part: User specifications
  const userSpecificationsPrompt = `
---

### **User Specifications**:
The user has requested the roadmap to:
- ${userSpecifications} "No additional notes provided"}
`;

  // Final part: Example and instruction for Gemini
  const finalInstructions = `
---

### **Expected Output**:
Combine the above user details and specifications with the roadmap structure to create a personalized roadmap. While customizing the roadmap content based on the user’s preferences, **do not modify the defined structure**. 

The roadmap must be logically structured, progressing from beginner to advanced topics in alignment with the user’s goal and specifications.

---

### **Deliverable**:
Output an array of tasks adhering strictly to the structure defined above.
`;

  // Combine all parts into a final prompt
  const finalPrompt = `${staticPrompt}${userDetailsPrompt}${userSpecificationsPrompt}${finalInstructions}`;

  return finalPrompt;
};
