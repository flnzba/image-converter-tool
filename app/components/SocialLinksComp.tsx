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
    <div className='flex justify-center gap-6'>
      {socialLinks.links.map((link) => {
        const Icon = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={link.name}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-primary transition-colors duration-200'
            aria-label={link.name}
          >
            <Icon size={24} />
            <span className='sr-only'>{link.name}</span>
          </a>
        );
      })}
    </div>
  );
}
