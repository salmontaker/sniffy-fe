import FilterListIcon from "@mui/icons-material/FilterList";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
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
import { alpha } from "@mui/material/styles";
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
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="stretch"
        gap={1.5}
      >
        <Box display="flex" gap={1.5} flexGrow={1}>
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="무엇이든 물어보세요 (예: 휴대폰)"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "background.paper",
                borderRadius: 4,
                height: 54,
                transition: "all 0.2s",
                "& fieldset": { borderColor: "divider" },
                "&:hover fieldset": { borderColor: "primary.light" },
                "&.Mui-focused fieldset": { borderWidth: "2px" }
              }
            }}
          />
          <IconButton
            onClick={handleFilterToggle}
            sx={{
              width: 54,
              height: 54,
              borderRadius: 4,
              bgcolor: (theme) =>
                isFilterOpen
                  ? alpha(theme.palette.primary.main, 0.1)
                  : theme.palette.mode === "light"
                    ? "grey.50"
                    : "grey.900",
              border: "1px solid",
              borderColor: isFilterOpen ? "primary.main" : "divider",
              color: isFilterOpen ? "primary.main" : "text.secondary",
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                borderColor: "primary.main"
              }
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        <Button
          type="submit"
          variant="contained"
          endIcon={<PetsIcon />}
          sx={{
            px: 4,
            height: 54,
            borderRadius: 4,
            fontWeight: 800,
            fontSize: "1.05rem",
            boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
            whiteSpace: "nowrap",
            minWidth: { sm: 140 }
          }}
        >
          찾아줘!
        </Button>
      </Box>

      <Collapse in={isFilterOpen}>
        <Box
          mt={2}
          p={3}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "background.paper" : alpha(theme.palette.background.paper, 0.5),
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={2.5}>
            <Box sx={{ width: 4, height: 18, bgcolor: "primary.main", borderRadius: 1 }} />
            <Typography variant="subtitle1" fontWeight={800} color="text.primary">
              정밀 검색 필터
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="agencyName"
                label="보관 장소"
                placeholder="예: 서울강남경찰서"
                value={filter.agencyName}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                slotProps={{
                  input: { sx: { borderRadius: 2 } }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth size="small">
                <InputLabel>물품 분류</InputLabel>
                <Select
                  name="prdtClNm"
                  value={filter.prdtClNm}
                  label="물품 분류"
                  onChange={handleFilterChange}
                  sx={{ borderRadius: 2 }}
                >
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
              <FormControl fullWidth size="small">
                <InputLabel id="color-select-label">색상</InputLabel>
                <Select
                  labelId="color-select-label"
                  id="color-select"
                  name="clrNm"
                  value={filter.clrNm || ""}
                  label="색상"
                  onChange={handleFilterChange}
                  sx={{
                    borderRadius: 2,
                    ".MuiSelect-select": {
                      display: "flex",
                      alignItems: "center"
                    }
                  }}
                >
                  <MenuItem value="">
                    <Box width={18} height={18} mr={1.5} border="1px solid" borderColor="divider" borderRadius="50%" />
                    선택 안함
                  </MenuItem>
                  {colors.map((color, index) => (
                    <MenuItem key={index} value={color.name} sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        width={18}
                        height={18}
                        mr={1.5}
                        bgcolor={color.hex}
                        border="1px solid"
                        borderColor="divider"
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
                label="습득 날짜 (시작)"
                value={filter.startDate}
                onChange={(newValue) => handleDateChange("startDate", newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    InputProps: { sx: { borderRadius: 2 } }
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label="습득 날짜 (종료)"
                value={filter.endDate}
                onChange={(newValue) => handleDateChange("endDate", newValue)}
                minDate={filter.startDate}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    InputProps: { sx: { borderRadius: 2 } }
                  }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ display: { xs: "block", sm: "none" }, mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                startIcon={<PetsIcon />}
                sx={{ py: 1.5, fontWeight: 800, borderRadius: 2 }}
              >
                필터 적용하여 검색
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}

export default ItemSearchForm;
