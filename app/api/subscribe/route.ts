import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "h2sa47ov",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate
    const existing = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]._id`,
      { email: normalizedEmail }
    );

    if (existing) {
      // Already subscribed — still return success so UI shows thank-you
      return NextResponse.json({ ok: true, duplicate: true });
    }

    await writeClient.create({
      _type: "subscriber",
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
