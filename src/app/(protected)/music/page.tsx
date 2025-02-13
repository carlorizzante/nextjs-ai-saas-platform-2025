"use client";

import { useState } from 'react';
import axios from 'axios';
import { Music } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required',
  }),
});

export default function MusicPage() {
  const [music, setMusic] = useState<string>('aaaas');

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  // const handleSubmit = form.handleSubmit(async (data) => {});
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/music', values);
      console.log(response.data);
      setMusic(response.data.message);
      form.reset();

    } catch (error) {
      // TODO: Open Pro Modal
      console.error(error);

    } finally {
      router.refresh();
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompts into music!"
        icon={Music}
        iconColor="text-emerald-700"
        bgColor="bg-emerald-700/10"
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
                        placeholder="Piano, guitar, drums, etc."
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
          {!music && !isLoading && (
            <Empty>Music will be generated here!</Empty>
          )}
          {music && (
            <audio controls className="w-full mt-9" src={music} />
          )}
        </div>
      </div>
    </div>
  );
}
