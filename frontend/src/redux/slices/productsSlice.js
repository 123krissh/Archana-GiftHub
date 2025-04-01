import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch Products by Collection and optional Filters
export const fetchProductsByFilters = createAsyncThunk("products/fetchByFilters", 
    async({
        collection, size, minPrice, maxPrice, sortBy, search, category, material, limit,
    }) => {
        const query = new URLSearchParams();
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
        if(collection) query.append("collection", collection);
    }
);