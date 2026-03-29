import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "./services/productApi";

// ─── Async Thunks ─────────────────────────────────────────────────────────────
export const fetchHomeSections = createAsyncThunk(
  "products/fetchHomeSections",
  async (_, { rejectWithValue }) => {
    try {
      return await productApi.getHomeSections();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchSectionProducts = createAsyncThunk(
  "products/fetchSectionProducts",
  async (slug, { rejectWithValue }) => {
    try {
      return { slug, products: await productApi.getSectionProducts(slug) };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────
const productSlice = createSlice({
  name: "products",
  initialState: {
    heroSlides:      [],
    trustBadges:     [],
    productSections: [],
    status:  "idle",   // 'idle' | 'loading' | 'succeeded' | 'failed'
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeSections.pending, (state) => {
        state.status = "loading";
        state.error  = null;
      })
      .addCase(fetchHomeSections.fulfilled, (state, { payload }) => {
        state.status          = "succeeded";
        state.heroSlides      = payload.heroSlides      ?? [];
        state.trustBadges     = payload.trustBadges     ?? [];
        state.productSections = payload.productSections ?? [];
      })
      .addCase(fetchHomeSections.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error  = payload;
      });
  },
});

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectHeroSlides      = (s) => s.products.heroSlides;
export const selectTrustBadges     = (s) => s.products.trustBadges;
export const selectProductSections = (s) => s.products.productSections;
export const selectProductsStatus  = (s) => s.products.status;
export const selectProductsError   = (s) => s.products.error;

export default productSlice.reducer;
