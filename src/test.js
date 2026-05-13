import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  "AIzaSyDrBLr8gBgYEiI6FF-6VgCoV-1O3nSzdzo"
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

async function run() {
  try {
    const result =
      await model.generateContent(
        "Hello"
      );

    console.log(
      result.response.text()
    );
  } catch (error) {
    console.log(error);
  }
}

run();