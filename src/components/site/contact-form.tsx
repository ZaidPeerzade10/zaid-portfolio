"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { sendEmail, type ContactFormState } from "@/app/actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition hover:bg-mist active:scale-[0.97] disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {pending ? "Sending" : "Send message"}
    </button>
  );
}

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-bone placeholder:text-dim focus:border-signal focus:outline-none focus:ring-0 transition-colors";

export function ContactForm() {
  const [state, action] = useActionState<ContactFormState, FormData>(sendEmail, { success: false, message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={action} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mist">Name</span>
          <input name="name" required minLength={2} placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className="text-sm text-mist">Email</span>
          <input name="email" type="email" required placeholder="you@company.com" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-mist">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={4}
          placeholder="What should run itself?"
          className={`${field} resize-none`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <Submit />
        {state.message && (
          <p role="status" className={`text-sm ${state.success ? "text-bone" : "text-red-400"}`}>
            {state.success ? "Message sent. I'll reply by email." : state.message}
          </p>
        )}
      </div>
    </form>
  );
}
