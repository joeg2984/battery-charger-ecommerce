import { useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
  const { id } = params;
  const apiUrl = `${import.meta.env.VITE_API_URL}/products/${id}`;
  const data = await fetch(apiUrl).then((response) => response.json());
  return data;
};

const SingleProduct = () => {
  const product = useLoaderData();

  return (
    <>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title}/>
    </>
  );
};

export default SingleProduct;