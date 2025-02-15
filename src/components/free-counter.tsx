"use client";

import {
  useEffect,
  useState,
} from 'react';
import { Zap } from 'lucide-react';
import { MAX_FREE_COUNTS } from '@/lib/constants';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
} from './ui/card';
import { Progress } from './ui/progress';

type FreeCounterProps = {
  apiUsage: number;
}


export const FreeCounter = ({ apiUsage }: FreeCounterProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="p-4">
          <div className="text-sm text-white space-y-4">
            <p>{`${apiUsage} / ${MAX_FREE_COUNTS} Free Generations`}</p>
            <Progress
              className="h-3"
              value={apiUsage / MAX_FREE_COUNTS * 100}
            />
            <Button variant="premium" className="w-full">
              Upgrade
              <Zap size={16} className="fill-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
