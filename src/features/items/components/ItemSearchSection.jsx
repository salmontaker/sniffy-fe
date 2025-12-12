import { Box } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

import ItemSearchForm from "@/features/items/components/ItemSearchForm";

function ItemSearchSection() {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchParams) => {
    navigate(`/search?${createSearchParams(searchParams)}`);
  };

  return (
    <Box mb={4}>
      <ItemSearchForm onSubmit={handleSearchSubmit} />
    </Box>
  );
}

export default ItemSearchSection;
