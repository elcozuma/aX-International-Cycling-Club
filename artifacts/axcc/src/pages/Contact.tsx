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
    defaultValues: {
      name: "",
      email: "",
      expedition: "",
      message: ""
    }
  });

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    setSubmitted(true);
  }

  return (
    <div className="relative min-h-[100dvh] w-full text-foreground font-sans" style={{ backgroundImage: "url('/page-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <Nav />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24 min-h-[100dvh] flex flex-col justify-center">
        
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display text-accent mb-4 tracking-widest uppercase"
          >
            JOIN AN EXPEDITION
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-xl opacity-80"
          >
            Briefings are limited. Capable riders only.
          </motion.p>
        </div>

        <div className="bg-card border border-border p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display tracking-widest text-xs uppercase opacity-80">NAME</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Full Name" 
                                {...field} 
                                className="bg-background border-border rounded-none h-12 font-mono text-sm"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive font-mono text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-display tracking-widest text-xs uppercase opacity-80">EMAIL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Email Address" 
                                type="email" 
                                {...field} 
                                className="bg-background border-border rounded-none h-12 font-mono text-sm"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage className="text-destructive font-mono text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="expedition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-display tracking-widest text-xs uppercase opacity-80">EXPEDITION INTEREST</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-background border-border rounded-none h-12 font-mono text-sm" data-testid="select-expedition">
                                <SelectValue placeholder="Select Route" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border rounded-none">
                              <SelectItem value="anti-atlas" className="font-mono text-sm">MARCH 2027 - ANTI-ATLAS MOROCCO</SelectItem>
                              <SelectItem value="pamir" className="font-mono text-sm">SEPTEMBER 2027 - PAMIR HIGHWAY</SelectItem>
                              <SelectItem value="atlas-atlantic" className="font-mono text-sm">APRIL 2028 - ATLAS TO ATLANTIC</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-destructive font-mono text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-display tracking-widest text-xs uppercase opacity-80">NOTES / RIDING EXPERIENCE</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your setup and experience..."
                              className="bg-background border-border rounded-none min-h-[120px] resize-none font-mono text-sm"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage className="text-destructive font-mono text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full rounded-none bg-accent hover:bg-accent/90 text-background h-14 font-display tracking-widest text-base mt-4"
                      data-testid="button-submit"
                    >
                      SEND INQUIRY
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center space-y-6"
                data-testid="status-success"
              >
                <div className="w-16 h-16 border-2 border-accent mx-auto rounded-full flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-accent rounded-full" />
                </div>
                <h3 className="font-display text-3xl tracking-widest text-foreground">MESSAGE RECEIVED</h3>
                <p className="font-mono text-sm opacity-80 max-w-md mx-auto">
                  Your inquiry has been logged. We will review your brief and contact you with further details.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setSubmitted(false);
                  }}
                  className="rounded-none border-border hover:bg-background mt-8 font-display tracking-widest uppercase text-xs"
                >
                  Return to form
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between font-mono text-sm opacity-60 pt-8 border-t border-border/50"
        >
          <a href="mailto:contact@a-x.cc" className="hover:text-accent transition-colors mb-4 sm:mb-0">
            contact@a-x.cc
          </a>
          <a href="https://instagram.com/a_x_cc" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            @a_x_cc
          </a>
        </motion.div>

      </div>
    </div>
  );
}
