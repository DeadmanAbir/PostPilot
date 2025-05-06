import { useState } from 'react';

import { Button } from './ui/button';

import { cn } from '@/lib/utils';

const items = [
  {
    title: 'All Memories',
    href: '/',
  },
  {
    title: 'Web pages',
    href: '/webpages',
  },
  {
    title: 'Tweets',
    href: '/tweets',
  },
  {
    title: 'Documents',
    href: '/documents',
  },
  {
    title: 'Spaces',
    href: '/spaces',
  },
  {
    title: 'Notes',
    href: '/notes',
  },
  {
    title: 'YouTube',
    href: '/youtube',
  },
];

export function Nav() {
  const [activeTab, setActiveTab] = useState('All Memories');
  return (
    <nav className="flex items-center space-x-4 px-4 border-b">
      {items.map((item) => (
        <Button
          variant="outline"
          key={item.href}
          onClick={() => setActiveTab(item.title)}
          className={cn(
            'flex h-12 items-center text-sm font-medium transition-colors hover:text-primary',
            activeTab === item.title
              ? 'border-b-2 border-primary text-primary'
              : 'text-muted-foreground',
          )}
        >
          {item.title}
        </Button>
      ))}
    </nav>
  );
}
