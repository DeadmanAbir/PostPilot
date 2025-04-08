interface Item {
    id: string;
    label: string;
    type: string;
  }
  
  const allowedTypes = new Set([
    "files",
    "images",
    "text_node",
    "tweets",
    "websites",
    "youtube",
  ]);
  
  export const groupItemsByType = ({
    selectedItems,
  }: {
    selectedItems: Item[];
  }) => {
    const groupedItems: Record<string, Item[]> = {};
  
    selectedItems.forEach((item) => {
      const type = item.type.toLowerCase();
  
      if (!allowedTypes.has(type)) return; // skip invalid types
  
      if (!groupedItems[type]) {
        groupedItems[type] = [];
      }
  
      groupedItems[type].push({ ...item, type }); // optionally overwrite type to ensure it's lowercase
    });
  
    return groupedItems;
  };
  