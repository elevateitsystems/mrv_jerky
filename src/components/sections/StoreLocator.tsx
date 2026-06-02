"use client";

const stores = [
  {
    id:1,
    name: "Cask and Barrel",
    url: "https://maps.app.goo.gl/o5QbuA6VPrz2ByThG",
    embed: "https://www.google.com/maps?q=Cask%20and%20Barrel&output=embed",
  },
  {
    id:2,
    name: "El Cejas Meat Market",
    url: "https://maps.app.goo.gl/Ws1NHwqL5JhJYVbJ7?g_st=lc",
    embed:
      "https://www.google.com/maps?q=El%20Cejas%20Meat%20Market&output=embed",
  },
  {
     id:3,
    name: "Trove Spirits",
    url: "https://maps.app.goo.gl/oYbC8KJ5SKHn4JkV8?g_st=lc",
    embed: "https://www.google.com/maps?q=Trove%20Spirits&output=embed",
  },
  {
     id:4,
    name: "Oakdale 7-11",
    url: "https://maps.app.goo.gl/r1JNuygGZAulknuS6?g_st=lc",
    embed: "https://www.google.com/maps?q=7-Eleven%20Oakdale&output=embed",
  },
  {
     id:5,
    name: "Tracy Marina",
    url: "https://maps.app.goo.gl/UdvuzNNI3db3VLom6?g_st=lc",
    embed: "https://www.google.com/maps?q=Tracy%20Marina&output=embed",
  },
  {
     id:6,
    name: "Lodi Discount Cigarettes",
    url: "https://maps.app.goo.gl/N8HTH9CZyu7v2RVG8?g_st=lc",
    embed:
      "https://www.google.com/maps?q=Lodi%20Discount%20Cigarettes&output=embed",
  },
];

export function StoreLocator() {
  return (
    <section
      id="stores"
      className="py-24 relative overflow-hidden bg-zinc-950 text-white"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero-image.webp')" }}
      />
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary">
            Available Locally
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mt-3">
            Find Us In <span className="text-primary">Stores Near You</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {stores.map((store) => (
            <div
              key={store?.id}
              className="flex flex-col overflow-hidden border border-white/10 bg-zinc-900 rounded-lg"
            >
              {/* Header */}
              <div className="p-3 border-b border-white/10">
                <h3 className="text-sm font-bold uppercase line-clamp-2">
                  {store.name}
                </h3>
              </div>

              {/* Map */}
              <div className="h-48 w-full">
                <iframe
                  src={store.embed}
                  loading="lazy"
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
