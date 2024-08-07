import Item from './Item';

function ItemGrid() {
  return (
    <div className="grid grid-cols-4">
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
}

export default ItemGrid;
