import { Card } from '@/components/ui/card';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';
import socialLinks from '../data/social-links.json';

const iconMap = {
  globe: Globe,
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
};

export function SocialLinksComp() {
  return (
    <Card className='p-4 mt-8 flex justify-center gap-4'>
      {socialLinks.links.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={link.name}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-600 hover:text-gray-900 transition-colors'
          >
            <Icon size={24} />
            <span className='sr-only'>{link.name}</span>
          </a>
        );
      })}
    </Card>
  );
}
