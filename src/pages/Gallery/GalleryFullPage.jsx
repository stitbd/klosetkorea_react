// src/pages/Gallery/GalleryFullPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Modal } from 'react-bootstrap';
import { PLACEHOLDER_IMG, BASE_IMAGE_URL } from '../../utils'; 
import { apiGet } from '../../utils/api'; 
import './GalleryFullPage.scss';

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

const GalleryFullPage = ({ title = "OUR GALLERY", subtitle = "Behind the Craft" }) => {
  // ── UPDATED: fetch from API instead of accepting images prop ──
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // ── ADD: fetch gallery from API ──
  useEffect(() => {
    apiGet('/gallery')
      .then((res) => {
        const raw = res.data?.data || [];
        const normalized = raw
          .slice()
          .sort((a, b) => Number(a.serial_no) - Number(b.serial_no))
          .map((img) => ({
            id: img.id,
            src: `${BASE_IMAGE_URL}${img.image}`,
            caption: img.title || '',
          }));
        setGalleryData(normalized);
      })
      .catch((err) => console.error('Gallery API error:', err))
      .finally(() => setLoading(false));
  }, []);

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

  if (loading) {
    return (
      <main className="pdp">
        <Container fluid="xl" className="py-3">
          <div className="text-center py-5">Loading...</div>
        </Container>
      </main>
    );
  }

  if (!galleryData.length) return null;

  return (
    <main className="pdp">
      <Container fluid="xl" className="py-3">

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

        <div className="gallery-grid">
          {galleryData.map((img, idx) => (
            <button
              key={img.id || idx}
              className="gallery-item"
              onClick={() => openModal(img, idx)}
              aria-label={`View image ${idx + 1}`}
            >
              <div className="gallery-item__wrap">
                <img
                  src={img.src}
                  alt={img.caption || `Gallery ${idx + 1}`}
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
                  <button className="gallery-modal__nav gallery-modal__nav--prev" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }} aria-label="Previous">
                    <ChevronLeft />
                  </button>
                  <button className="gallery-modal__nav gallery-modal__nav--next" onClick={(e) => { e.stopPropagation(); navigateImage(1); }} aria-label="Next">
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
                <img src={currentImage.src} alt={currentImage.caption || 'Preview'} className="gallery-modal__img" loading="eager" />
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default GalleryFullPage;