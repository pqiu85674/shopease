function Container({ children ,className}) {
  return <div className={`w-fall p-20 md:px-32 lg:px-48 m-auto ${className}`}>{children}</div>;
}

export default Container;
