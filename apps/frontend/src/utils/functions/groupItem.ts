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
  const groupedItemIds: Record<string, string[]> = {};

  selectedItems.forEach((item) => {
    const type = item.type.toLowerCase();

    if (!allowedTypes.has(type)) return;

    if (!groupedItemIds[type]) {
      groupedItemIds[type] = [];
    }

    groupedItemIds[type].push(item.id);
  });

  return groupedItemIds;
};
