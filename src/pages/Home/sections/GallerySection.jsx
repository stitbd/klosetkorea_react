import React, { useState, useEffect } from 'react';
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
  { id: 1, src: gallery01, caption: 'Handcrafted Detail', tall: false, wide: false },
  { id: 2, src: gallery02, caption: 'Premium Materials', tall: false, wide: false },
  { id: 3, src: gallery03, caption: 'Artisan Process', tall: false, wide: false },
  { id: 4, src: gallery04, caption: 'Luxury Finish', tall: false, wide: false },
  { id: 5, src: gallery05, caption: 'Signature Design', tall: false, wide: false },
  { id: 6, src: gallery06, caption: 'Collection 2026', tall: false, wide: false },
  { id: 7, src: gallery07, caption: 'Handcrafted Detail', tall: false, wide: false },
  { id: 8, src: gallery08, caption: 'Premium Materials', tall: false, wide: false },
  { id: 9, src: gallery09, caption: 'Artisan Process', tall: false, wide: false },
  { id: 10, src: gallery10, caption: 'Luxury Finish', tall: false, wide: false },
  { id: 11, src: gallery11, caption: 'Signature Design', tall: false, wide: false },
  { id: 12, src: gallery12, caption: 'Collection 2026', tall: false, wide: false },
  { id: 13, src: gallery13, caption: 'Exclusive Preview', tall: false, wide: false },
];

// ── SVG Icons ──
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

  // Use API images if provided, otherwise fallback to local
  const galleryData = images.length > 0 
    ? images.map((img, idx) => ({
        id: img.id || idx + 1,
        src: img.url?.startsWith('http') ? img.url : (window[`gallery${img.url}`] || gallery01),
        caption: img.caption,
        tall: false,  // Force square - ignore tall/wide props
        wide: false
      }))
    : GALLERY_IMAGES;

  if (!galleryData?.length) return null;

  // Preview: show first 10 images in grid
  const previewItems = galleryData.slice(0, 10);
  const hasMoreImages = galleryData.length > 10;

  const handleImageClick = (image, index) => {
    setSelectedImage({ ...image, index });
  };

  const handleViewAll = () => {
    // Navigate to full gallery page with all images data
    navigate(viewAllRoute, { state: { images: galleryData, title, subtitle } });
  };

  const closeModal = () => setSelectedImage(null);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

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

          {/* Gallery Grid - NO side padding, full container width */}
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

          {/* View All Button - Navigates to new page */}
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

      {/* Simple Preview Modal (for clicking individual images) */}
      <Modal 
        show={!!selectedImage} 
        onHide={closeModal} 
        centered 
        className="gallery-modal"
        backdropClassName="gallery-modal__backdrop"
      >
        <Modal.Body className="p-0">
          {selectedImage && (
            <div className="gallery-modal__content">
              <button 
                className="gallery-modal__close" 
                onClick={closeModal} 
                aria-label="Close preview"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.caption || 'Preview'} 
                className="gallery-modal__img"
              />
              {selectedImage.caption && (
                <div className="gallery-modal__caption">{selectedImage.caption}</div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GallerySection;