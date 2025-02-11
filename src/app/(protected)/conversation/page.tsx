"use client";

import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  // prompt: z.string().nonempty(),
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
});

export default function ConversationPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  // const handleSubmit = form.handleSubmit(async (data) => {});
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <div>
      <Heading
        title="Conversation"
        description="Chat with the smartest AI and experience its mind bending reasoning capabilities"
        icon={MessageSquare}
        iconColor="text-violet-700"
        bgColor="bg-violet-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                grid grid-cols-12 gap-2
                w-full p-4 px-3 md:px-6
                border rounded-lg focus-within:shadow-md
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >Generate</Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          Message content
        </div>
      </div>
    </div>
  );
}
