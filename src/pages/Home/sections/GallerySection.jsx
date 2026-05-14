// src/pages/Home/sections/GallerySection.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../../utils';   // ← UPDATED: added BASE_IMAGE_URL
import './GallerySection.scss';

// ── ALL STATIC IMPORTS AND GALLERY_IMAGES ARRAY REMOVED ──

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

  // ── UPDATED: sort by serial_no, build src from BASE_IMAGE_URL + image path ──
  const galleryData = images
    .slice()
    .sort((a, b) => Number(a.serial_no) - Number(b.serial_no))
    .map((img) => ({
      id: img.id,
      src: `${BASE_IMAGE_URL}${img.image}`,
      caption: img.title || '',
    }));

  if (!galleryData?.length) return null;

  const previewItems = galleryData.slice(0, 10);
  const hasMoreImages = galleryData.length > 10;

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowLeft') navigateImage(-1);
      else if (e.key === 'ArrowRight') navigateImage(1);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, currentIndex]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) navigateImage(1);
    if (distance < -50) navigateImage(-1);
    setTouchStart(null); setTouchEnd(null);
  };

  const handleImageClick = (image, index) => {
    setCurrentIndex(index);
    setSelectedImage(image);
  };

  const handleViewAll = () => {
    navigate(viewAllRoute, { state: { images: galleryData, title, subtitle } });
  };

  const closeModal = () => setSelectedImage(null);

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
          <div className="gallery-header">
            <span className="gallery-header__line" />
            <div className="gallery-header__text">
              <span className="gallery-header__subtitle">{subtitle}</span>
              <h2 className="gallery-header__title">{title}</h2>
            </div>
            <span className="gallery-header__line" />
          </div>

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
              <button className="gallery-modal__close" onClick={closeModal} aria-label="Close preview">
                <CloseIcon />
              </button>
              {galleryData.length > 1 && (
                <>
                  <button className="gallery-modal__nav gallery-modal__nav--prev" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} aria-label="Previous image">
                    <ChevronLeft />
                  </button>
                  <button className="gallery-modal__nav gallery-modal__nav--next" onClick={(e) => { e.stopPropagation(); navigateImage(1); }} aria-label="Next image">
                    <ChevronRight />
                  </button>
                </>
              )}
              {galleryData.length > 1 && (
                <div className="gallery-modal__counter">
                  {currentIndex + 1} <span>/</span> {galleryData.length}
                </div>
              )}
              <div className="gallery-modal__image-wrap">
                <img src={currentImage.src} alt={currentImage.caption || 'Gallery preview'} className="gallery-modal__img" loading="eager" />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GallerySection;