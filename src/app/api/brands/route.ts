
import { NextResponse } from "next/server";

export async function GET() {
  const data = [
    {
      id: 1,
      name: "Brand A",
      slug: "brand-a",
      image: "https://example.com/brand-a.png",
    },
    {
      id: 2,
      name: "Brand B",
      slug: "brand-b",
      image: "https://example.com/brand-b.png",
    },
    {
      id: 3,
      name: "Brand C",
      slug: "brand-c",
      image: "https://example.com/brand-c.png",
    },
  ];

  return NextResponse.json(data);
}
