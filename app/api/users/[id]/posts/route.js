import { connectToDB } from "@utils/db";
import Prompt from "@app/models/Prompt";

export const GET = async (req, { params }) => {
  const { id: userId } = await params;

  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: userId }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
