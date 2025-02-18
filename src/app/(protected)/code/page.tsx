"use client";

import { useState } from 'react';
import axios from 'axios';
import { Code } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import * as z from 'zod';
import { BotAvatar } from '@/components/bot-avatar';
import { Empty } from '@/components/empty';
import { Heading } from '@/components/heading';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/user-avatar';
import { useProModal } from '@/hooks/use-pro-modal';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
});

export default function CodePage() {
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const router = useRouter();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: values.prompt,
    }

    try {
      const response = await axios.post('/api/code', {
        messages: [...messages, userMessage]
      });
      setMessages([...messages, userMessage, response.data.message]);
      form.reset();

    } catch (error: unknown) {
      if ((error as { response: { status: number } })?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Failed to generate code.');
      }

    } finally {
      router.refresh();
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code from specs and descriptive text."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        placeholder="Simple Toggle component in React."
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
          {isLoading && <div className="flex justify-center items-center w-full p-8 rounded-lg bg-muted">
            <Loader />
          </div>}
          {!messages.length && !isLoading && (
            <Empty>Start your conversation!</Empty>
          )}
          <div className="flex flex-col-reverse gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-8 w-full p-8 rounded-lg',
                  message.role === 'user' ? 'bg-white border boder-black/10' : 'bg-muted'
                )}
              >
                {message.role === 'user' && <UserAvatar />}
                {message.role !== 'user' && <BotAvatar />}
                <div className="flex flex-col w-full gap-2">
                  <ReactMarkdown
                    className="text-sm overflow-hidden leading-7"
                    components={{
                      pre: (({ ...props }) => (
                        <div className="w-full my-2 p-2 bg-black/10 rounded-lg overflow-auto">
                          <pre {...props} />
                        </div>
                      )),
                      code: (({ ...props }) => (
                        <code className="bg-black/10 rounded-lg p-1" {...props} />
                      ))
                    }}
                  >{message.content?.toString()}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
