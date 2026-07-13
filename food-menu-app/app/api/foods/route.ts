export async function GET() {
  return Response.json([
    {
      id: 1,
      name: "Paneer Pizza",
      price: 250,
    },
  ]);
}

export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({
    message: "Food Added Successfully",
    data: body,
  });
}