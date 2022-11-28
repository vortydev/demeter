import { Category, Mesurement, Vendor } from '../../../types/Types';

interface CategorySelect {
    category: Category;
}

function CategoryDropDown({ category }: CategorySelect): JSX.Element {
    return (
        <option value={category.id}>{category.category}</option>
    );
}

function CategoryDropDownSelected({ category }: CategorySelect): JSX.Element {
    return (
        <option value={category.id} selected>{category.category}</option>
    );
}

interface VendorSelect {
    vendor: Vendor;
}

function VendorDropDown({ vendor }: VendorSelect): JSX.Element {
    return (
        <option value={vendor.id}>{vendor.vendor}</option>
    );
}

function VendorDropDownSelected({ vendor }: VendorSelect): JSX.Element {
    return (
        <option value={vendor.id} selected>{vendor.vendor}</option>
    );
}

interface MesurementSelect {
    mesurement: Mesurement;
}

function MesurementDropDown({ mesurement }: MesurementSelect): JSX.Element {
    return (
        <option value={mesurement.id}>{mesurement.mesurement}</option>
    );
}

function MesurementDropDownSelected({ mesurement }: MesurementSelect): JSX.Element {
    return (
        <option value={mesurement.id} selected>{mesurement.mesurement}</option>
    );
}

export { CategoryDropDown, CategoryDropDownSelected, VendorDropDown, VendorDropDownSelected, MesurementDropDown, MesurementDropDownSelected };
