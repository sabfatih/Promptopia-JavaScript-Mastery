import { connectToDB } from "@utils/db";
import Prompt from "@app/models/Prompt";

export const POST = async (req) => {
  const { userId, prompt, tags } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tags: tags || [],
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
