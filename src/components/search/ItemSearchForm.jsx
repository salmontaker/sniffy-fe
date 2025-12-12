import FilterListIcon from "@mui/icons-material/FilterList";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import categories from "@/constants/categories";
import colors from "@/constants/colors";

function ItemSearchForm({ initialValues = {}, onSubmit }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({
    agencyName: "",
    prdtClNm: "",
    clrNm: "",
    startDate: null,
    endDate: null
  });

  // 부모로부터 받은 initialValues가 변경되면 내부 상태 동기화 (URL 변경 감지 등)
  useEffect(() => {
    setQuery(initialValues.fdPrdtNm || "");
    setFilter({
      agencyName: initialValues.agencyName || "",
      prdtClNm: initialValues.prdtClNm || "",
      clrNm: initialValues.clrNm || "",
      startDate: initialValues.startDate ? dayjs(initialValues.startDate) : null,
      endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null
    });

    // 필터 값이 있으면 자동으로 열어주기
    if (
      initialValues.agencyName ||
      initialValues.prdtClNm ||
      initialValues.clrNm ||
      initialValues.startDate ||
      initialValues.endDate
    ) {
      setIsFilterOpen(true);
    }
  }, [
    initialValues.fdPrdtNm,
    initialValues.agencyName,
    initialValues.prdtClNm,
    initialValues.clrNm,
    initialValues.startDate,
    initialValues.endDate
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      ...filter,
      fdPrdtNm: query,
      startDate: filter.startDate?.format("YYYY-MM-DD") ?? "",
      endDate: filter.endDate?.format("YYYY-MM-DD") ?? ""
    };

    // 값이 있는 항목만 필터링
    const validData = Object.fromEntries(Object.entries(searchData).filter(([_, value]) => !!value));

    // 부모 컴포넌트의 함수 실행
    if (onSubmit) {
      onSubmit(validData);
    }
  };

  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, newValue) => {
    setFilter((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={4}>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          label="스니피에게 물어보세요 (예: 지갑, 핸드폰)"
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            bgcolor: "background.paper",
            borderRadius: 2
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="medium"
          endIcon={<PetsIcon />}
          sx={{
            px: 3,
            py: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
            flexShrink: 0
          }}
        >
          <Typography variant="body1">찾아줘!</Typography>
        </Button>
        <IconButton
          onClick={handleFilterToggle}
          sx={{
            px: 1,
            py: 2,
            borderRadius: 1,
            flexShrink: 0
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>
      <Collapse in={isFilterOpen}>
        <Box mt={2} bgcolor="background.paper" borderRadius={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="agencyName"
                label="보관장소"
                value={filter.agencyName}
                onChange={handleFilterChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>물품분류</InputLabel>
                <Select name="prdtClNm" value={filter.prdtClNm} label="물품분류" onChange={handleFilterChange}>
                  <MenuItem value="">선택 안함</MenuItem>
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="color-select-label">색상</InputLabel>
                <Select
                  labelId="color-select-label"
                  id="color-select"
                  name="clrNm"
                  value={filter.clrNm || ""}
                  label="색상"
                  onChange={handleFilterChange}
                  sx={{
                    ".MuiSelect-select": {
                      display: "flex"
                    }
                  }}
                >
                  <MenuItem value="">
                    <Box width={20} height={20} mr={1} border="1px solid #ccc" borderRadius="50%" />
                    선택 안함
                  </MenuItem>
                  {colors.map((color, index) => (
                    <MenuItem key={index} value={color.name} sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        width={20}
                        height={20}
                        mr={1}
                        bgcolor={color.hex}
                        border="1px solid #ccc"
                        borderRadius="50%"
                      />
                      {color.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="습득날짜 (시작)"
                value={filter.startDate}
                onChange={(newValue) => handleDateChange("startDate", newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="습득날짜 (종료)"
                value={filter.endDate}
                onChange={(newValue) => handleDateChange("endDate", newValue)}
                minDate={filter.startDate}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}

export default ItemSearchForm;
