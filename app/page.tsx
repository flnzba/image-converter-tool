/* eslint-disable jsx-a11y/alt-text */
'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, Download, Image, FileType, Zap } from 'lucide-react';
import { SocialLinksComp } from '@/app/components/SocialLinksComp';
import { ThemeToggle } from '@/components/theme-toggle';

export default function WebPConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<string | null>(null);
  const [format, setFormat] = useState('jpg');
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setConvertedFile(null);
    }
  };

  const handleConversion = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('format', format);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setConvertedFile(url);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-background text-foreground'>
      {/* Header with theme toggle */}
      <header className='w-full py-4 px-6 flex justify-between items-center border-b'>
        <h1 className='text-2xl font-bold'>Image Converter Tool</h1>
        <ThemeToggle />
      </header>
      
      {/* Hero section */}
      <section className='w-full max-w-5xl mx-auto py-16 px-6 text-center'>
        <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500'>
          Fast & Private Image Conversion
        </h1>
        <p className='text-xl mb-8 text-muted-foreground max-w-2xl mx-auto'>
          Convert your images to various formats with our secure, browser-based tool.
          No uploads to servers, all processing happens locally in your browser.
        </p>
        <div className='flex flex-wrap gap-4 justify-center mb-8'>
          <div className='flex items-center gap-2 bg-muted p-3 rounded-lg'>
            <Zap className='text-yellow-500' size={20} />
            <span>Lightning Fast</span>
          </div>
          <div className='flex items-center gap-2 bg-muted p-3 rounded-lg'>
            <FileType className='text-green-500' size={20} />
            <span>Multiple Formats</span>
          </div>
          <div className='flex items-center gap-2 bg-muted p-3 rounded-lg'>
            <Image className='text-blue-500' size={20} />
            <span>High Quality</span>
          </div>
        </div>
      </section>

      {/* Converter Tool */}
      <section className='w-full max-w-5xl mx-auto py-8 px-6'>
        <Card className='p-6 w-full max-w-md mx-auto border shadow-lg bg-card'>
          <CardContent className='space-y-6 pt-6'>
            <h2 className='text-2xl font-bold flex items-center gap-2'>
              <Image className='text-primary' size={24} />
              Fast Image Converter
            </h2>
            <div className='bg-muted p-3 rounded-lg'>
              <p className='text-sm font-medium'>
                🔒 Fully private without any storage of converted images.
              </p>
            </div>
            <p className='text-muted-foreground'>
              Convert images to JPG, PNG, WebP, or PDF format.
            </p>
            <p className='text-muted-foreground'>
              <strong>Supported formats:</strong> JPG, PNG, WebP, PDF
            </p>
            <p className='text-yellow-500 dark:text-yellow-400 text-sm font-medium'>
              <strong>Note:</strong> PDF to IMAGE does not work yet!
            </p>

            <Input
              type='file'
              accept='.webp,.jpg,.jpeg,.png,.pdf'
              onChange={handleFileChange}
              className='cursor-pointer'
            />

            <Select onValueChange={setFormat} defaultValue={format}>
              <SelectTrigger>
                <SelectValue placeholder='Select format' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='jpg'>JPG</SelectItem>
                <SelectItem value='png'>PNG</SelectItem>
                <SelectItem value='webp'>WebP</SelectItem>
                <SelectItem value='pdf'>PDF</SelectItem>
              </SelectContent>
            </Select>

            <div className='flex flex-col gap-4'>
              <Button 
                onClick={handleConversion} 
                disabled={!file || isConverting}
                className='w-full'
                variant="default"
              >
                <Upload className='mr-2 h-4 w-4' />
                {isConverting ? 'Converting...' : 'Convert'}
              </Button>
              {convertedFile && (
                <a href={convertedFile} download={`converted.${format}`} className='w-full'>
                  <Button className='w-full' variant="outline">
                    <Download className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Features section */}
      <section className='w-full max-w-5xl mx-auto py-16 px-6'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Why Use Our Converter?</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <Card className='bg-card'>
            <CardContent className='pt-6'>
              <h3 className='text-xl font-bold mb-2'>Privacy First</h3>
              <p className='text-muted-foreground'>
                All conversions happen directly in your browser. Your files never leave your device.
              </p>
            </CardContent>
          </Card>
          <Card className='bg-card'>
            <CardContent className='pt-6'>
              <h3 className='text-xl font-bold mb-2'>High Quality</h3>
              <p className='text-muted-foreground'>
                Our converter maintains the highest possible quality while optimizing file size.
              </p>
            </CardContent>
          </Card>
          <Card className='bg-card'>
            <CardContent className='pt-6'>
              <h3 className='text-xl font-bold mb-2'>Easy to Use</h3>
              <p className='text-muted-foreground'>
                Simple interface with just a few clicks to convert your images to any format.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Links */}
      <footer className='w-full py-8 px-6 border-t'>
        <div className='max-w-5xl mx-auto'>
          <SocialLinksComp />
          <p className='text-center text-muted-foreground mt-4 text-sm'>
            © {new Date().getFullYear()} Image Converter Tool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
