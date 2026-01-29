export default function Home() {
  return (
    <div className="flex flex-col gap-7">
      <h1 className="text-3xl font-bold">Welcome to Handcrafted Haven</h1>
      <p>Discover unique, handcrafted items made with care and attention to detail.</p>
      <section>
        <h2 className="text-xl font-bold mb-3">Cooming Soon</h2>
        <ul className="list-disc pl-8">
          <li>Browse Products</li>
          <li>Seller Profiles</li>
          <li>Reviews & Ratings</li>
        </ul>
      </section>
    </div>
  );
}
