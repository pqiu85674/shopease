function TailwindCenter({ children, isVisible }) {
  return (
    <div
      className={`fixed bg-neutral-700 top-1/2 left-1/2 rounded-xl flex flex-col justify-center items-center translate-xy-center ${
        isVisible ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}

export default TailwindCenter;
