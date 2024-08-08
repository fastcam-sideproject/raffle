import Item from './Item';

function ItemGrid() {
  return (
    <div className="w-4/5 grid grid-cols-4 gap-8 items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
      <Item />
    </div>
  );
}

export default ItemGrid;
