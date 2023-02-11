'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

function addPropsToReactElement(element, props) {
  if (React.isValidElement(element)) {
    return React.cloneElement(element, props);
  }
  return element;
}

function addPropsToChildren(children, props) {
  if (!Array.isArray(children)) {
    return addPropsToReactElement(children, props);
  }
  return children.map((childElement) => addPropsToReactElement(childElement, props));
}

export default function ProductList({ children }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  console.log(category);

  const api_url = 'https://shark-app-dcfyj.ondigitalocean.app/api/products/popular';

  return <div>{addPropsToChildren(children, { api_url })}</div>;
}
