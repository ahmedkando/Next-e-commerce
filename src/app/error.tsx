'use client';
import React from "react";
export default function Error({error}: {error: Error})
 {
    return (
        <div>
            <h2 className="text-center text-2xl text-red-500">Something went wrong!</h2>
            <p className="text-center text-gray-500">{error.message}</p>
        </div>
    );
}