export const FluidHero = () => {
  return (
    <section className="sticky top-0 bg-blue h-screen pt-24 md:mt-[70vh] md:px-10 px-5 pb-14 flex items-end z-10 fluid">
      <div className="font-bold text-4xl text-white">
        <h1>Immerse Yourself in</h1>
        <h1>Timeless Elegance</h1>
      </div>
      <figure className="absolute inset-0 -z-10 overflow-hidden"><img className="fluidFig object-cover" src="/assets/images/01.png" alt="" /></figure>
    </section>
  );
};
