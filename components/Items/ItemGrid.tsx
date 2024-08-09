import Item from './Item';

function ItemGrid() {
  return (
    <ul className="w-4/5 grid grid-cols-4 gap-4 items-center max-lg:grid-cols-2 max-sm:grid-cols-1">
      <Item />
    </ul>
  );
}

export default ItemGrid;
