function Container({ children }) {
  return (
    <div className={`w-fall p-20 md:px-40 lg:px-68 xl:px-96 m-auto bg-neutral-300`}>
      {children}
    </div>
  );
}

export default Container;
