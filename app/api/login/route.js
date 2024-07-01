import { NextResponse } from 'next/server';
import { auth } from '../../firebase/config.js'
import { signInWithEmailAndPassword } from 'firebase/auth'


export async function POST(req) {
    const { email, password } = await req.json();
    try {
        const userCredentails = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredentails.user.getIdToken();
        return NextResponse.json({ result: "Succesfully logged in" }, { userCredentails }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ error: err }, { status: 400 });
    }
}