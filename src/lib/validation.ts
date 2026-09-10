import { z } from "zod";

/** Demo / contact request submitted from the site. */
export const demoRequestSchema = z.object({
  name: z.string().min(2, "Votre nom est requis").max(120),
  email: z.string().email("Adresse e-mail invalide").max(160),
  federation: z.string().min(2, "Le nom de votre organisation est requis").max(160),
  role: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  // honeypot — must stay empty
  company: z.string().max(0).optional().or(z.literal("")),
});

export type DemoRequest = z.infer<typeof demoRequestSchema>;
