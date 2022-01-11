import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
