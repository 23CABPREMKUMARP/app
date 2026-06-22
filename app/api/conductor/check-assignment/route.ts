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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, error: "Email parameter is required" }, { status: 400 });
    }

    const data = readData();
    const assignment = data.find((c: any) => c.email.toLowerCase() === email.toLowerCase() && c.status === 'Active');

    if (assignment) {
      return NextResponse.json({ success: true, isAssigned: true, assignment });
    } else {
      return NextResponse.json({ success: true, isAssigned: false });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to check assignment" }, { status: 500 });
  }
}
