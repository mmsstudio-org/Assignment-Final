'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={mainImage}
          alt={`Main image for ${title}`}
          width={1200}
          height={800}
          className="h-auto w-full max-h-[500px] object-cover transition-transform duration-500 hover:scale-105"
          data-ai-hint="apartment interior"
        />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={cn(
              'overflow-hidden rounded-md border-2 transition-all',
              mainImage === image ? 'border-primary' : 'border-transparent hover:border-primary/50'
            )}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1} for ${title}`}
              width={200}
              height={150}
              className="h-20 w-full object-cover"
              data-ai-hint="apartment interior room"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
