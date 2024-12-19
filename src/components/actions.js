

'use server';
const { GoogleGenerativeAI } = require("@google/generative-ai");


import axios from "axios";
const GenerateMCQ = async (text) => {


    /**
     * input : text
     * call the gemini api  
     * return mcqs
     */




    return await callGeminiAPI(text);


}


const callGeminiAPI = async (payload) => {

    const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY);


    let systemInstructions = `
   answers based on the text.

Your response must be a JSON object containing 20 questions and answers.

Each question and answer object should have the following schema:

question: The question text.
options: An array containing multiple optionAndExplain objects.
Each optionAndExplain object must have the following properties:

option: The option text.
isCorrect: A boolean value indicating whether the option is correct (true) or incorrect (false).
explanation: If isCorrect is true, explain why it is correct; if false, explain why it is incorrect.


Example: 

"Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water. It primarily occurs in the chloroplasts of plant cells, where chlorophyll captures light energy. Oxygen is released as a byproduct of this process."
Example json  containing two question
{
  "questions": [
    {
      "question": "What is the primary purpose of photosynthesis?",
      "options": [
        {
          "option": "To produce oxygen for animals to breathe",
          "isCorrect": false,
          "explanation": "While oxygen is a byproduct of photosynthesis, the primary purpose is to produce nutrients for the plant."
        },
        {
          "option": "To synthesize nutrients for the plant",
          "isCorrect": true,
          "explanation": "Photosynthesis allows plants to create nutrients from carbon dioxide and water using sunlight."
        },
        {
          "option": "To absorb carbon dioxide from the air",
          "isCorrect": false,
          "explanation": "Although plants absorb carbon dioxide during photosynthesis, it is not the primary purpose of the process."
        }
      ]
    },
    {
      "question": "Where does photosynthesis primarily occur in plant cells?",
      "options": [
        {
          "option": "In the mitochondria",
          "isCorrect": false,
          "explanation": "Mitochondria are involved in cellular respiration, not photosynthesis."
        },
        {
          "option": "In the chloroplasts",
          "isCorrect": true,
          "explanation": "Photosynthesis occurs in the chloroplasts, where chlorophyll captures light energy."
        },
        {
          "option": "In the nucleus",
          "isCorrect": false,
          "explanation": "The nucleus controls cellular activities but does not play a role in photosynthesis."
        }
      ]
    }
  ]
}`


    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" ,systemInstruction: systemInstructions});

    const prompt = payload || "";

    const result = await model.generateContent(prompt);

    return result.response.text()


}
export {
    GenerateMCQ
}