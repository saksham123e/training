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

  console.log(body);

  return Response.json({
    success: true,
    message: "Food Added Successfully",
    food: body,
  });
}