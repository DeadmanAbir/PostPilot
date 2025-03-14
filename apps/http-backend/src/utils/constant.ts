export const improveQueryPrompt = `Your task is to refine and improve the given user query to make it more structured, detailed, and optimized for generating a high-quality LinkedIn post. Do NOT generate the post itself—only enhance the query to be more effective for an LLM to create a well-crafted LinkedIn post. Ensure clarity, proper context, target audience considerations, and a professional yet engaging tone.`;

export const generatePostPrompt = `Generate a LinkedIn post written in a natural, engaging, and human tone. Use simple vocabulary and a third-person perspective—avoid AI-generated style or pretext. The post should feel organic, as if written by a professional storyteller or industry expert.

If additional context is provided (such as a YouTube transcript, Twitter text, or an image description), incorporate relevant insights to make the post richer and more compelling. Focus on clarity, storytelling, and engagement while keeping it concise and impactful. Avoid jargon-heavy language and keep it approachable for a broad audience.`;

export const regeneratePostPrompt = `
Revise the given LinkedIn post while maintaining a natural, engaging, and human tone. Use simple vocabulary and a third-person perspective—avoid AI-generated style or pretext. Ensure the post feels authentic, as if written by a professional storyteller or industry expert.

Use the previous post and any additional context provided to improve clarity, storytelling, and engagement. If specific feedback is given, incorporate those changes. If no feedback is provided, refine the post for better readability, impact, and flow while keeping the core message intact.
`;
