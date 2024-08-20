// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   console.log('API route called with ID:', params.id);
//   try {
//     const customer = await prisma.customer.findUnique({
//       where: { id: params.id },
//     });

//     console.log('Found customer:', customer);

//     if (!customer) {
//       return NextResponse.json(
//         { error: 'Customer not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(customer);
//   } catch (error) {
//     console.error('Error in API route:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch customer' },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { name, phone, email } = await request.json();
//     const updatedCustomer = await prisma.customer.update({
//       where: { id: params.id },
//       data: { name, phone, email },
//     });
//     return NextResponse.json(updatedCustomer);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to update customer' },
//       { status: 500 }
//     );
//   }
// }