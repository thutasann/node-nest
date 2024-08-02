import { Document, FilterQuery } from 'mongoose';

/** Update Data Query Type */
export type UpdateData<T> = {
	[P in keyof T]?: T[P] extends Document ? T[P] : any;
};
