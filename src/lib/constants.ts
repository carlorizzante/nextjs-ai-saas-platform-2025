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
]
