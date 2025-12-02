"use server";

import * as z from "zod";
import { Resend } from "resend";
import { personalData } from "@/lib/data.tsx";
import ContactEmail from "@/emails/contact-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function sendEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const validatedFields = contactFormSchema.safeParse({
    name,
    email,
    message,
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.errors
      .map((e) => e.message)
      .join(", ");
    return {
      success: false,
      message: errorMessage,
    };
  }

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'YOUR_API_KEY_HERE') {
    console.log("Resend API key not found. Returning mock success response.");
    return {
      success: true,
      message: "Message sent successfully! (Mock Response)",
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // This needs to be a verified domain on Resend
      to: personalData.email,
      subject: `New message from ${name} via your portfolio`,
      reply_to: email,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, message: "Failed to send message." };
    }

    return { success: true, message: "Message sent successfully!" };
  } catch (exception) {
    console.error("Exception sending email:", exception);
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
