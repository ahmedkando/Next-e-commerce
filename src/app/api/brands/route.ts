//localhost:3000/api/brands



export function GET() {


const data = [
{
    id : 1,
     name: 'Brand A',
     slug: 'brand-a',
     image: 'https://example.com/brand-a.png'
    },
    {
    id : 1,
     name: 'Brand A',
     slug: 'brand-a',
     image: 'https://example.com/brand-a.png'
    },
    {
    id : 1,
     name: 'Brand A',
     slug: 'brand-a',
     image: 'https://example.com/brand-a.png'
    },
    {
    id : 1,
     name: 'Brand A',
     slug: 'brand-a',
     image: 'https://example.com/brand-a.png'
    },

];


return  new Response(JSON.stringify(data));
}