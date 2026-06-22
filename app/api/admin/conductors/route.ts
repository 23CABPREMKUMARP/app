import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/conductor_assignments.json');

const readData = () => {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  const fileData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(fileData);
};

const writeData = (data: any) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = readData();
    
    // Check if email or employee_id already exists
    if (data.some((c: any) => c.email === body.email || c.employee_id === body.employee_id)) {
      return NextResponse.json({ success: false, error: "Email or Employee ID already assigned." }, { status: 400 });
    }

    const newAssignment = {
      id: `cond_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name,
      email: body.email,
      employee_id: body.employee_id,
      assigned_bus: body.assigned_bus || "",
      assigned_route: body.assigned_route || "",
      status: body.status || "Active",
      created_at: new Date().toISOString()
    };

    data.push(newAssignment);
    writeData(data);
    
    return NextResponse.json({ success: true, conductor: newAssignment });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add conductor" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const data = readData();
    
    const index = data.findIndex((c: any) => c.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Conductor not found" }, { status: 404 });
    }

    data[index] = { ...data[index], ...body };
    writeData(data);
    
    return NextResponse.json({ success: true, conductor: data[index] });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update conductor" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const data = readData();
    const newData = data.filter((c: any) => c.id !== id);
    writeData(newData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete conductor" }, { status: 500 });
  }
}
