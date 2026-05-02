import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';  // ✅ Added missing import
import { Container, Modal } from 'react-bootstrap';
import { PLACEHOLDER_IMG } from '../../utils';
import './GalleryFullPage.scss';

// ── Static Image Imports ──
import gallery01 from '../../assets/images/gallery/01.jpg';
import gallery02 from '../../assets/images/gallery/02.jpg';
import gallery03 from '../../assets/images/gallery/03.jpg';
import gallery04 from '../../assets/images/gallery/04.jpg';
import gallery05 from '../../assets/images/gallery/05.jpg';
import gallery06 from '../../assets/images/gallery/06.jpg';
import gallery07 from '../../assets/images/gallery/07.jpg';
import gallery08 from '../../assets/images/gallery/08.jpg';
import gallery09 from '../../assets/images/gallery/09.jpg';
import gallery10 from '../../assets/images/gallery/10.jpg';
import gallery11 from '../../assets/images/gallery/11.jpg';
import gallery12 from '../../assets/images/gallery/12.jpg';
import gallery13 from '../../assets/images/gallery/13.jpg';

const GALLERY_IMAGES = [
  { id: 1, src: gallery01 }, { id: 2, src: gallery02 },
  { id: 3, src: gallery03 }, { id: 4, src: gallery04 },
  { id: 5, src: gallery05 }, { id: 6, src: gallery06 },
  { id: 7, src: gallery07 }, { id: 8, src: gallery08 },
  { id: 9, src: gallery09 }, { id: 10, src: gallery10 },
  { id: 11, src: gallery11 }, { id: 12, src: gallery12 },
  { id: 13, src: gallery13 }, { id: 14, src: gallery01 },
  { id: 15, src: gallery02 }, { id: 16, src: gallery03 },
  { id: 17, src: gallery04 }, { id: 18, src: gallery05 },
  { id: 19, src: gallery06 }, { id: 20, src: gallery07 },
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

const GalleryFullPage = ({ title = "OUR GALLERY", subtitle = "Behind the Craft", images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const galleryData = images.length > 0 
    ? images.map((img, idx) => ({
        id: img.id || idx + 1,
        src: img.url?.startsWith('http') ? img.url : (window[`gallery${img.url}`] || gallery01)
      }))
    : GALLERY_IMAGES;

  if (!galleryData?.length) return null;
  const previewItems = galleryData.slice(0, 20);

  // Keyboard navigation
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

  // Touch swipe
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) navigateImage(1);
    if (distance < -50) navigateImage(-1);
    setTouchStart(null); setTouchEnd(null);
  };

  const openModal = (image, index) => { setCurrentIndex(index); setSelectedImage(image); };
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
    <main className="pdp">
      <Container fluid="xl" className="py-3">
        
        {/* Breadcrumb + Back */}
        <div className="pdp__topbar d-flex align-items-center justify-content-between mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb pdp__breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active">Gallery</li>
            </ol>
          </nav>
          <Link to="/" className="pdp__back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back To Home
          </Link>
        </div>

        {/* Gallery Grid - 5×4 */}
        <div className="gallery-grid">
          {previewItems.map((img, idx) => (
            <button 
              key={img.id || idx} 
              className="gallery-item" 
              onClick={() => openModal(img, idx)} 
              aria-label={`View image ${idx + 1}`}
            >
              <div className="gallery-item__wrap">
                <img 
                  src={img.src} 
                  alt={`Gallery ${idx + 1}`} 
                  className="gallery-item__img" 
                  loading="lazy" 
                  decoding="async" 
                  onError={(e) => { e.target.src = PLACEHOLDER_IMG; }} 
                />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__icon"><ExpandIcon /></span>
                </div>
              </div>
              <span className="gallery-item__index">{idx + 1}</span>
            </button>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
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
              <button className="gallery-modal__close" onClick={closeModal} aria-label="Close">
                <CloseIcon />
              </button>
              
              {galleryData.length > 1 && (
                <>
                  <button 
                    className="gallery-modal__nav gallery-modal__nav--prev" 
                    onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} 
                    aria-label="Previous"
                  >
                    <ChevronLeft />
                  </button>
                  <button 
                    className="gallery-modal__nav gallery-modal__nav--next" 
                    onClick={(e) => { e.stopPropagation(); navigateImage(1); }} 
                    aria-label="Next"
                  >
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
                <img 
                  src={currentImage.src} 
                  alt="Preview" 
                  className="gallery-modal__img" 
                  loading="eager" 
                />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

    </main>
  );
};

export default GalleryFullPage;