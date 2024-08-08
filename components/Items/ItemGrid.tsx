import Item from './Item';

function ItemGrid() {
  return (
    <div className="w-4/5 grid grid-cols-4 gap-8 items-center max-md:grid-cols-2">
      <Item />
    </div>
  );
}

export default ItemGrid;
