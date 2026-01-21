import { useState, useEffect } from 'react';
import { useScrollAnimation, useMultipleScrollAnimation } from '../hooks/useScrollAnimation';
import { usePublishedPhotos } from '../hooks/usePhotoDB';
import './Gallery.css';

function Gallery() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const dbPhotos = usePublishedPhotos();
  const [setPhotoRef, visiblePhotos] = useMultipleScrollAnimation(dbPhotos?.length || 12);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(dbPhotos?.map(p => p.category) || [])];

  const filteredPhotos = filter === 'All'
    ? dbPhotos
    : dbPhotos?.filter(p => p.category === filter);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (filteredPhotos && filteredPhotos.length > 0) {
      setCurrentImage((prev) => (prev + 1) % filteredPhotos.length);
    }
  };

  const prevImage = () => {
    if (filteredPhotos && filteredPhotos.length > 0) {
      setCurrentImage((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section
        className={`gallery-hero ${heroVisible ? 'animate-fade-in' : 'animate-hidden'}`}
        ref={heroRef}
      >
        <div className="gallery-hero-bg"></div>
        <div className="gallery-hero-content">
          <h1>Photo Gallery</h1>
          <p>Moments captured from our health initiatives and community programs across Ghana.</p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="gallery-content">
        {dbPhotos && dbPhotos.length > 0 ? (
          <>
            {/* Filter Tabs */}
            <div className="gallery-filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="gallery-grid">
              {filteredPhotos?.map((photo, index) => (
                <div
                  key={photo.id}
                  ref={setPhotoRef(index)}
                  className={`gallery-item ${visiblePhotos.has(index) ? 'animate-scale-up' : 'animate-hidden'}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onClick={() => openLightbox(index)}
                >
                  <img src={photo.image} alt={photo.title} />
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-category">{photo.category}</span>
                    <h3>{photo.title}</h3>
                    <span className="gallery-zoom-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="gallery-empty">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2>No Photos Yet</h2>
            <p>Our photo gallery will be updated soon with moments from our health initiatives and community programs.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && filteredPhotos && filteredPhotos.length > 0 && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>×</button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>‹</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={filteredPhotos[currentImage].image} alt={filteredPhotos[currentImage].title} className="lightbox-image" />
            <div className="lightbox-info">
              <span className="lightbox-category">{filteredPhotos[currentImage].category}</span>
              <h3>{filteredPhotos[currentImage].title}</h3>
              <p>{currentImage + 1} / {filteredPhotos.length}</p>
            </div>
          </div>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>›</button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
