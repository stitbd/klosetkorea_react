import React, { useState, useEffect, useCallback } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PLACEHOLDER_IMG } from '../../../utils';
import './GallerySection.scss';

// ── Static Image Imports (Vite compatible) ──
import gallery01 from '../../../assets/images/gallery/01.jpg';
import gallery02 from '../../../assets/images/gallery/02.jpg';
import gallery03 from '../../../assets/images/gallery/03.jpg';
import gallery04 from '../../../assets/images/gallery/04.jpg';
import gallery05 from '../../../assets/images/gallery/05.jpg';
import gallery06 from '../../../assets/images/gallery/06.jpg';
import gallery07 from '../../../assets/images/gallery/07.jpg';
import gallery08 from '../../../assets/images/gallery/08.jpg';
import gallery09 from '../../../assets/images/gallery/09.jpg';
import gallery10 from '../../../assets/images/gallery/10.jpg';
import gallery11 from '../../../assets/images/gallery/11.jpg';
import gallery12 from '../../../assets/images/gallery/12.jpg';
import gallery13 from '../../../assets/images/gallery/13.jpg';

const GALLERY_IMAGES = [
  { id: 1, src: gallery01, caption: 'Handcrafted Detail' },
  { id: 2, src: gallery02, caption: 'Premium Materials' },
  { id: 3, src: gallery03, caption: 'Artisan Process' },
  { id: 4, src: gallery04, caption: 'Luxury Finish' },
  { id: 5, src: gallery05, caption: 'Signature Design' },
  { id: 6, src: gallery06, caption: 'Collection 2026' },
  { id: 7, src: gallery07, caption: 'Handcrafted Detail' },
  { id: 8, src: gallery08, caption: 'Premium Materials' },
  { id: 9, src: gallery09, caption: 'Artisan Process' },
  { id: 10, src: gallery10, caption: 'Luxury Finish' },
  { id: 11, src: gallery11, caption: 'Signature Design' },
  { id: 12, src: gallery12, caption: 'Collection 2026' },
  { id: 13, src: gallery13, caption: 'Exclusive Preview' },
];

// ── SVG Icons ──
const ChevronLeft = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const GallerySection = ({ 
  title = "OUR GALLERY", 
  subtitle = "Behind the Craft", 
  images = [],
  viewAllLabel = "View All Images",
  viewAllRoute = "/gallery"
}) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Use API images if provided, otherwise fallback to local
  const galleryData = images.length > 0 
    ? images.map((img, idx) => ({
        id: img.id || idx + 1,
        src: img.url?.startsWith('http') ? img.url : (window[`gallery${img.url}`] || gallery01),
        caption: img.caption
      }))
    : GALLERY_IMAGES;

  if (!galleryData?.length) return null;

  // Preview: show first 10 images in grid
  const previewItems = galleryData.slice(0, 10);
  const hasMoreImages = galleryData.length > 10;

  // ── Keyboard Navigation ──
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, currentIndex]);

  // ── Touch/Swipe Handlers ──
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) navigateImage(1);      // Swipe left → next
    if (distance < -50) navigateImage(-1);    // Swipe right → prev
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImageClick = (image, index) => {
    setCurrentIndex(index);
    setSelectedImage(image);
  };

  const handleViewAll = () => {
    navigate(viewAllRoute, { state: { images: galleryData, title, subtitle } });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = useCallback((direction) => {
    if (!galleryData.length) return;
    setCurrentIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return galleryData.length - 1;
      if (newIndex >= galleryData.length) return 0;
      return newIndex;
    });
  }, [galleryData.length]);

  const currentImage = selectedImage ? galleryData[currentIndex] : null;

  return (
    <>
      <section className="gallery-section section-wrapper">
        <Container fluid="xl" className="py-3">
          {/* Header */}
          <div className="gallery-header">
            <span className="gallery-header__line" />
            <div className="gallery-header__text">
              <span className="gallery-header__subtitle">{subtitle}</span>
              <h2 className="gallery-header__title">{title}</h2>
            </div>
            <span className="gallery-header__line" />
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {previewItems.map((img, idx) => (
              <button
                key={img.id || idx}
                className="gallery-item"
                onClick={() => handleImageClick(img, idx)}
                aria-label={`View gallery image: ${img.caption || 'Gallery item'}`}
              >
                <div className="gallery-item__wrap">
                  <img
                    src={img.src}
                    alt={img.caption || 'Gallery'}
                    className="gallery-item__img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                  />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__icon"><ExpandIcon /></span>
                  </div>
                </div>
                {img.caption && <span className="gallery-item__caption">{img.caption}</span>}
              </button>
            ))}
          </div>

          {/* View All Button */}
          {hasMoreImages && (
            <div className="gallery-footer">
              <button 
                className="gallery-btn gallery-btn--primary"
                onClick={handleViewAll}
                aria-label="View all gallery images"
              >
                <span>{viewAllLabel}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Lightbox Modal with Navigation */}
      <Modal 
        show={!!selectedImage} 
        onHide={closeModal} 
        centered 
        className="gallery-modal"
        dialogClassName="gallery-modal__dialog"
        backdropClassName="gallery-modal__backdrop"
      >
        <Modal.Body className="p-0">
          {currentImage && (
            <div 
              className="gallery-modal__content"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close Button */}
              <button 
                className="gallery-modal__close" 
                onClick={closeModal} 
                aria-label="Close preview"
              >
                <CloseIcon />
              </button>

              {/* Navigation Arrows */}
              {galleryData.length > 1 && (
                <>
                  <button 
                    className="gallery-modal__nav gallery-modal__nav--prev"
                    onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft />
                  </button>
                  <button 
                    className="gallery-modal__nav gallery-modal__nav--next"
                    onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
                    aria-label="Next image"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {galleryData.length > 1 && (
                <div className="gallery-modal__counter">
                  {currentIndex + 1} <span>/</span> {galleryData.length}
                </div>
              )}

              {/* Main Image */}
              <div className="gallery-modal__image-wrap">
                <img 
                  src={currentImage.src} 
                  alt={currentImage.caption || 'Gallery preview'} 
                  className="gallery-modal__img"
                  loading="eager"
                />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GallerySection;