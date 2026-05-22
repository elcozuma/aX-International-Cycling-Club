import { useState } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  expedition: z.string().min(1, "Please select an expedition"),
  message: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", expedition: "", message: "" }
  });

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    setSubmitted(true);
  }

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans"
      style={{ backgroundImage: "url('/page-bg-v2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col px-8 md:px-16 py-8 overflow-y-auto">

          {/* Logo — top-left of block */}
          <img
            src="/ax-logo.png"
            alt="a-X"
            className="absolute -bottom-2 right-5 z-20 h-20 md:h-24 w-auto opacity-75 pointer-events-none select-none"
          />

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={rubikOne}
            className="text-base md:text-lg normal-case text-accent leading-tight mb-1 flex-shrink-0"
          >
            GET IN TOUCH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs text-foreground/45 mb-6 flex-shrink-0"
            style={nunito}
          >
            Questions about the club or events? Send us a message.
          </motion.p>

          <div className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-widest text-foreground/50" style={rubikOne}>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Full name"
                                  {...field}
                                  className="bg-white/5 border-white/15 rounded-lg h-10 text-sm focus:border-accent"
                                  style={nunito}
                                  data-testid="input-name"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-widest text-foreground/50" style={rubikOne}>Email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Email address"
                                  type="email"
                                  {...field}
                                  className="bg-white/5 border-white/15 rounded-lg h-10 text-sm focus:border-accent"
                                  style={nunito}
                                  data-testid="input-email"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="expedition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-widest text-foreground/50" style={rubikOne}>Expedition interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-white/5 border-white/15 rounded-lg h-10 text-sm" style={nunito} data-testid="select-expedition">
                                  <SelectValue placeholder="Select a route" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-card border-white/15 rounded-lg">
                                <SelectItem value="anti-atlas" className="text-sm" style={nunito}>March 2027 — Anti-Atlas Morocco</SelectItem>

                                <SelectItem value="general" className="text-sm" style={nunito}>General enquiry</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-widest text-foreground/50" style={rubikOne}>Message / riding experience</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your setup and experience..."
                                className="bg-white/5 border-white/15 rounded-lg min-h-[80px] resize-none text-sm focus:border-accent"
                                style={nunito}
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full rounded-lg bg-accent hover:bg-accent/90 text-background h-11 tracking-widest text-sm mt-2"
                        style={rubikOne}
                        data-testid="button-submit"
                      >
                        SEND MESSAGE
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-5 flex items-center justify-between text-xs text-foreground/30 pt-4 border-t border-white/10" style={nunito}>
                    <a href="mailto:contact@a-x.cc" className="hover:text-foreground/60 transition-colors">contact@a-x.cc</a>
                    <a href="https://instagram.com/a_x_cc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/60 transition-colors">@a_x_cc</a>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center space-y-5"
                  data-testid="status-success"
                >
                  <div className="w-14 h-14 border border-accent mx-auto rounded-full flex items-center justify-center">
                    <div className="w-7 h-7 bg-accent rounded-full" />
                  </div>
                  <h3 className="text-lg text-foreground" style={rubikOne}>MESSAGE RECEIVED</h3>
                  <p className="text-sm text-foreground/60 max-w-sm mx-auto" style={nunito}>
                    Your message has been logged. We'll review it and get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => { form.reset(); setSubmitted(false); }}
                    className="rounded-lg border-white/20 hover:bg-white/10 text-xs tracking-widest uppercase mt-4"
                    style={rubikOne}
                  >
                    Send another
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
