function ShopCarTitle() {
  return (
    <div className="w-full bg-neutral-200 my-4 py-4 px-12 flex items-center justify-between ">
      <div>
        <div className="w-16 text-center">產品</div>
      </div>
      <div className="flex gap-6 md:gap-8 lg:gap-12 ">
        <div className="flex-1 w-8 text-center">種類</div>
        <div className="flex-1 w-8 text-center">大小</div>
        <div className="flex-1 w-8 text-center">單價</div>
        <div className="flex-1 w-8 text-center">數量</div>
        <div className="flex-1 w-8 text-center">總計</div>
      </div>
    </div>
  );
}

export default ShopCarTitle;
