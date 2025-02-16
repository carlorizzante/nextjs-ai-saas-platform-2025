"use client";

import { useState } from 'react';
import axios from 'axios';
import {
  Download,
  ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Empty } from '@/components/empty';
import { Heading } from '@/components/heading';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProModal } from '@/hooks/use-pro-modal';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: 'Image prompt is required',
  }),
  amount: z.string().nonempty(),
  resolution: z.string().nonempty(),
});

const RESOLUTIONS = [
  { label: '256x256', value: '256x256' },
  { label: '512x512', value: '512x512' },
  { label: '1024x1024', value: '1024x1024' },
]

export default function ImagePage() {
  const [images, setImages] = useState<string[]>([]);

  const router = useRouter();
  const proModal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: RESOLUTIONS[0].value,
    },
  });

  // const handleSubmit = form.handleSubmit(async (data) => {});
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setImages([]);

    try {
      const response = await axios.post('/api/image', values);
      const urls: string[] = response.data.urls.map(({ url }: { url: string }) => url);
      setImages(urls);
      form.reset();

    } catch (error: unknown) {
      if ((error as { response: { status: number } })?.response?.status === 403) {
        proModal.onOpen();
      }

    } finally {
      router.refresh();
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your ideas into fresh baked images."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-12">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A cute puppy playing in the garden."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl className="m-0 p-0">
                        <SelectTrigger>
                          <SelectValue
                            // defaultValue={field.value}
                            // value={field.value}
                            placeholder="Select the amount of photos to generate."
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['1', '2', '3', '4', '5'].map((value) => (
                          <SelectItem key={value} value={value} className="cursor-pointer">
                            <span className="px-2">
                              {`${value} ${value === '1' ? 'photo' : 'photos'}`}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 md:col-span-6 lg:col-span-4">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl className="m-0 p-0">
                        <SelectTrigger>
                          <SelectValue
                            // defaultValue={field.value}
                            // value={field.value}
                            placeholder="Select resolution for each photo."
                            className="px-2"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RESOLUTIONS.map(({ label, value }) => (
                          <SelectItem key={value} value={value} className="cursor-pointer">
                            <span className="px-2">
                              {label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-4 w-full"
                disabled={isLoading}
              >Generate</Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && <div className="p-20">
            <Loader />
          </div>}
          {!images.length && !isLoading && (
            <Empty>No images generated.</Empty>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((url) => (
              <Card key={url} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square m-2">
                  <Image
                    src={url}
                    alt={form.getValues()['prompt']}
                    className="object-cover w-full h-full rounded-lg"
                    fill
                  />
                </div>
                <CardFooter className="p-2 pt-0">
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
