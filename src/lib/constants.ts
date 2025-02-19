import {
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from 'lucide-react';

export const MAX_FREE_COUNTS = 5;

export const ROUTES = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-700',
    bgColor: 'bg-violet-700/10',
    href: '/conversation',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'VIdeo Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-700/10',
    href: '/music',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
  {
    label: 'Settings',
    icon: Settings,
    color: 'text-zinc-700',
    bgColor: 'bg-zinc-700/10',
    href: '/settings',
  },
];

export const TESTIMONIALS = [
  {
    name: 'John Doe',
    avatar: 'AD',
    title: 'Software Engineer',
    description: 'Genjus AI is the best AI tool I have ever used. It has helped me to generate code, music, and videos in a matter of seconds. I highly recommend it to everyone.',
  },
  {
    name: 'Sarah Smith',
    avatar: 'SS',
    title: 'Graphic Designer',
    description: 'This tool has revolutionized my creative process. The ability to create stunning visuals quickly is a game changer for me!',
  },
  {
    name: 'Marcus Lee',
    avatar: 'ML',
    title: 'Content Writer',
    description: 'Genjus AI has made my writing so much easier. I love how it provides creative prompts that inspire my work.',
  },
  {
    name: 'Emily Johnson',
    avatar: 'EJ',
    title: 'Digital Marketer',
    description: 'The insights and suggestions I get from Genjus AI are invaluable. It has improved my campaigns tremendously.',
  },
  {
    name: 'David Brown',
    avatar: 'DB',
    title: 'Data Scientist',
    description: 'Testing models and visualizing data has never been easier. This tool is indispensable in my day-to-day tasks.',
  },
  {
    name: 'Sophia White',
    avatar: 'SW',
    title: 'Product Manager',
    description: 'Genjus AI helps me streamline project workflows. The efficiency it brings is unparalleled!',
  },
  {
    name: 'James Wilson',
    avatar: 'G6',
    title: 'Entrepreneur',
    description: 'The versatility of Genjus AI is impressive. It supports various tasks that enhance my business operations.',
  },
  {
    name: 'Linda Taylor',
    avatar: 'LT',
    title: 'Social Media Manager',
    description: 'Generating engaging content in seconds has transformed my approach to social media strategy. Highly recommend!',
  },
  {
    name: 'Chris Anderson',
    avatar: 'CA',
    title: 'Web Developer',
    description: 'This tool makes coding easier. I can quickly generate boilerplate code, saving me tons of time.',
  },
  {
    name: 'Amanda Martinez',
    avatar: 'AM',
    title: 'UX/UI Designer',
    description: 'The design suggestions I get from Genjus AI are spot on! It enhances my creative process significantly.',
  },
  {
    name: 'Kevin Garcia',
    avatar: 'KG',
    title: 'Sales Executive',
    description: 'With Genjus AI, I can prepare comprehensive reports in no time. It’s boosted my productivity!',
  },
  {
    name: 'Jennifer Rodriguez',
    avatar: 'JR',
    title: 'SEO Specialist',
    description: 'The SEO analysis features have taken my optimization strategies to the next level. A must-have tool!',
  },
];

export const STYLE_GRADIENT = 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500';
export const STYLE_GRADIENT_2 = 'bg-gradient-to-r from-purple-400 to-pink-600';

export const TEXTWRITER_OPTIONS = {
  strings: [
    'Chat Generation.',
    'Image Generation.',
    'Video Generation.',
    'Music Generation.',
    'Code Generation.',
  ],
  autoStart: true,
  loop: true,
}
