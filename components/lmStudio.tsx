import { LMStudioClient } from "@lmstudio/sdk";

const client = new LMStudioClient();
async function getLLMResponse() {
  // Get any loaded LLM
  const llm = await client.llm.model();

  const prediction = llm.respond("What is a Capybara?");
  for await (const { content } of prediction) {
    process.stdout.write(content);
  }
}

getLLMResponse();

process.stdout.write("\n");
