const categories = [
  "Woman’s Fashion",
  "Men’s Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby’s & Toys",
  "Groceries & Pets",
  "Health & Beauty"
];

export default function CategorySidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-[22rem] py-6 pr-4 hidden md:block">
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat} className="flex items-center justify-between px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded cursor-pointer">
            <span>{cat}</span>
            {(cat === "Woman’s Fashion" || cat === "Men’s Fashion") && (
              <span className="ml-2">&#8250;</span>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
