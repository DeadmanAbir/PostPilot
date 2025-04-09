interface Item {
  id: string;
  label: string;
  type: string;
}

const allowedTypes = new Set([
  "files",
  "images",
  "text",
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

    const typeName = type === "text" ? "text_node" : type;
    if (!groupedItemIds[typeName]) {
      groupedItemIds[typeName] = [];
    }
    groupedItemIds[typeName].push(item.id);
  });

  return groupedItemIds;
};
