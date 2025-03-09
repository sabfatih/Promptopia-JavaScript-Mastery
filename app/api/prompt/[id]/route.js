import { connectToDB } from "@utils/db";
import Prompt from "@app/models/Prompt";

// GET
export const GET = async (req, { params }) => {
  const { id: promptId } = await params;

  try {
    await connectToDB();

    const prompt = await Prompt.findById(promptId).populate("creator");

    if (prompt) {
      return new Response(JSON.stringify(prompt), { status: 200 });
    } else {
      return new Response("Failed to get prompt", { status: 404 });
    }
  } catch (e) {
    return new Response("Failed to get prompt", { status: 500 });
  }
};

// PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tags } = await req.json();

  const { id: promptId } = await params;
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(promptId);

    if (existingPrompt) {
      const newPrompt = await Prompt.findByIdAndUpdate(
        promptId,
        { prompt, tags },
        { new: true, runValidators: true }
      );

      return new Response(JSON.stringify(newPrompt), { status: 200 });
    } else {
      return new Response("Failed to find prompt", { status: 404 });
    }
  } catch (e) {
    return new Response("Failed to update prompts", { status: 500 });
  }
};

// DELETE
export const DELETE = async (req, { params }) => {
  const { id: promptId } = await params;

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(promptId);

    if (existingPrompt) {
      await Prompt.findByIdAndDelete(promptId);

      return new Response("Prompt deleted successfully", { status: 200 });
    } else {
      return new Response("Failed to find prompt", { status: 404 });
    }
  } catch (e) {
    return new Response("Failed to update prompts", { status: 500 });
  }
};
