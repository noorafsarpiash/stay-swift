const Gallery = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <img src="./assets/images/1.png" className="h-[400px]" alt="imageshowCase" />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          <img src="./assets/images/2.png" alt="images2" />
          <img src="./assets/images/3.png" alt="images3" />
          <img src="./assets/images/4.png" alt="images4" />
          <img src="./assets/images/5.png" alt="images5" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
