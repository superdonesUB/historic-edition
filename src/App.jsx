import { useRef, useState, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./App.css";

const TOTAL_PAGES = 18;

const pages = Array.from({ length: TOTAL_PAGES }, (_, index) => {
  const pageNumber = String(index + 1).padStart(2, "0");
  return { src: `${import.meta.env.BASE_URL}pages/page-${pageNumber}.jpg`, label: `page-${pageNumber}.jpg` };
});

const Page = forwardRef(function Page({ src, label, number }, ref) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="page" ref={ref}>
      {failed ? (
        <div className="empty-page">
          <span>Página {number}</span>
          <small>Añade la imagen:<br />{label}</small>
        </div>
      ) : (
        <img
          src={src}
          alt={`Página ${number}`}
          onError={() => setFailed(true)}
        />
      )}
    </article>
  );
});

function App() {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const goToPreviousPage = () => bookRef.current?.pageFlip().flipPrev();
  const goToNextPage = () => bookRef.current?.pageFlip().flipNext();

  return (
    <main className="app">
      <section className="book-section">
        <button
          className="side-button side-button-left"
          onClick={goToPreviousPage}
          aria-label="Página anterior"
        >
          ‹
        </button>

        <HTMLFlipBook
          width={420}
          height={594}
          size="stretch"
          minWidth={280}
          maxWidth={500}
          minHeight={396}
          maxHeight={707}
          drawShadow={true}
          flippingTime={900}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.35}
          showCover={true}
          mobileScrollSupport={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={(event) => setCurrentPage(event.data)}
          ref={bookRef}
          className="flipbook"
        >
          {pages.map((page, index) => (
            <Page
              key={page.src}
              src={page.src}
              label={page.label}
              number={index + 1}
            />
          ))}
        </HTMLFlipBook>

        <button
          className="side-button side-button-right"
          onClick={goToNextPage}
          aria-label="Página siguiente"
        >
          ›
        </button>
      </section>

      <section className="bottom-bar">
        <button onClick={goToPreviousPage}>← Anterior</button>
        <p>Página {currentPage + 1} de {TOTAL_PAGES}</p>
        <button onClick={goToNextPage}>Siguiente →</button>
      </section>
    </main>
  );
}

export default App;
