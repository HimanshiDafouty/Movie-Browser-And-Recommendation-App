import OpenAI from "openai";
import { OPEN_AI_KEY } from "./constants";


const openai = new OpenAI({
  apiKey: OPEN_AI_KEY,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});
export default openai;
// import Groq from "groq-sdk";
// import { OPENAPI_KEY } from "./constants";

// const groq = new Groq (
//     {
//         apiKey : OPENAPI_KEY,
//         dangerouslyAllowBrowser : true

//     }
// )
// export default groq;