"use client"

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export default function SimpleBarContainer({ element }) {
    return (
        <SimpleBar style={{ maxHeight: 300 }}>
            {element}
        </SimpleBar>
    )
}