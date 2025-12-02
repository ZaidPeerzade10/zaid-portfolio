"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { personalData } from "@/lib/data.tsx";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Github, Linkedin, Mail, Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { sendEmail, type ContactFormState } from "@/app/actions";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto shadow-glow-primary hover:shadow-lg hover:shadow-primary/40 transition-shadow"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const initialState: ContactFormState = { success: false, message: "" };
  const [formState, formAction] = useActionState(sendEmail, initialState);

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast({
          title: "Message Sent!",
          description: formState.message,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: formState.message,
        });
      }
    }
  }, [formState, toast, form]);

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">
          Get in Touch
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <h3 className="font-headline text-2xl font-semibold">Contact Information</h3>
            <p className="text-muted-foreground">
              Feel free to reach out via email or connect with me on social media.
            </p>
            <div className="space-y-4">
              <a href={`mailto:${personalData.email}`} className="flex items-center gap-4 group">
                <Mail className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors">{personalData.email}</span>
              </a>
              <a href={personalData.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <Linkedin className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors">LinkedIn</span>
              </a>
              <a href={personalData.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <Github className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground group-hover:text-primary transition-colors">GitHub</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form action={formAction} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SubmitButton />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}