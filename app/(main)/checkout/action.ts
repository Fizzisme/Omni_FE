'use server'


export async function createOrder(data: any) {
    const res = await fetch('http://localhost:8017/v1/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Create orders failed');
    }

    return await res.json();
}