function Container({ children }) {
  return (
    <div className={`w-fall p-20 md:px-32 lg:px-48 m-auto bg-neutral-300`}>
      {children}
    </div>
  );
}

export default Container;
