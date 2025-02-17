"use client";

import { useState } from 'react';
import axios from 'axios';
import {
  Check,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProModal } from '@/hooks/use-pro-modal';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const ProModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const proModal = useProModal();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/stripe');
      console.log('STRIPE CLIENT RESPONSE', response.data);
      window.location.href = response.data.url;

    } catch (error: unknown) {
      console.error('STRIPE CLIENT ERROR', error);

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col justify-center items-center gap-4 pb-2">
            <div className="flex items-center gap-2 font-bold py-1">
              Upgrade to Genjus
              <Badge
                variant="premium"
                className="uppercase text-sm py-1"
              >Pro</Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center font-medium text-zin-900 pt-2 space-y-2" asChild>
            <div>
              {ROUTES.map(({ label, href, color, bgColor, ...route }) => (
                <Card key={href} className="p-3 border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn('p-2 w-fit rounded-md', bgColor)}>
                      <route.icon className={color} />
                    </div>
                    <span className="font-semibold text-sm">
                      {label}
                    </span>
                  </div>
                  <Check className="w-5 h-5 text-green-700" />
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="premium"
            className="w-full"
            size="lg"
            onClick={handleSubscribe}
            disabled={isLoading}
          >
            Upgrade <Zap className="w-4 h-4 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
