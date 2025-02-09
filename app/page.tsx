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
import { Upload, Download } from 'lucide-react';
import { SocialLinksComp } from '@/app/components/SocialLinksComp'; // Changed from './data/social-links.json'

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
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
      <Card className='p-6 w-full max-w-md'>
        <CardContent className='space-y-6'>
          <h2 className='text-xl font-bold'>Fast Image Converter</h2>
          <p className='text-gray-600'>
            Convert images to JPG, PNG, WebP, or PDF format.
          </p>
          <p className='text-gray-600'>
            <strong>Supported formats:</strong> JPG, PNG, WebP, PDF
          </p>
          <p className='text-gray-600'>
            <strong>PDF to IMAGE does not work yet!</strong>
          </p>

          <Input
            type='file'
            accept='.webp,.jpg,.jpeg,.png,.pdf'
            onChange={handleFileChange}
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
            {' '}
            {/* Changed from space-y-4 to flex and gap-4 */}
            <Button onClick={handleConversion} disabled={!file || isConverting}>
              <Upload className='mr-2' />{' '}
              {/* Reduced margin for better alignment */}
              {isConverting ? 'Converting...' : 'Convert'}
            </Button>
            {convertedFile && (
              <a href={convertedFile} download={`converted.${format}`}>
                <Button className='w-full'>
                  {' '}
                  {/* Added full width for consistency */}
                  <Download className='mr-2' />{' '}
                  {/* Reduced margin for better alignment */}
                  Download
                </Button>
              </a>
            )}
          </div>
        </CardContent>
      </Card>
      <SocialLinksComp /> {/* Changed from Footer to socialLinksComp */}
    </div>
  );
}
