"use client";

export default function HowItsMade() {
  return (
    <section
      id="the-craft"
      className="w-full px-4 py-16 scroll-mt-24"
    >
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
          the craft
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">
          Made by hand, from the ground up
        </h2>
        <p className="mt-3 text-neutral-600">
          Every product starts with raw materials and is built entirely by hand.
          Nothing is pre-made, nothing is outsourced, and nothing is mass-produced.
          Each piece is crafted from start to finish, one at a time.
        </p>
      </div>

      {/* Steps */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            step: "01",
            title: "Raw materials",
            text: "We begin with base materials in their natural form — no pre-cut parts, no factory components.",
          },
          {
            step: "02",
            title: "Shaped by hand",
            text: "Each piece is formed, built, and assembled entirely by hand, using traditional techniques.",
          },
          {
            step: "03",
            title: "Slow finishing",
            text: "Surfaces, edges, and details are refined manually. Small variations are part of what makes every piece unique.",
          },
          {
            step: "04",
            title: "Final approval",
            text: "Only after a final hands-on inspection is a piece considered finished and ready to leave the studio.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="relative rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm"
          >
            <span className="absolute right-5 top-1 text-2xl font-semibold text-neutral-300">
              {item.step}
            </span>

            <h3 className="text-lg font-semibold text-neutral-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
