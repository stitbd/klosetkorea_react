import React, { useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
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
  { id: 1, src: gallery01, caption: 'Handcrafted Detail', tall: true },
  { id: 2, src: gallery02, caption: 'Premium Materials' },
  { id: 3, src: gallery03, caption: 'Artisan Process', wide: true },
  { id: 4, src: gallery04, caption: 'Luxury Finish' },
  { id: 5, src: gallery05, caption: 'Signature Design' },
  { id: 6, src: gallery06, caption: 'Collection 2026' },
  { id: 7, src: gallery07, caption: 'Handcrafted Detail', tall: true },
  { id: 8, src: gallery08, caption: 'Premium Materials' },
  { id: 9, src: gallery09, caption: 'Artisan Process', wide: true },
  { id: 10, src: gallery10, caption: 'Luxury Finish' },
  { id: 11, src: gallery11, caption: 'Signature Design' },
  { id: 12, src: gallery12, caption: 'Collection 2026' },
  { id: 13, src: gallery13, caption: 'Exclusive Preview' },
];

const GallerySection = ({ 
  title = "OUR GALLERY", 
  subtitle = "Behind the Craft", 
  images = [] 
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Use API images if provided, otherwise fallback to local
  const galleryData = images.length > 0 
    ? images.map((img, idx) => ({
        id: img.id || idx + 1,
        src: img.url?.startsWith('http') ? img.url : (window[`gallery${img.url}`] || gallery01),
        caption: img.caption,
        tall: img.tall,
        wide: img.wide
      }))
    : GALLERY_IMAGES;

  if (!galleryData?.length) return null;

  return (
    <>
      <section className="gallery-section section-wrapper">
        <Container fluid="xl">
          <div className="gallery-header">
            <span className="gallery-header__line" />
            <div className="gallery-header__text">
              <span className="gallery-header__subtitle">{subtitle}</span>
              <h2 className="gallery-header__title">{title}</h2>
            </div>
            <span className="gallery-header__line" />
          </div>

          <div className="gallery-grid">
            {galleryData.map((img, idx) => (
              <button
                key={img.id || idx}
                className={`gallery-item ${img.tall ? 'gallery-item--tall' : ''} ${img.wide ? 'gallery-item--wide' : ''}`}
                onClick={() => setSelectedImage({ src: img.src, caption: img.caption })}
                aria-label={`View gallery image: ${img.caption || 'Gallery item'}`}
              >
                <div className="gallery-item__wrap">
                  <img
                    src={img.src}
                    alt={img.caption || 'Gallery'}
                    className="gallery-item__img"
                    loading="lazy"
                    onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
                  />
                  <div className="gallery-item__overlay">
                    <span className="gallery-item__icon">+</span>
                  </div>
                </div>
                {img.caption && <span className="gallery-item__caption">{img.caption}</span>}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Modal show={!!selectedImage} onHide={() => setSelectedImage(null)} centered className="gallery-modal">
        <Modal.Body className="p-0">
          {selectedImage && (
            <>
              <button className="gallery-modal__close" onClick={() => setSelectedImage(null)} aria-label="Close preview">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <img src={selectedImage.src} alt={selectedImage.caption || 'Preview'} className="gallery-modal__img" />
              {selectedImage.caption && <div className="gallery-modal__caption">{selectedImage.caption}</div>}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GallerySection;