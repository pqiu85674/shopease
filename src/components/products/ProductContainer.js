function ProductContainer({ children }) {
  return (
    <div className="flex pr-8 pl-10 justify-between mb-1 bg-neutral-200">
      {children}
    </div>
  );
}

export default ProductContainer;
